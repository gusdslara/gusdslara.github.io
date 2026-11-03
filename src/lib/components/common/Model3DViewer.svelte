<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { t } from '$lib/i18n';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	export let modelPath: string;
	export let fallbackImage: string = '';

	let container: HTMLDivElement;
	let loading = true;
	let error = false;
	let loadProgress = 0;

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let controls: OrbitControls;
	let frameId: number;
	let mixer: THREE.AnimationMixer;
	let clock = new THREE.Clock();
	let isAutoRotating = true;

	let initialCameraPosition = new THREE.Vector3();
	let initialCameraTarget = new THREE.Vector3();
	let currentModel: THREE.Group | null = null;

	// Reactive model loading
	$: if (modelPath && scene) {
		loadModel();
	}

	onMount(() => {
		initScene();
		// loadModel is called reactively via $: modelPath check
		animate();

		window.addEventListener('resize', onWindowResize);
	});

	onDestroy(() => {
		if (frameId) cancelAnimationFrame(frameId);
		window.removeEventListener('resize', onWindowResize);

		if (renderer) {
			renderer.dispose();
			renderer.forceContextLoss();
		}
		if (scene) {
			scene.traverse((object) => {
				if (object instanceof THREE.Mesh) {
					object.geometry.dispose();
					if (Array.isArray(object.material)) {
						object.material.forEach((mat) => mat.dispose());
					} else {
						object.material.dispose();
					}
				}
			});
		}
		if (mixer) mixer.stopAllAction();
	});

	function initScene() {
		scene = new THREE.Scene();
		scene.background = new THREE.Color(0xf3f4f6);

		const width = container.clientWidth;
		const height = container.clientHeight || 400;

		camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 2000);
		camera.position.set(5, 5, 5);

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.shadowMap.enabled = true;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.2;
		container.appendChild(renderer.domElement);

		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.08;
		controls.enableZoom = true;
		controls.enablePan = true;
		controls.enableRotate = true;
		controls.autoRotate = true;
		controls.autoRotateSpeed = 1.5;
		controls.minDistance = 0.5;
		controls.maxDistance = 100;

		const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
		scene.add(ambientLight);

		const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
		dirLight.position.set(5, 10, 7.5);
		dirLight.castShadow = true;
		scene.add(dirLight);

		const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
		fillLight.position.set(-5, 3, -5);
		scene.add(fillLight);

		const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
		rimLight.position.set(0, -5, 5);
		scene.add(rimLight);
	}

	let lastLoadedPath: string | null = null;

	function loadModel() {
		if (!modelPath || !scene) return;

		// If we're already loading this exact model, don't restart
		if (loading && lastLoadedPath === modelPath) return;

		// Cleanup existing model and mixer before starting new load
		if (mixer) {
			mixer.stopAllAction();
			mixer = null;
		}

		if (currentModel) {
			scene.remove(currentModel);
			currentModel.traverse((object) => {
				if (object instanceof THREE.Mesh) {
					object.geometry.dispose();
					if (Array.isArray(object.material)) {
						object.material.forEach((mat) => mat.dispose());
					} else {
						object.material.dispose();
					}
				}
			});
			currentModel = null;
		}

		loading = true;
		loadProgress = 0;
		error = false;
		lastLoadedPath = modelPath;

		const currentPathAtStart = modelPath;
		const loader = new GLTFLoader();
		loader.load(
			modelPath,
			(gltf) => {
				// Race condition check: only proceed if this is still the requested model
				if (currentPathAtStart !== modelPath) {
					// Dispose of the stale loaded model
					gltf.scene.traverse((object) => {
						if (object instanceof THREE.Mesh) {
							object.geometry.dispose();
							if (Array.isArray(object.material)) {
								object.material.forEach((mat) => mat.dispose());
							} else {
								object.material.dispose();
							}
						}
					});
					return;
				}

				const model = gltf.scene;
				currentModel = model;

				if (gltf.animations && gltf.animations.length > 0) {
					mixer = new THREE.AnimationMixer(model);
					const action = mixer.clipAction(gltf.animations[0]);
					action.play();

					controls.autoRotate = false;
					isAutoRotating = false;
				}

				const box = new THREE.Box3().setFromObject(model);
				const center = box.getCenter(new THREE.Vector3());
				const size = box.getSize(new THREE.Vector3());

				model.position.x += model.position.x - center.x;
				model.position.y += model.position.y - center.y;
				model.position.z += model.position.z - center.z;

				const maxDim = Math.max(size.x, size.y, size.z);
				const fov = camera.fov * (Math.PI / 180);
				let cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
				cameraZ *= 2.0;

				camera.position.set(cameraZ * 0.7, cameraZ * 0.5, cameraZ * 0.7);
				camera.lookAt(0, 0, 0);

				controls.target.set(0, 0, 0);
				controls.minDistance = maxDim * 0.3;
				controls.maxDistance = maxDim * 10;
				controls.update();

				initialCameraPosition.copy(camera.position);
				initialCameraTarget.copy(controls.target);

				scene.add(model);
				loading = false;
			},
			(xhr) => {
				if (xhr.lengthComputable) {
					loadProgress = Math.round((xhr.loaded / xhr.total) * 100);
				}
			},
			(err) => {
				console.error('Error loading 3D model:', err);
				loading = false;
				error = true;
			}
		);
	}

	function animate() {
		frameId = requestAnimationFrame(animate);
		const delta = clock.getDelta();

		if (mixer) mixer.update(delta);
		if (controls) controls.update();

		if (renderer && scene && camera) {
			renderer.render(scene, camera);
		}
	}

	function onWindowResize() {
		if (!container || !camera || !renderer) return;
		const width = container.clientWidth;
		const height = container.clientHeight || 400;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
	}

	function resetCamera() {
		if (!camera || !controls) return;
		camera.position.copy(initialCameraPosition);
		controls.target.copy(initialCameraTarget);
		controls.update();
	}

	function zoomIn() {
		if (!camera || !controls) return;
		const direction = new THREE.Vector3().subVectors(controls.target, camera.position).normalize();
		camera.position.addScaledVector(direction, controls.minDistance * 0.5);
		controls.update();
	}

	function zoomOut() {
		if (!camera || !controls) return;
		const direction = new THREE.Vector3().subVectors(controls.target, camera.position).normalize();
		camera.position.addScaledVector(direction, -controls.minDistance * 0.5);
		controls.update();
	}

	function toggleAutoRotate() {
		if (!controls) return;
		controls.autoRotate = !controls.autoRotate;
		isAutoRotating = controls.autoRotate;
	}

	function takeScreenshot() {
		if (!renderer || !scene || !camera) return;

		// Save current background
		const originalBackground = scene.background;

		// Set background to null for transparency
		scene.background = null;

		// Render the scene to the drawing buffer
		renderer.render(scene, camera);

		// Get canvas data
		const dataURL = renderer.domElement.toDataURL('image/png');

		// Restore background
		scene.background = originalBackground;

		// Trigger download
		const link = document.createElement('a');
		link.download = `3d-model-screenshot-${new Date().getTime()}.png`;
		link.href = dataURL;
		link.click();
	}
</script>

<div
	class="relative w-full h-[300px] md:h-[450px] bg-gray-50 rounded-xl overflow-hidden"
	bind:this={container}
>
	{#if loading}
		<div class="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
			<div
				class="w-12 h-12 border-4 border-gray-200 border-t-[#dd206b] rounded-full animate-spin mb-4"
			></div>
			<p class="text-gray-500 font-medium animate-pulse">{$t('common.model3d.loading')}</p>
			{#if loadProgress > 0}
				<div class="w-48 h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
					<div
						class="h-full bg-[#dd206b] rounded-full transition-all duration-300"
						style="width: {loadProgress}%"
					></div>
				</div>
				<p class="text-gray-400 text-xs mt-1">{loadProgress}%</p>
			{/if}
		</div>
	{/if}

	{#if error}
		<div
			class="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-6 text-center z-10"
		>
			<svg
				class="w-12 h-12 text-gray-300 mb-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
			<p class="text-gray-600 font-medium mb-2">{$t('common.model3d.error')}</p>
			{#if fallbackImage}
				<img src={fallbackImage} alt="Fallback" class="max-h-32 opacity-50 grayscale mt-4" />
			{:else}
				<p class="text-gray-400 text-sm">{$t('common.model3d.checkPath')}</p>
			{/if}
		</div>
	{/if}

	{#if !loading && !error}
		<div class="absolute bottom-3 right-3 z-20 flex gap-1.5">
			<button
				on:click={zoomIn}
				class="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md border border-gray-200/50 hover:bg-white transition-colors"
				title="Zoom In"
			>
				<svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6v12m6-6H6"
					/>
				</svg>
			</button>
			<button
				on:click={zoomOut}
				class="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md border border-gray-200/50 hover:bg-white transition-colors"
				title="Zoom Out"
			>
				<svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
				</svg>
			</button>
			<button
				on:click={toggleAutoRotate}
				class="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md border border-gray-200/50 hover:bg-white transition-colors"
				title={isAutoRotating ? 'Stop Auto Rotate' : 'Start Auto Rotate'}
			>
				<svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if isAutoRotating}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 9v6m4-6v6"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
						/>
					{/if}
				</svg>
			</button>
			<button
				on:click={resetCamera}
				class="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md border border-gray-200/50 hover:bg-white transition-colors"
				title="Reset Camera"
			>
				<svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					/>
				</svg>
			</button>
			<button
				on:click={takeScreenshot}
				class="w-8 h-8 bg-[#dd206b] hover:bg-[#c41a5d] text-white rounded-lg flex items-center justify-center shadow-md transition-colors"
				title="Take Screenshot"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			</button>
		</div>

		<div class="absolute top-3 left-3 z-20">
			<div
				class="bg-white/60 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] text-gray-500 font-medium shadow-sm border border-gray-200/30"
			>
				{$t('common.model3d.instructions')}
			</div>
		</div>
	{/if}
</div>

<style>
	:global(canvas) {
		display: block;
		width: 100% !important;
		height: 100% !important;
		outline: none;
	}
</style>
