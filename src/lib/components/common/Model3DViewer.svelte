<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { t } from '$lib/i18n';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import type { ModelVariant } from '$lib/types/projects';

	export let modelPath: string;
	export let fallbackImage: string = '';
	export let modelVariants: ModelVariant[] = [];
	export let modelCategory: 'zombies' | 'survivors' | 'safehouse' | 'general' = 'general';

	let container: HTMLDivElement;
	let loading = true;
	let error = false;
	let loadProgress = 0;

	// Active model tracking
	let activeModelPath = modelPath;
	let previousModelPath = '';

	// Three.js Core
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let controls: OrbitControls;
	let frameId: number;
	let mixer: THREE.AnimationMixer | null = null;
	let clock = new THREE.Clock();
	let isAutoRotating = true;
	let isPlayingAnimation = true;

	let initialCameraPosition = new THREE.Vector3();
	let initialCameraTarget = new THREE.Vector3();
	let currentModel: THREE.Group | null = null;

	// Animation Management
	let currentClips: THREE.AnimationClip[] = [];
	let availableAnimations: string[] = [];
	let currentAnimationName: string = '';
	let currentAction: THREE.AnimationAction | null = null;

	// Pixel Art Shader & Post-Processing
	let isPixelArt = false;
	const pixelTargetHeight = 270;
	const supersample = 2;
	let renderTarget: THREE.WebGLRenderTarget | null = null;
	let quadScene: THREE.Scene | null = null;
	let quadCam: THREE.OrthographicCamera | null = null;
	let resolveMat: THREE.ShaderMaterial | null = null;

	// Safehouse & Furniture automated open/close cycle
	let hasRoofObject = false;
	let hasDoorAnimations = false;
	let hasFurnitureAnimations = false;
	let buildingTimer: ReturnType<typeof setTimeout> | null = null;
	let buildingCycleMode: 'cycle' | 'open' | 'closed' = 'cycle';
	let buildingStep = 0;

	$: isHouseOrFurniture = hasRoofObject || activeModelPath.includes('furniture') || activeModelPath.includes('safehouse');

	// Animation Auto-cycle state (at least 5s of each animation)
	let animationCycleTimer: ReturnType<typeof setTimeout> | null = null;
	const ANIMATION_DURATION_MS = 5000;

	// Responsive resize observer
	let resizeObserver: ResizeObserver | null = null;

	// Click feedback toast
	let feedbackToast = '';
	let feedbackTimer: ReturnType<typeof setTimeout> | null = null;
	let pointerDownPos = { x: 0, y: 0 };

	// Reactive check if path prop changes from outside
	$: if (modelPath && modelPath !== previousModelPath) {
		previousModelPath = modelPath;
		activeModelPath = modelPath;
		// Determine default pixel art mode based on path
		isPixelArt = modelPath.includes('/bitez/');
		if (scene) {
			loadModel(activeModelPath);
		}
	}

	onMount(() => {
		isPixelArt = activeModelPath.includes('/bitez/');
		initScene();
		initPixelPipeline();
		loadModel(activeModelPath);
		animate();

		window.addEventListener('resize', onWindowResize);
		if (container && typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(() => {
				updateResolution();
			});
			resizeObserver.observe(container);
		}
	});

	onDestroy(() => {
		if (resizeObserver) {
			resizeObserver.disconnect();
			resizeObserver = null;
		}
		clearBuildingCycle();
		clearAnimationCycle();
		if (frameId) cancelAnimationFrame(frameId);
		window.removeEventListener('resize', onWindowResize);

		if (feedbackTimer) clearTimeout(feedbackTimer);

		if (mixer) {
			mixer.stopAllAction();
			mixer = null;
		}

		if (renderTarget) {
			if (renderTarget.depthTexture) renderTarget.depthTexture.dispose();
			renderTarget.dispose();
			renderTarget = null;
		}

		if (resolveMat) {
			resolveMat.dispose();
			resolveMat = null;
		}

		if (renderer) {
			if (renderer.domElement) {
				renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
				renderer.domElement.removeEventListener('pointerup', handlePointerUp);
			}
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
	});

	function initScene() {
		scene = new THREE.Scene();
		updateSceneBackground();

		const width = container.clientWidth || 600;
		const height = container.clientHeight || 450;

		camera = new THREE.PerspectiveCamera(42, width / height, 0.05, 500);
		camera.position.set(5, 5, 5);

		renderer = new THREE.WebGLRenderer({
			antialias: false,
			alpha: true,
			powerPreference: 'high-performance',
			preserveDrawingBuffer: true
		});
		renderer.setClearColor(0x000000, 0);
		renderer.shadowMap.enabled = true;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.15;
		renderer.domElement.addEventListener('pointerdown', handlePointerDown);
		renderer.domElement.addEventListener('pointerup', handlePointerUp);
		container.appendChild(renderer.domElement);

		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.08;
		controls.enableZoom = true;
		controls.enablePan = true;
		controls.enableRotate = true;
		controls.autoRotate = false;
		controls.autoRotateSpeed = 1.5;
		isAutoRotating = false;
		controls.minDistance = 0.5;
		controls.maxDistance = 100;
		// Smooth touch handling for mobile
		controls.touches = {
			ONE: THREE.TOUCH.ROTATE,
			TWO: THREE.TOUCH.DOLLY_PAN
		};

		// Balanced bright lighting for maximum visibility on transparent backgrounds
		const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
		scene.add(ambientLight);

		const dirLight = new THREE.DirectionalLight(0xfff8ee, 1.35);
		dirLight.position.set(8, 14, 10);
		dirLight.castShadow = true;
		scene.add(dirLight);

		const fillLight = new THREE.DirectionalLight(0x99bbdd, 0.7);
		fillLight.position.set(-8, 5, -8);
		scene.add(fillLight);

		const rimLight = new THREE.DirectionalLight(0xffffff, 0.45);
		rimLight.position.set(0, -6, 6);
		scene.add(rimLight);
	}

	function updateSceneBackground() {
		if (!scene) return;
		scene.background = null;
	}

	function initPixelPipeline() {
		quadScene = new THREE.Scene();
		quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		const quadGeo = new THREE.BufferGeometry();
		quadGeo.setAttribute(
			'position',
			new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3)
		);

		resolveMat = new THREE.ShaderMaterial({
			defines: { SS: supersample },
			uniforms: {
				tColor: { value: null },
				tDepth: { value: null },
				cNear: { value: 0.05 },
				cFar: { value: 500 },
				cOrtho: { value: 0 }
			},
			depthTest: false,
			depthWrite: false,
			transparent: true,
			vertexShader: `
				void main() {
					gl_Position = vec4(position.xy, 0.0, 1.0);
				}
			`,
			fragmentShader: `
				precision highp float;
				uniform sampler2D tColor;
				uniform highp sampler2D tDepth;
				uniform float cNear;
				uniform float cFar;
				uniform float cOrtho;

				float viewZ(float d) {
					return cOrtho > 0.5 ? cNear + d * (cFar - cNear) : (cNear * cFar) / (cFar - d * (cFar - cNear));
				}

				void main() {
					ivec2 o = ivec2(gl_FragCoord.xy) * SS;
					ivec2 best = o;
					float d0 = texelFetch(tDepth, o, 0).r;
					float bd = d0;

					for (int y = 0; y < SS; y++) {
						for (int x = 0; x < SS; x++) {
							ivec2 q = o + ivec2(x, y);
							float d = texelFetch(tDepth, q, 0).r;
							if (d < bd) {
								bd = d;
								best = q;
							}
						}
					}

					if (best != o) {
						float zRef = d0 >= 1.0 ? 1e9 : viewZ(d0);
						float zMin = viewZ(bd);
						if (zRef - zMin < max(0.3, zMin * 0.03)) best = o;
					}

					vec4 col = texelFetch(tColor, best, 0);
					float finalDepth = texelFetch(tDepth, best, 0).r;
					if (finalDepth >= 0.9999 || col.a < 0.01) {
						gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
					} else {
						gl_FragColor = col;
					}
				}
			`
		});

		const quadMesh = new THREE.Mesh(quadGeo, resolveMat);
		quadScene.add(quadMesh);

		updateResolution();
	}

	function updateResolution() {
		if (!container || !camera || !renderer) return;
		const width = container.clientWidth || 600;
		const height = container.clientHeight || 450;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		if (isPixelArt) {
			const scale = Math.max(1, height / pixelTargetHeight);
			const w = Math.max(1, Math.floor(width / scale));
			const h = Math.max(1, Math.floor(height / scale));

			renderer.setPixelRatio(1);
			renderer.setSize(w, h, false);
			renderer.domElement.classList.add('pixelated');

			const W = w * supersample;
			const H = h * supersample;

			if (renderTarget) {
				if (renderTarget.depthTexture) renderTarget.depthTexture.dispose();
				renderTarget.dispose();
			}

			const depth = new THREE.DepthTexture(W, H);
			depth.type = THREE.UnsignedIntType;
			renderTarget = new THREE.WebGLRenderTarget(W, H, {
				format: THREE.RGBAFormat,
				minFilter: THREE.NearestFilter,
				magFilter: THREE.NearestFilter,
				depthBuffer: true,
				depthTexture: depth
			});

			if (resolveMat) {
				resolveMat.uniforms.tColor.value = renderTarget.texture;
				resolveMat.uniforms.tDepth.value = depth;
			}
		} else {
			renderer.domElement.classList.remove('pixelated');
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(width, height, true);
		}
	}

	function togglePixelArt() {
		isPixelArt = !isPixelArt;
		updateSceneBackground();
		updateResolution();
		showFeedback(isPixelArt ? '👾 Pixel Art Ativado' : '✨ Render Suave');
	}

	let lastLoadedPath: string | null = null;

	function loadModel(targetPath: string) {
		if (!targetPath || !scene) return;

		if (loading && lastLoadedPath === targetPath) return;

		clearBuildingCycle();
		clearAnimationCycle();

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
		lastLoadedPath = targetPath;
		availableAnimations = [];
		currentAnimationName = '';
		currentAction = null;

		const currentPathAtStart = targetPath;
		const loader = new GLTFLoader();

		loader.load(
			targetPath,
			(gltf) => {
				if (currentPathAtStart !== activeModelPath) {
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

				// Check for house & furniture features
				const roofObj = model.getObjectByName('Roof_Ceiling_Structure');
				hasRoofObject = !!roofObj;

				// Setup animations
				currentClips = gltf.animations || [];
				availableAnimations = currentClips.map((a) => a.name);
				hasDoorAnimations = availableAnimations.includes('Open_Doors');
				hasFurnitureAnimations = availableAnimations.includes('Open_Furniture');

				if (currentClips.length > 0) {
					mixer = new THREE.AnimationMixer(model);

					if (hasRoofObject || activeModelPath.includes('furniture') || activeModelPath.includes('safehouse')) {
						// Always keep roof visible on house by default
						if (roofObj) roofObj.visible = true;
						// House & Furniture starts automated open/close non-stop cycle
						startBuildingCycle(600);
					} else {
						// Pick best initial animation for characters or weapon rack
						const priorityClips = ['Idle', 'Zombie_Idle', 'Hunter_Crouch_Idle', 'Tank_Idle', 'Boomer_Idle', 'Inspect_Turntable'];
						const chosen = currentClips.find((a) => priorityClips.includes(a.name)) || currentClips[0];
						playAnimation(chosen.name, 0);

						// Start automatic cycling through all animations (at least 5s of each animation)
						startAnimationCycle(ANIMATION_DURATION_MS);
					}
				}

				// Center model and frame camera
				const box = new THREE.Box3().setFromObject(model);
				const center = box.getCenter(new THREE.Vector3());
				const size = box.getSize(new THREE.Vector3());

				model.position.x += model.position.x - center.x;
				model.position.y += model.position.y - center.y;
				model.position.z += model.position.z - center.z;

				const maxDim = Math.max(size.x, size.y, size.z);
				const fov = camera.fov * (Math.PI / 180);
				let cameraDistance = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.6;

				camera.position.set(cameraDistance * 0.9, cameraDistance * 0.75, cameraDistance * 1.05);
				camera.lookAt(0, 0, 0);

				controls.target.set(0, 0, 0);
				controls.minDistance = Math.max(0.1, maxDim * 0.25);
				controls.maxDistance = maxDim * 8;
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

	function playAnimation(name: string, crossFadeDuration = 0.25) {
		if (!mixer || currentClips.length === 0) return;
		const clip = currentClips.find((c) => c.name === name);
		if (!clip) return;

		const targetAction = mixer.clipAction(clip);
		if (!targetAction) return;

		if (currentAction && currentAction !== targetAction) {
			currentAction.fadeOut(crossFadeDuration);
		}

		targetAction.reset().fadeIn(crossFadeDuration).play();
		currentAction = targetAction;
		currentAnimationName = name;
		isPlayingAnimation = true;
	}

	function clearAnimationCycle() {
		if (animationCycleTimer) {
			clearTimeout(animationCycleTimer);
			animationCycleTimer = null;
		}
	}

	function startAnimationCycle(delay = ANIMATION_DURATION_MS) {
		clearAnimationCycle();
		if (!isPlayingAnimation || availableAnimations.length <= 1 || hasRoofObject) return;
		animationCycleTimer = setTimeout(advanceToNextAnimation, delay);
	}

	function advanceToNextAnimation() {
		if (!isPlayingAnimation || availableAnimations.length <= 1 || hasRoofObject) return;
		const currentIdx = availableAnimations.indexOf(currentAnimationName);
		const nextIdx = (currentIdx + 1) % availableAnimations.length;
		const nextName = availableAnimations[nextIdx];
		playAnimation(nextName, 0.35);
		startAnimationCycle(ANIMATION_DURATION_MS);
	}

	function clearBuildingCycle() {
		if (buildingTimer) {
			clearTimeout(buildingTimer);
			buildingTimer = null;
		}
	}

	function playSafehouseAction(name: string, crossFadeDuration = 0.2) {
		if (!mixer || currentClips.length === 0) return;
		const clip = currentClips.find((c) => c.name === name);
		if (!clip) return;

		// Mutually exclusive actions cleanup to prevent track conflicts
		if (name === 'Roof_Lift_Inspect') {
			const a = currentClips.find((c) => c.name === 'Roof_Restore');
			if (a) mixer.clipAction(a).stop();
		} else if (name === 'Roof_Restore') {
			const a = currentClips.find((c) => c.name === 'Roof_Lift_Inspect');
			if (a) mixer.clipAction(a).stop();
		} else if (name === 'Close_All') {
			['Open_All', 'Open_Doors', 'Open_Windows', 'Open_Furniture'].forEach((cn) => {
				const a = currentClips.find((c) => c.name === cn);
				if (a) mixer.clipAction(a).stop();
			});
		} else if (['Open_All', 'Open_Doors', 'Open_Windows', 'Open_Furniture'].includes(name)) {
			const a = currentClips.find((c) => c.name === 'Close_All');
			if (a) mixer.clipAction(a).stop();
		}

		const targetAction = mixer.clipAction(clip);
		targetAction.reset();
		targetAction.setLoop(THREE.LoopOnce, 1);
		targetAction.clampWhenFinished = true;
		targetAction.fadeIn(crossFadeDuration).play();
		currentAction = targetAction;
		currentAnimationName = name;
		isPlayingAnimation = true;
	}

	function startBuildingCycle(initialDelay = 600) {
		clearBuildingCycle();
		clearAnimationCycle();
		buildingCycleMode = 'cycle';
		buildingStep = 0;
		isPlayingAnimation = true;
		buildingTimer = setTimeout(runBuildingStep, initialDelay);
	}

	function runBuildingStep() {
		if (buildingCycleMode !== 'cycle' || !mixer) return;

		if (hasRoofObject) {
			// HOUSE (Safehouse): Opens everything (doors, windows, furniture) with roof, then without roof
			switch (buildingStep) {
				case 0:
					// With roof -> Open All (doors, windows, furniture)
					playSafehouseAction('Open_All', 0.25);
					showFeedback('🚪 Portas, Janelas e Móveis Abertos');
					buildingStep = 1;
					buildingTimer = setTimeout(runBuildingStep, 5000);
					break;

				case 1:
					// With roof -> Close All
					playSafehouseAction('Close_All', 0.25);
					showFeedback('🏠 Fechando Tudo');
					buildingStep = 2;
					buildingTimer = setTimeout(runBuildingStep, 1500);
					break;

				case 2:
					// Transition -> Smoothly lift roof to inspect interior cutaway
					playSafehouseAction('Roof_Lift_Inspect', 0.3);
					showFeedback('🏠 Levantando Teto (Visão Interna)');
					buildingStep = 3;
					buildingTimer = setTimeout(runBuildingStep, 2000);
					break;

				case 3:
					// Without roof (interior cutaway) -> Open All (doors, windows, all furniture inside)
					playSafehouseAction('Open_All', 0.25);
					showFeedback('📦 Interior e Compartimentos Abertos');
					buildingStep = 4;
					buildingTimer = setTimeout(runBuildingStep, 5000);
					break;

				case 4:
					// Without roof -> Close All
					playSafehouseAction('Close_All', 0.25);
					showFeedback('📦 Fechando Móveis');
					buildingStep = 5;
					buildingTimer = setTimeout(runBuildingStep, 1500);
					break;

				case 5:
					// Transition -> Smoothly land roof back on house
					playSafehouseAction('Roof_Restore', 0.3);
					showFeedback('🏠 Descendo Teto');
					buildingStep = 0;
					buildingTimer = setTimeout(runBuildingStep, 2000);
					break;
			}
		} else {
			// FURNITURE SHOWROOM (furniture-showroom.glb): Open furniture -> Close all
			switch (buildingStep) {
				case 0:
					const openClip = currentClips.find((c) => c.name === 'Open_Furniture' || c.name === 'Open_All') || currentClips[0];
					playSafehouseAction(openClip.name, 0.25);
					showFeedback('📦 Todos Móveis Abertos');
					buildingStep = 1;
					buildingTimer = setTimeout(runBuildingStep, 5000);
					break;

				case 1:
					const closeClip = currentClips.find((c) => c.name === 'Close_All') || currentClips[1] || currentClips[0];
					playSafehouseAction(closeClip.name, 0.25);
					showFeedback('📦 Fechando Móveis');
					buildingStep = 0;
					buildingTimer = setTimeout(runBuildingStep, 2000);
					break;
			}
		}
	}

	function setBuildingMode(mode: 'cycle' | 'open' | 'closed') {
		clearBuildingCycle();
		clearAnimationCycle();
		buildingCycleMode = mode;

		if (mode === 'cycle') {
			startBuildingCycle(100);
			showFeedback('🔄 Ciclo Automático');
		} else if (mode === 'open') {
			isPlayingAnimation = true;
			if (hasRoofObject) {
				playSafehouseAction('Roof_Lift_Inspect', 0.3);
				setTimeout(() => {
					if (buildingCycleMode === 'open') {
						playSafehouseAction('Open_All', 0.25);
						showFeedback('🚪 Aberto (Fixo)');
					}
				}, 1200);
			} else {
				const openClip = currentClips.find((c) => c.name === 'Open_Furniture' || c.name === 'Open_All') || currentClips[0];
				if (openClip) playSafehouseAction(openClip.name, 0.25);
				showFeedback('📦 Aberto (Fixo)');
			}
		} else if (mode === 'closed') {
			isPlayingAnimation = true;
			playSafehouseAction('Close_All', 0.25);
			if (hasRoofObject) {
				playSafehouseAction('Roof_Restore', 0.3);
			}
			showFeedback('🏠 Fechado (Fixo)');
		}
	}

	function handleAnimationSelect(e: Event) {
		const select = e.target as HTMLSelectElement;
		if (!select || !select.value) return;

		if (isHouseOrFurniture) {
			setBuildingMode(select.value as 'cycle' | 'open' | 'closed');
		} else {
			playAnimation(select.value);
			startAnimationCycle(ANIMATION_DURATION_MS);
		}
	}

	function togglePlayAnimation() {
		if (isHouseOrFurniture) {
			if (buildingCycleMode === 'cycle' && isPlayingAnimation) {
				clearBuildingCycle();
				if (currentAction) currentAction.paused = true;
				isPlayingAnimation = false;
				showFeedback('⏸ Pausado');
			} else {
				if (currentAction) currentAction.paused = false;
				setBuildingMode('cycle');
			}
			return;
		}

		if (!currentAction) return;
		if (isPlayingAnimation) {
			currentAction.paused = true;
			isPlayingAnimation = false;
			clearAnimationCycle();
			showFeedback('⏸ Pausado');
		} else {
			currentAction.paused = false;
			isPlayingAnimation = true;
			startAnimationCycle(ANIMATION_DURATION_MS);
			showFeedback('▶ Reproduzindo');
		}
	}

	function switchVariant(variantPath: string) {
		if (variantPath === activeModelPath) return;
		activeModelPath = variantPath;
		loadModel(activeModelPath);
	}

	// Raycast Click-to-Animate
	function handlePointerDown(e: MouseEvent | TouchEvent) {
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
		pointerDownPos = { x: clientX, y: clientY };
	}

	function handlePointerUp(e: MouseEvent | TouchEvent) {
		const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
		const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;
		const dx = clientX - pointerDownPos.x;
		const dy = clientY - pointerDownPos.y;

		// Threshold to differentiate tap from orbit/pan drag
		if (Math.hypot(dx, dy) < 8) {
			handleCanvasClick(clientX, clientY);
		}
	}

	function handleCanvasClick(clientX: number, clientY: number) {
		if (!renderer || !camera || !currentModel || !scene) return;

		const rect = renderer.domElement.getBoundingClientRect();
		const mouse = new THREE.Vector2(
			((clientX - rect.left) / rect.width) * 2 - 1,
			-((clientY - rect.top) / rect.height) * 2 + 1
		);

		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObject(currentModel, true);

		if (intersects.length > 0) {
			triggerClickReaction();
		}
	}

	function triggerClickReaction() {
		if (!mixer || availableAnimations.length === 0) {
			return;
		}

		// Action priority depending on model type
		const isZombie = modelCategory === 'zombies' || activeModelPath.includes('zombie');
		const isSurvivor = modelCategory === 'survivors' || activeModelPath.includes('survivor');

		if (isZombie) {
			const attackClips = [
				'Zombie_Attack', 'Zombie_Attack_Left', 'Zombie_Bite', 'Zombie_Slap',
				'Tank_Ground_Smash', 'Tank_Haymaker', 'Tank_Charge',
				'Boomer_Vomit_Attack', 'Hunter_Pounce', 'Hunter_Claw_Combo',
				'Crawler_Lunge', 'Crawler_Claw_Right'
			];
			const actionClip = availableAnimations.find((name) => attackClips.includes(name));
			if (actionClip) {
				playAnimation(actionClip, 0.15);
				showFeedback('🧟 Ataque Disparado!');
				startAnimationCycle(ANIMATION_DURATION_MS);
				return;
			}
		} else if (isSurvivor) {
			const survivorClips = ['Melee_Punch', 'Melee_Axe', 'Jump', 'Reload_Handgun'];
			const actionClip = availableAnimations.find(
				(name) => survivorClips.includes(name) && name !== currentAnimationName
			) || availableAnimations.find((name) => survivorClips.includes(name));
			if (actionClip) {
				playAnimation(actionClip, 0.15);
				showFeedback('🥊 Golpe Disparado!');
				startAnimationCycle(ANIMATION_DURATION_MS);
				return;
			}
		} else if (isHouseOrFurniture) {
			if (buildingCycleMode === 'cycle') {
				setBuildingMode('open');
			} else if (buildingCycleMode === 'open') {
				setBuildingMode('closed');
			} else {
				setBuildingMode('cycle');
			}
			return;
		}

		// Fallback: cycle to next animation
		const nextIdx = (availableAnimations.indexOf(currentAnimationName) + 1) % availableAnimations.length;
		playAnimation(availableAnimations[nextIdx], 0.2);
		showFeedback(`▶ ${availableAnimations[nextIdx]}`);
		startAnimationCycle(ANIMATION_DURATION_MS);
	}

	function showFeedback(text: string) {
		feedbackToast = text;
		if (feedbackTimer) clearTimeout(feedbackTimer);
		feedbackTimer = setTimeout(() => {
			feedbackToast = '';
		}, 1400);
	}

	function animate() {
		frameId = requestAnimationFrame(animate);
		const delta = clock.getDelta();

		if (mixer && isPlayingAnimation) mixer.update(delta);
		if (controls) controls.update();

		if (renderer && scene && camera) {
			if (isPixelArt && renderTarget && quadScene && quadCam && resolveMat) {
				resolveMat.uniforms.cNear.value = camera.near;
				resolveMat.uniforms.cFar.value = camera.far;
				resolveMat.uniforms.cOrtho.value = 0;

				renderer.setRenderTarget(renderTarget);
				renderer.clear();
				renderer.render(scene, camera);
				renderer.setRenderTarget(null);
				renderer.clear();
				renderer.render(quadScene, quadCam);
			} else {
				renderer.setRenderTarget(null);
				renderer.clear();
				renderer.render(scene, camera);
			}
		}
	}

	function onWindowResize() {
		updateResolution();
	}

	function resetCamera() {
		if (!camera || !controls) return;
		camera.position.copy(initialCameraPosition);
		controls.target.copy(initialCameraTarget);
		controls.update();
		showFeedback('🎯 Câmera Resetada');
	}

	function zoomIn() {
		if (!camera || !controls) return;
		const direction = new THREE.Vector3().subVectors(controls.target, camera.position).normalize();
		camera.position.addScaledVector(direction, controls.minDistance * 0.7);
		controls.update();
	}

	function zoomOut() {
		if (!camera || !controls) return;
		const direction = new THREE.Vector3().subVectors(controls.target, camera.position).normalize();
		camera.position.addScaledVector(direction, -controls.minDistance * 0.7);
		controls.update();
	}

	function toggleAutoRotate() {
		if (!controls) return;
		controls.autoRotate = !controls.autoRotate;
		isAutoRotating = controls.autoRotate;
	}

	function takeScreenshot() {
		if (!renderer || !scene || !camera) return;

		const originalBackground = scene.background;
		scene.background = null;

		if (isPixelArt && renderTarget && quadScene && quadCam) {
			renderer.setRenderTarget(renderTarget);
			renderer.render(scene, camera);
			renderer.setRenderTarget(null);
			renderer.render(quadScene, quadCam);
		} else {
			renderer.render(scene, camera);
		}

		const dataURL = renderer.domElement.toDataURL('image/png');
		scene.background = originalBackground;

		const link = document.createElement('a');
		link.download = `pixelz-3d-model-${Date.now()}.png`;
		link.href = dataURL;
		link.click();
		showFeedback('📸 Captura salva!');
	}
</script>

<div
	class="relative w-full h-[350px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden select-none bg-transparent"
	bind:this={container}
	role="region"
	aria-label="3D Model Viewer"
>
	<!-- Loading Spinner -->
	{#if loading}
		<div
			class="absolute inset-0 flex flex-col items-center justify-center z-30 bg-white/70 backdrop-blur-md transition-colors"
		>
			<div
				class="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4"
			></div>
			<p class="font-medium text-sm animate-pulse text-gray-800">
				{$t('common.model3d.loading')}
			</p>
			{#if loadProgress > 0}
				<div class="w-48 h-2 bg-gray-300 rounded-full mt-3 overflow-hidden">
					<div
						class="h-full bg-amber-500 rounded-full transition-all duration-300"
						style="width: {loadProgress}%"
					></div>
				</div>
				<p class="text-xs mt-1 text-gray-500 font-mono">{loadProgress}%</p>
			{/if}
		</div>
	{/if}

	<!-- Error State -->
	{#if error}
		<div
			class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-30 bg-white/80 backdrop-blur-md"
		>
			<svg
				class="w-12 h-12 text-gray-400 mb-4"
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
			<p class="font-medium mb-2 text-gray-800">
				{$t('common.model3d.error')}
			</p>
			{#if fallbackImage}
				<img src={fallbackImage} alt="Fallback" class="max-h-32 opacity-60 grayscale mt-4 rounded-lg shadow-sm" />
			{:else}
				<p class="text-gray-500 text-sm">{$t('common.model3d.checkPath')}</p>
			{/if}
		</div>
	{/if}

	<!-- TOP TOOLBAR: Variant Selector & Pixel Art Toggle -->
	{#if !loading && !error}
		<div class="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-3 sm:right-3 z-20 flex items-center justify-between gap-1.5 sm:gap-2 pointer-events-none">
			<!-- Variants select (interactive) -->
			{#if modelVariants && modelVariants.length > 1}
				<div class="flex items-center gap-1 sm:gap-1.5 p-1 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 shadow-lg pointer-events-auto min-w-0 max-w-[calc(100%-115px)] sm:max-w-none">
					<div class="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 text-amber-400 flex-shrink-0">
						<span class="text-xs">
							{#if modelCategory === 'zombies'}🧟{:else if modelCategory === 'survivors'}🏃{:else if modelCategory === 'safehouse'}🏠{:else}📦{/if}
						</span>
					</div>
					<select
						value={activeModelPath}
						on:change={(e) => switchVariant(e.currentTarget.value)}
						class="bg-transparent text-white text-xs font-semibold py-1 px-1 sm:px-2 border-0 outline-none cursor-pointer focus:ring-0 max-w-[115px] xs:max-w-[155px] sm:max-w-[220px] truncate"
						title="Selecione o modelo 3D"
					>
						{#each modelVariants as v}
							<option value={v.path} class="bg-gray-900 text-white font-normal">{v.label}</option>
						{/each}
					</select>
				</div>
			{:else}
				<div class="bg-black/60 backdrop-blur-md rounded-lg px-2 sm:px-2.5 py-1 text-[11px] text-gray-300 font-medium shadow-sm border border-white/10 pointer-events-auto">
					{$t('common.model3d.instructions')}
				</div>
			{/if}

			<!-- Pixel Art Toggle Button -->
			<button
				on:click={togglePixelArt}
				class="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide backdrop-blur-md border shadow-md transition-all active:scale-95 flex-shrink-0 {isPixelArt
					? 'bg-amber-500 text-black border-amber-400 ring-2 ring-amber-500/30 shadow-amber-500/20'
					: 'bg-black/75 text-gray-300 border-white/10 hover:text-white hover:bg-black/85'}"
				title="Alternar filtro de render procedural pixel art (Depth Supersampling)"
			>
				<span class="text-sm">{isPixelArt ? '👾' : '✨'}</span>
				<span class="hidden xs:inline sm:inline">{isPixelArt ? 'Pixel Art: ON' : 'Pixel Art: OFF'}</span>
				<span class="inline xs:hidden sm:hidden">{isPixelArt ? 'Pixel' : 'Suave'}</span>
			</button>
		</div>

		<!-- FLOATING INTERACTIVE TOAST FEEDBACK -->
		{#if feedbackToast}
			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none px-4 py-2 bg-black/80 text-amber-300 text-xs sm:text-sm font-semibold rounded-full border border-amber-500/40 backdrop-blur-md shadow-2xl animate-fade-in"
			>
				{feedbackToast}
			</div>
		{/if}

		<!-- BOTTOM TOOLBAR: Animation Controls & Viewport Tools -->
		<div class="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 z-20 flex items-center justify-between gap-1.5 sm:gap-2 pointer-events-none">
			<!-- Animation select & play/pause -->
			{#if isHouseOrFurniture}
				<div class="flex items-center gap-1 sm:gap-1.5 p-1 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 shadow-lg pointer-events-auto min-w-0">
					<button
						on:click={togglePlayAnimation}
						class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95 flex-shrink-0"
						title={buildingCycleMode === 'cycle' && isPlayingAnimation ? 'Pausar Ciclo' : 'Iniciar Ciclo'}
						aria-label={buildingCycleMode === 'cycle' && isPlayingAnimation ? 'Pausar ciclo' : 'Iniciar ciclo'}
					>
						{#if buildingCycleMode === 'cycle' && isPlayingAnimation}
							<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
								<rect x="6" y="4" width="4" height="16" rx="1" />
								<rect x="14" y="4" width="4" height="16" rx="1" />
							</svg>
						{:else}
							<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
								<polygon points="5 3 19 12 5 21 5 3" />
							</svg>
						{/if}
					</button>

					<select
						value={buildingCycleMode}
						on:change={handleAnimationSelect}
						class="bg-transparent text-white text-xs font-medium py-1 px-1 sm:px-2 border-0 outline-none cursor-pointer focus:ring-0 max-w-[130px] xs:max-w-[170px] sm:max-w-[210px] truncate"
						title="Selecione o modo de exibição ou clique no modelo"
					>
						<option value="cycle" class="bg-gray-900 text-white">🔄 Ciclo: Abrir & Fechar</option>
						<option value="open" class="bg-gray-900 text-white">🚪 Manter Aberto (Fixo)</option>
						<option value="closed" class="bg-gray-900 text-white">🏠 Manter Fechado (Fixo)</option>
					</select>

					<span class="text-[10px] text-gray-400 pr-1 hidden md:inline" title="Clique no modelo para alternar">
						(clique no modelo)
					</span>
				</div>
			{:else if availableAnimations.length > 0}
				<div class="flex items-center gap-1 sm:gap-1.5 p-1 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 shadow-lg pointer-events-auto min-w-0">
					<button
						on:click={togglePlayAnimation}
						class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95 flex-shrink-0"
						title={isPlayingAnimation ? 'Pausar Animação' : 'Continuar Animação'}
						aria-label={isPlayingAnimation ? 'Pausar animação' : 'Continuar animação'}
					>
						{#if isPlayingAnimation}
							<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
								<rect x="6" y="4" width="4" height="16" rx="1" />
								<rect x="14" y="4" width="4" height="16" rx="1" />
							</svg>
						{:else}
							<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
								<polygon points="5 3 19 12 5 21 5 3" />
							</svg>
						{/if}
					</button>

					<select
						value={currentAnimationName}
						on:change={handleAnimationSelect}
						class="bg-transparent text-white text-xs font-medium py-1 px-1 sm:px-2 border-0 outline-none cursor-pointer focus:ring-0 max-w-[105px] xs:max-w-[140px] sm:max-w-[180px] truncate"
						title="Selecione a animação ou clique no modelo"
					>
						{#each availableAnimations as anim}
							<option value={anim} class="bg-gray-900 text-white">{anim}</option>
						{/each}
					</select>

					<span class="text-[10px] text-gray-400 pr-1 hidden md:inline" title="Clique no modelo para interagir">
						(clique no modelo)
					</span>
				</div>
			{:else}
				<div></div>
			{/if}

			<!-- Standard Camera Actions (Zoom, Auto-Rotate, Reset, Screenshot) -->
			<div class="flex items-center gap-1 sm:gap-1.5 pointer-events-auto flex-shrink-0">
				<!-- Zoom buttons visible on sm+ screens (desktop/tablet) -->
				<button
					on:click={zoomIn}
					class="hidden sm:flex w-8 h-8 bg-black/75 hover:bg-black/90 backdrop-blur-md text-white rounded-lg items-center justify-center shadow-md border border-white/10 transition-colors active:scale-95"
					title="Zoom In"
					aria-label="Aproximar zoom"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6" />
					</svg>
				</button>

				<button
					on:click={zoomOut}
					class="hidden sm:flex w-8 h-8 bg-black/75 hover:bg-black/90 backdrop-blur-md text-white rounded-lg items-center justify-center shadow-md border border-white/10 transition-colors active:scale-95"
					title="Zoom Out"
					aria-label="Afastar zoom"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
					</svg>
				</button>

				<!-- Auto-rotate: visible on all screens -->
				<button
					on:click={toggleAutoRotate}
					class="w-7 h-7 sm:w-8 sm:h-8 bg-black/75 hover:bg-black/90 backdrop-blur-md text-white rounded-lg flex items-center justify-center shadow-md border border-white/10 transition-colors active:scale-95 {isAutoRotating ? 'text-amber-400 border-amber-500/40 ring-1 ring-amber-500/30' : ''}"
					title={isAutoRotating ? 'Parar rotação automática' : 'Iniciar rotação automática'}
					aria-label="Rotação automática"
				>
					<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if isAutoRotating}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
						{/if}
					</svg>
				</button>

				<!-- Reset camera: essential on all screens -->
				<button
					on:click={resetCamera}
					class="w-7 h-7 sm:w-8 sm:h-8 bg-black/75 hover:bg-black/90 backdrop-blur-md text-white rounded-lg flex items-center justify-center shadow-md border border-white/10 transition-colors active:scale-95"
					title="Resetar Câmera"
					aria-label="Resetar câmera"
				>
					<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
				</button>

				<!-- Screenshot button -->
				<button
					on:click={takeScreenshot}
					class="w-7 h-7 sm:w-8 sm:h-8 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg flex items-center justify-center shadow-md transition-colors active:scale-95 flex-shrink-0"
					title="Tirar Screenshot do Modelo"
					aria-label="Tirar screenshot"
				>
					<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
		</div>
	{/if}
</div>

<style>
	:global(canvas) {
		display: block;
		width: 100% !important;
		height: 100% !important;
		outline: none;
		touch-action: none;
	}

	:global(canvas.pixelated) {
		image-rendering: -webkit-optimize-contrast;
		image-rendering: -moz-crisp-edges;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translate(-50%, -40%); }
		to { opacity: 1; transform: translate(-50%, -50%); }
	}
	.animate-fade-in {
		animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
</style>
