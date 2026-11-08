<script lang="ts">
	import { fade } from 'svelte/transition';
	import { t } from '$lib/i18n';
	import { toolIcons, getToolIcon } from '$lib/config/toolIcons';
	import CustomSelect from './CustomSelect.svelte';
	import WearOSCarousel from './WearOSCarousel.svelte';
	import ImageModal from './ImageModal.svelte';

	export let isOpen = false;
	export let project: {
		name: string;
		image: string;
		description: string;
		technologies?: string[];
		features?: string[];
		link?: string;
		githubUrl?: string;
		apkUrl?: string;
		apkSize?: string;
		isWearOS?: boolean;
		wearosImages?: string[];
		role?: string;
		year?: string;
		architectureDiagrams?: string[];
		additionalImages?: string[];
		phoneImages?: string[];
		modelPath?: string;
		videoUrl?: string;
	};

	export let categories: any[] = [];
	export let currentCategoryId = '';
	export let currentProjectIndex = -1;
	export let onProjectChange: (catId: string, index: number) => void = () => {};

	let closing = false;
	let visible = false;

	// Carousel state
	let currentSlide = 0;
	let touchStartX = 0;
	let touchEndX = 0;

	$: if (isOpen && !closing) {
		visible = true;
	}

	// Image modal state for zoom / full view
	let isImageModalOpen = false;
	let zoomImageSrc = '';
	let zoomImageAlt = '';
	let zoomImages: string[] = [];

	function openImageZoom(src: string, alt: string, imagesList: string[] = []) {
		zoomImageSrc = src;
		zoomImageAlt = alt;
		zoomImages = imagesList.length > 0 ? imagesList : [src];
		isImageModalOpen = true;
	}

	// Reset carousel slide when project changes
	$: if (project) {
		currentSlide = 0;
	}

	// Compute unique slides (images, video, 3D model)
	type Slide = {
		type: 'image' | 'video' | 'model';
		src: string;
		alt: string;
		label?: string;
	};

	$: slides = computeSlides(project);

	function computeSlides(p: typeof project): Slide[] {
		if (!p) return [];
		const list: Slide[] = [];
		const seenUrls = new Set<string>();

		// 1. 3D Model slide if available
		if (p.modelPath) {
			list.push({
				type: 'model',
				src: p.modelPath,
				alt: `Modelo 3D - ${p.name}`,
				label: 'Modelo 3D Interativo'
			});
		}

		// 2. Video slide if available
		if (p.videoUrl) {
			list.push({
				type: 'video',
				src: p.videoUrl,
				alt: `Vídeo - ${p.name}`,
				label: 'Vídeo Demonstrativo'
			});
		}

		// Helper to add image if valid and not duplicate
		const addImg = (src?: string, label?: string) => {
			if (!src || typeof src !== 'string') return;
			const clean = src.trim();
			if (!clean || seenUrls.has(clean)) return;
			seenUrls.add(clean);
			list.push({
				type: 'image',
				src: clean,
				alt: `${p.name} - ${label || 'Imagem'}`,
				label
			});
		};

		// 3. Primary image
		addImg(p.image, 'Visão Geral');

		// 4. Additional images gallery
		if (p.additionalImages && Array.isArray(p.additionalImages)) {
			p.additionalImages.forEach((img, idx) => addImg(img, `Tela ${idx + 1}`));
		}

		// 5. Phone / Showcase images
		if (p.phoneImages && Array.isArray(p.phoneImages)) {
			p.phoneImages.forEach((img, idx) => addImg(img, `Visualização ${idx + 1}`));
		}

		// 6. Architecture diagrams
		if (p.architectureDiagrams && Array.isArray(p.architectureDiagrams)) {
			p.architectureDiagrams.forEach((diag, idx) => addImg(diag, `Arquitetura ${idx + 1}`));
		}

		return list;
	}

	function nextSlide() {
		if (slides.length <= 1) return;
		currentSlide = (currentSlide + 1) % slides.length;
	}

	function prevSlide() {
		if (slides.length <= 1) return;
		currentSlide = (currentSlide - 1 + slides.length) % slides.length;
	}

	function goToSlide(idx: number) {
		currentSlide = idx;
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.changedTouches[0].screenX;
	}

	function handleTouchEnd(e: TouchEvent) {
		touchEndX = e.changedTouches[0].screenX;
		const diff = touchStartX - touchEndX;
		if (Math.abs(diff) > 45) {
			if (diff > 0) nextSlide();
			else prevSlide();
		}
	}

	function handleImageError(e: Event) {
		const target = e.currentTarget as HTMLImageElement | null;
		if (target) {
			target.src = '/assets/img/clients/simbium.jpg';
		}
	}

	function closeModal() {
		if (closing) return;
		closing = true;
		setTimeout(() => {
			isOpen = false;
			closing = false;
			visible = false;
		}, 350);
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!isOpen) return;
		if (event.key === 'Escape') {
			closeModal();
		} else if (event.key === 'ArrowRight') {
			nextSlide();
		} else if (event.key === 'ArrowLeft') {
			prevSlide();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if visible}
	<div
		class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
		class:modal-backdrop-enter={!closing}
		class:modal-backdrop-exit={closing}
		on:click={handleBackdropClick}
		role="presentation"
	>
		<div
			class="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto flex flex-col relative"
			class:modal-spring-enter={!closing}
			class:modal-spring-exit={closing}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<!-- TOP STICKY BAR: Selectors + Close Button on the exact same row -->
			<div
				class="sticky top-0 bg-white/95 backdrop-blur-md z-30 border-b border-gray-100 px-4 sm:px-6 md:px-8 py-3 flex items-end justify-between gap-3 shadow-sm"
			>
				<div class="flex flex-1 items-end gap-2.5 sm:gap-4 min-w-0">
					{#if categories.length > 0}
						<div class="flex-1 min-w-[120px] sm:min-w-[150px] max-w-[200px] sm:max-w-[240px]">
							<CustomSelect
								label={$t('common.modal.category')}
								value={currentCategoryId}
								options={categories.map((c) => ({ value: c.id, label: c.label }))}
								onChange={(val) => onProjectChange(val, 0)}
							/>
						</div>

						<div class="flex-1 min-w-[150px] sm:min-w-[200px]">
							<CustomSelect
								label={$t('common.modal.project')}
								value={currentProjectIndex}
								options={(categories.find((c) => c.id === currentCategoryId)?.projects || []).map(
									(p, i) => ({ value: i, label: p.name })
								)}
								onChange={(val) => onProjectChange(currentCategoryId, val)}
							/>
						</div>
					{/if}
				</div>

				<!-- Close Button (X) aligned in the exact same top row -->
				<div class="flex flex-col justify-end">
					<button
						on:click={closeModal}
						class="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black transition-all active:scale-95 shadow-xs"
						aria-label="Close modal"
						title="Fechar modal (Esc)"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- MODAL BODY -->
			<div class="px-4 sm:px-6 md:px-8 py-5 sm:py-6">
				<!-- Project Header (Normal flow, non-sticky) -->
				<div class="mb-5 sm:mb-6">
					<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
						<h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-950 tracking-tight leading-snug">
							{project.name}
						</h3>
					</div>

					{#if project.role || project.year}
						<div class="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
							{#if project.role}
								<span
									class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium border border-gray-200/60"
								>
									<svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
									{project.role}
								</span>
							{/if}
							{#if project.year}
								<span
									class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium border border-gray-200/60"
								>
									<svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									{project.year}
								</span>
							{/if}
						</div>
					{/if}
				</div>

				<!-- CAROUSEL / MEDIA SECTION -->
				{#if project.isWearOS || (project.wearosImages && project.wearosImages.length > 0)}
					{@const watchImgs = project.wearosImages && project.wearosImages.length > 0 ? project.wearosImages : [project.image]}
					<div class="mb-6 sm:mb-8 flex flex-col gap-3">
						<WearOSCarousel
							images={watchImgs}
							name={project.name}
							maxVisible={5}
							onImageClick={(src) => openImageZoom(src, project.name, watchImgs)}
						/>
					</div>
				{:else if slides.length > 0}
					<div class="mb-6 sm:mb-8 flex flex-col gap-3">
						<!-- Main Viewport -->
						<div
							class="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100/80 border border-gray-200/70 shadow-sm flex items-center justify-center min-h-[260px] sm:min-h-[340px] md:min-h-[400px] max-h-[500px] select-none group"
							on:touchstart={handleTouchStart}
							on:touchend={handleTouchEnd}
						>
							{#each slides as slide, i}
								{#if i === currentSlide}
									<div class="w-full h-full flex items-center justify-center p-2 sm:p-4">
										{#if slide.type === 'model'}
											{#await import('./Model3DViewer.svelte') then { default: Model3DViewer }}
												<svelte:component
													this={Model3DViewer}
													modelPath={slide.src}
													fallbackImage={project.image}
												/>
											{:catch}
												<img
													src={project.image}
													alt={project.name}
													class="w-auto h-auto max-w-full max-h-[440px] object-contain drop-shadow-md rounded-lg"
												/>
											{/await}
										{:else if slide.type === 'video'}
											<video
												src={slide.src}
												controls
												class="w-full max-h-[440px] object-contain rounded-xl shadow-md"
											>
												<track kind="captions" />
											</video>
										{:else}
											<img
												src={slide.src}
												alt={slide.alt}
												loading="lazy"
												class="w-auto h-auto max-w-full max-h-[440px] object-contain drop-shadow-md rounded-xl transition-all duration-300"
												on:error={handleImageError}
											/>
										{/if}
									</div>
								{/if}
							{/each}

							<!-- Top Right Badge (Counter) -->
							{#if slides.length > 1}
								<div
									class="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-sm z-10"
								>
									{currentSlide + 1} / {slides.length}
								</div>
							{/if}

							<!-- Navigation Arrows (Left/Right) -->
							{#if slides.length > 1}
								<button
									class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-lg backdrop-blur-md flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 border border-white/60 z-10"
									aria-label="Slide anterior"
									on:click|stopPropagation={prevSlide}
								>
									<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
									</svg>
								</button>

								<button
									class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-lg backdrop-blur-md flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 border border-white/60 z-10"
									aria-label="Próximo slide"
									on:click|stopPropagation={nextSlide}
								>
									<svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
									</svg>
								</button>

								<!-- Bottom Dots Indicator -->
								<div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
									{#each slides as _, idx}
										<button
											class="w-2 h-2 rounded-full transition-all {idx === currentSlide ? 'w-5 bg-white' : 'bg-white/50 hover:bg-white/80'}"
											aria-label="Ir para o slide {idx + 1}"
											on:click|stopPropagation={() => goToSlide(idx)}
										/>
									{/each}
								</div>
							{/if}
						</div>

						<!-- Thumbnails Row (if > 1 slide) -->
						{#if slides.length > 1}
							<div class="flex items-center gap-2 overflow-x-auto py-1 px-1 no-scrollbar">
								{#each slides as slide, idx}
									<button
										class="relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all bg-gray-100 p-0.5 {idx === currentSlide ? 'border-[#dd206b] ring-2 ring-[#dd206b]/30 scale-105' : 'border-gray-200 opacity-60 hover:opacity-100'}"
										on:click={() => goToSlide(idx)}
										aria-label="Ver miniatura {idx + 1}"
									>
										{#if slide.type === 'model'}
											<div class="w-full h-full bg-purple-50 flex items-center justify-center text-[10px] font-bold text-purple-700">
												3D
											</div>
										{:else if slide.type === 'video'}
											<div class="w-full h-full bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-700">
												VÍDEO
											</div>
										{:else}
											<img
												src={slide.src}
												alt="Miniatura {idx + 1}"
												class="w-full h-full object-cover rounded-lg"
												loading="lazy"
											/>
										{/if}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/if}

				<!-- Role / Importance Section (Meu Papel) -->
				<div class="mb-6 sm:mb-8">
					<h4 class="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
						{$t('common.modal.role')}
					</h4>
					<div class="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
						{@html project.description}
					</div>
				</div>

				<!-- Technologies Section -->
				{#if project.technologies && project.technologies.length > 0}
					<div class="mb-6 sm:mb-8">
						<h4 class="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
							{$t('common.modal.tech')}
						</h4>
						<div class="flex flex-wrap gap-2 sm:gap-2.5 items-center">
							{#each project.technologies as tech}
								{#if getToolIcon(tech)}
									<div
										class="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200/80 rounded-xl shadow-xs text-xs sm:text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100"
										title={tech}
									>
										<img src={getToolIcon(tech)} alt={tech} class="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
										<span>{tech}</span>
									</div>
								{:else}
									<span class="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs sm:text-sm font-medium border border-blue-100">
										{tech}
									</span>
								{/if}
							{/each}
						</div>
					</div>
				{/if}

				<!-- About Project / Topics Section (Sobre o Projeto) -->
				{#if project.features && Array.isArray(project.features) && project.features.length > 0}
					<div class="mb-6 sm:mb-8">
						<h4 class="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
							{$t('common.modal.features')}
						</h4>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
							{#each project.features as feature}
								<div class="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-gray-50/80 border border-gray-200/70 text-xs sm:text-sm text-gray-800 leading-relaxed">
									<svg
										class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2.2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span class="font-normal">{feature}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Action Buttons (Bottom) -->
				<div class="flex flex-wrap gap-3 pt-5 border-t border-gray-100 mt-6">
					{#if project.apkUrl}
						<a
							href={project.apkUrl}
							download
							class="flex-1 min-w-[200px] px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-center transition-all flex items-center justify-center gap-2 no-underline shadow-md active:scale-98"
						>
							<svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
								/>
							</svg>
							<span>{$t('common.modal.downloadApk')}</span>
							{#if project.apkSize}
								<span class="text-xs bg-emerald-800/80 px-2 py-0.5 rounded-full font-mono">{project.apkSize}</span>
							{/if}
						</a>
					{/if}
					{#if project.link}
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							class="flex-1 min-w-[200px] px-6 py-3 bg-black text-white rounded-xl font-semibold text-center hover:bg-gray-800 active:scale-98 transition-all flex items-center justify-center gap-2 no-underline shadow-md"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
							{$t('common.modal.viewProject')}
						</a>
					{/if}
					{#if project.githubUrl}
						<a
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="flex-1 min-w-[200px] px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold text-center hover:bg-gray-800 active:scale-98 transition-all flex items-center justify-center gap-2 no-underline shadow-md"
						>
							<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
								<path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								/>
							</svg>
							{$t('common.modal.viewCode')}
						</a>
					{/if}
				</div>
			</div>
		</div>

		<!-- Desktop Previous / Next Project Floating Arrows -->
		{#if categories.length > 0}
			<button
				class="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition-all z-[60] group hidden md:flex shadow-lg"
				aria-label="Previous project"
				on:click={() => {
					const cat = categories.find((c) => c.id === currentCategoryId);
					if (currentProjectIndex > 0) {
						onProjectChange(currentCategoryId, currentProjectIndex - 1);
					} else {
						const catIndex = categories.findIndex((c) => c.id === currentCategoryId);
						const prevCatIndex = (catIndex - 1 + categories.length) % categories.length;
						const prevCat = categories[prevCatIndex];
						onProjectChange(prevCat.id, prevCat.projects.length - 1);
					}
				}}
			>
				<svg
					class="w-6 h-6 transform transition-transform group-hover:-translate-x-0.5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<button
				class="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition-all z-[60] group hidden md:flex shadow-lg"
				aria-label="Next project"
				on:click={() => {
					const cat = categories.find((c) => c.id === currentCategoryId);
					if (cat && currentProjectIndex < cat.projects.length - 1) {
						onProjectChange(currentCategoryId, currentProjectIndex + 1);
					} else {
						const catIndex = categories.findIndex((c) => c.id === currentCategoryId);
						const nextCatIndex = (catIndex + 1) % categories.length;
						onProjectChange(categories[nextCatIndex].id, 0);
					}
				}}
			>
				<svg
					class="w-6 h-6 transform transition-transform group-hover:translate-x-0.5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		{/if}
	</div>
{/if}

<ImageModal
	bind:isOpen={isImageModalOpen}
	imageSrc={zoomImageSrc}
	altText={zoomImageAlt}
	images={zoomImages}
/>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	@keyframes modalSpringIn {
		0% {
			opacity: 0;
			transform: scale(0.9) translateY(16px);
		}
		50% {
			opacity: 1;
			transform: scale(1.01) translateY(-2px);
		}
		100% {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@keyframes modalSpringOut {
		0% {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
		100% {
			opacity: 0;
			transform: scale(0.92) translateY(14px);
		}
	}

	@keyframes backdropFadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes backdropFadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	.modal-spring-enter {
		animation: modalSpringIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.modal-spring-exit {
		animation: modalSpringOut 0.25s cubic-bezier(0.4, 0, 1, 1) forwards;
	}

	.modal-backdrop-enter {
		animation: backdropFadeIn 0.25s ease forwards;
	}

	.modal-backdrop-exit {
		animation: backdropFadeOut 0.25s ease forwards;
	}
</style>
