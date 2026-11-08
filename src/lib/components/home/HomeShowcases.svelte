<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Motion } from 'svelte-motion';
	import AnimatedSection from '$lib/components/utils/AnimatedSection.svelte';
	import { staggerContainer, fadeUpVariant } from '$lib/utils/animations';
	import ProjectModal from '$lib/components/common/ProjectModal.svelte';
	import ShowcaseCard from './ShowcaseCard.svelte';
	import ImageModal from '$lib/components/common/ImageModal.svelte';
	import ScrollText from '$lib/components/utils/ScrollText.svelte';
	import ShowcaseGridItem from './ShowcaseGridItem.svelte';
	import ShowcaseProjectItem from './ShowcaseProjectItem.svelte';
	import { t } from '$lib/i18n';

	let isModalOpen = false;
	let selectedProject: any = null;

	let isImageModalOpen = false;
	let selectedImageSrc = '';
	let selectedImageAlt = '';

	let selectedImages: string[] = [];

	let screenHeight = 0;
	let wrapperNode: HTMLElement;
	let scrollProgress = 0;
	let ticking = false;

	function easeInOutCubic(x: number) {
		return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
	}

	$: easeProgress = easeInOutCubic(scrollProgress);

	// "Zoom out of the letter": the transform origin sits inside the first
	// glyph's solid stroke, and the max scale is large enough for that stroke
	// alone to cover the whole viewport. So the black seen at the start IS the
	// letter (no fake black background).
	let immersiveText: HTMLElement;
	let firstCharEl: HTMLElement;
	let originX = 0;
	let originY = 0;
	let maxScale = 30;

	$: platformsLabel = $t('home.showcases.myPlatforms');
	// Re-measure when the label (locale) changes.
	$: if (platformsLabel && firstCharEl) tick().then(measureLetterStroke);

	// Linear progress in log space = constant perceived zoom speed (no long
	// all-black stall at the start).
	$: currentScale = Math.exp(Math.log(maxScale) * (1 - scrollProgress));

	function measureLetterStroke() {
		if (typeof document === 'undefined' || typeof window === 'undefined') return;
		if (!immersiveText || !firstCharEl) return;
		const style = getComputedStyle(immersiveText);
		const fontSize = parseFloat(style.fontSize);
		const char = firstCharEl.textContent || 'M';

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d', { willReadFrequently: true });
		if (!ctx) return;
		const font = `${style.fontStyle} ${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
		ctx.font = font;
		const m = ctx.measureText(char);
		const pad = Math.ceil(fontSize);
		canvas.width = Math.ceil(m.width + pad * 2);
		canvas.height = Math.ceil(fontSize * 2 + pad * 2);
		ctx.font = font;
		ctx.fillStyle = '#000';
		ctx.textBaseline = 'alphabetic';
		const baseline = pad + fontSize * 1.2;
		ctx.fillText(char, pad, baseline);

		const capH = m.actualBoundingBoxAscent || fontSize * 0.7;
		const rowY = Math.round(baseline - capH * 0.5);
		const row = ctx.getImageData(0, rowY, canvas.width, 1).data;
		let x0 = -1;
		let x1 = -1;
		for (let x = 0; x < canvas.width; x++) {
			const solid = row[x * 4 + 3] > 200;
			if (solid && x0 < 0) x0 = x;
			if (!solid && x0 >= 0) {
				x1 = x;
				break;
			}
		}
		if (x0 < 0 || x1 < 0) return;
		const stemW = Math.max(1, x1 - x0 - 1); // ignore anti-aliased edge
		const stemH = capH;

		// Baseline inside the DOM span: content-area top + font ascent.
		const ascent = m.fontBoundingBoxAscent ?? fontSize * 1.05;
		originX = firstCharEl.offsetLeft + (x0 + x1) / 2 - pad;
		originY = firstCharEl.offsetTop + ascent - capH * 0.5;

		// Screen position of the origin (container is the sticky viewport).
		const sx = immersiveText.offsetLeft + originX;
		const sy = immersiveText.offsetTop + originY;
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const needX = (2 * Math.max(sx, vw - sx)) / stemW;
		const needY = (2 * Math.max(sy, vh - sy)) / stemH;
		maxScale = Math.max(needX, needY) * 1.1;
	}

	function updateScrollProgress() {
		if (!wrapperNode || screenHeight <= 0) return;
		const rect = wrapperNode.getBoundingClientRect();
		const maxScroll = wrapperNode.offsetHeight - screenHeight;
		if (maxScroll > 0) {
			const rawProgress = -rect.top / maxScroll;
			scrollProgress = Math.max(0, Math.min(1, rawProgress));
		} else {
			scrollProgress = 0;
		}
	}

	function onScroll() {
		if (!ticking) {
			requestAnimationFrame(() => {
				updateScrollProgress();
				ticking = false;
			});
			ticking = true;
		}
	}

	function onResize() {
		screenHeight = window.innerHeight;
		measureLetterStroke();
		updateScrollProgress();
	}

	onMount(() => {
		screenHeight = window.innerHeight;
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });
		measureLetterStroke();
		document.fonts?.ready.then(measureLetterStroke);
		updateScrollProgress();

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		};
	});

	function openImageModal(src: string, alt: string, images: string[] = []) {
		selectedImageSrc = src;
		selectedImageAlt = alt;
		selectedImages = images;
		isImageModalOpen = true;
	}

	import { getToolIcon } from '$lib/config/toolIcons';
	import { clientApps, myApps, tabs, moreProjects } from '$lib/data/projects';

	let selectedTab = 'all';

	$: translatedClientApps = clientApps.map(app => ({
		...app,
		name: $t(`projects.${app.id}.name`, { default: app.name }),
		description: $t(`projects.${app.id}.description`, { default: app.description }),
		features: $t(`projects.${app.id}.features`, { default: app.features })
	}));

	$: translatedMyApps = myApps.map(app => ({
		...app,
		name: $t(`projects.${app.id}_my.name`, { default: app.name }),
		caption: $t(`projects.${app.id}_my.caption`, { default: app.caption }),
		description: $t(`projects.${app.id}_my.description`, { default: app.description }),
		features: $t(`projects.${app.id}_my.features`, { default: app.features })
	}));

	$: translatedMoreProjects = moreProjects.map(app => ({
		...app,
		name: $t(`projects.${app.id}.name`, { default: app.name }),
		description: $t(`projects.${app.id}.description`, { default: app.description }),
		features: $t(`projects.${app.id}.features`, { default: (app as any).features })
	}));

	function hasCategory(item: any, catId: string): boolean {
		if (item.categories && Array.isArray(item.categories)) {
			return item.categories.includes(catId);
		}
		if (Array.isArray(item.category)) {
			return item.category.includes(catId);
		}
		return (item.category || 'software') === catId;
	}

	$: filteredMyApps =
		selectedTab === 'all'
			? translatedMyApps
			: translatedMyApps.filter((p) => hasCategory(p, selectedTab));

	$: filteredMoreProjects =
		selectedTab === 'all'
			? translatedMoreProjects
			: translatedMoreProjects.filter((p) => hasCategory(p, selectedTab));

	// Unified categories for modal navigation
	$: projectCategories = [
		{ id: 'clients', label: $t('home.showcases.clients'), projects: translatedClientApps, icon: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z' },
		{ id: 'personal', label: $t('home.showcases.personal'), projects: translatedMyApps, icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' },
		...tabs
			.filter((tab) => tab.id !== 'all')
			.map((tab) => ({
				id: tab.id,
				label: $t(`projects.${tab.id}`),
				projects: translatedMoreProjects.filter((p) => hasCategory(p, tab.id)),
				icon: tab.icon
			}))
	];

	let currentCategoryId = '';
	let currentProjectIndex = -1;

	function openProjectModal(project: any) {
		selectedProject = project;
		// Find the category and index for the initial project
		for (const cat of projectCategories) {
			const index = cat.projects.findIndex((p: any) => p.id === project.id);
			if (index !== -1) {
				currentCategoryId = cat.id;
				currentProjectIndex = index;
				break;
			}
		}
		isModalOpen = true;
	}

	function handleProjectChange(newCategoryId: string, newIndex: number) {
		const category = projectCategories.find((c) => c.id === newCategoryId);
		if (category && category.projects[newIndex]) {
			selectedProject = category.projects[newIndex];
			currentCategoryId = newCategoryId;
			currentProjectIndex = newIndex;
		}
	}
</script>

<div id="showcases" class="home-showcases py-8 md:py-16 px-4 md:px-8 lg:px-12">
	<div class="mb-0 md:mb-0">
		<h2 class="text-3xl md:text-4xl font-medium whitespace-nowrap">
			<ScrollText text={$t('home.showcases.clients')} />
		</h2>
	</div>

	<div class="max-w-7xl mx-auto">
		<div class="h-12 md:h-16"></div>

		<div class="mb-12 md:mb-16">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
				{#each translatedClientApps as app, i}
					<div class="showcase-card-wrapper h-full" style="animation-delay: {i * 0.1}s;">
						<ShowcaseCard
							name={app.name}
							description={app.description}
							stackImages={app.stackImages}
							stackImageNames={app.stackImageNames ?? []}
							backgroundColor={app.backgroundColor}
							titleColor={app.titleColor || '#ffffff'}
							phoneImages={app.phoneImages}
							type={app.type === 'desktop'
								? 'desktop'
								: app.type === 'desktop-left'
									? 'desktop-left'
									: 'mobile'}
							secondaryInFront={app.secondaryInFront || false}
							onImageClick={(src) => openImageModal(src, app.name, app.phoneImages)}
							onClick={() => openProjectModal(app)}
							link={app.link}
						/>
					</div>
				{/each}
			</div>
		</div>

		<div class="h-12 md:h-16"></div>
	</div>

	<div class="mb-6 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
		<h2 class="text-3xl md:text-4xl font-medium whitespace-nowrap m-0">
			<ScrollText text={$t('home.showcases.personal')} />
		</h2>

		<div
			class="flex bg-gray-100/50 backdrop-blur-md p-1 rounded-xl border border-gray-200/50 self-start md:self-center overflow-x-auto no-scrollbar max-w-full"
		>
			{#each tabs as tab}
				<button
					class="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap {selectedTab ===
					tab.id
						? 'text-black'
						: 'text-black/50'}"
					on:click={() => (selectedTab = tab.id)}
				>
					{#if selectedTab === tab.id}
						<Motion
							layoutId="activeTabPersonal"
							transition={{ type: 'spring', stiffness: 400, damping: 30 }}
							let:motion
						>
							<div use:motion class="absolute inset-0 bg-white shadow-sm rounded-lg"></div>
						</Motion>
					{/if}
					<span class="relative z-10 flex items-center gap-2">
						<svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
							<path d={tab.icon} />
						</svg>
						{$t(`projects.${tab.id}`)}
					</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="max-w-7xl mx-auto">
		{#key selectedTab}
			{#if filteredMyApps.length > 0}
				<div class="mb-4 md:mb-6">
					<AnimatedSection
						customVariant={staggerContainer}
						className="grid grid-cols-1 md:grid-cols-2 gap-4"
					>
						{#each filteredMyApps as app, i (app.id)}
							<ShowcaseProjectItem {app} openProjectModal={() => openProjectModal(app)} />
						{/each}
					</AnimatedSection>
				</div>
			{/if}

			<AnimatedSection
				customVariant={staggerContainer}
				delay={0.2}
				className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
			>
				{#each filteredMoreProjects as logo, i (logo.id)}
					<ShowcaseGridItem {logo} openProjectModal={() => openProjectModal(logo)} />
				{/each}
			</AnimatedSection>
		{/key}
	</div>
</div>

<div
	bind:this={wrapperNode}
	class="immersive-wrapper relative"
	style="height: {typeof window !== 'undefined'
		? window.innerHeight * 1.5 + 'px'
		: '150vh'}; contain: layout style paint;"
>
	<div
		class="immersive-container sticky top-0 h-screen flex items-end justify-start overflow-hidden pb-16 md:pb-24 px-4 md:px-8 lg:px-12"
		style="z-index: 1; background-color: #ffffff; contain: layout style paint; pointer-events: {easeProgress <
		0.95
			? 'none'
			: 'auto'};"
	>
		<h2
			bind:this={immersiveText}
			class="immersive-text relative text-3xl md:text-4xl font-medium text-left whitespace-nowrap"
			style="transform: scale({Math.max(
				1,
				currentScale
			)}); color: #000000; transform-origin: {originX}px {originY}px;"
		>
			<span bind:this={firstCharEl}>{platformsLabel.charAt(0)}</span>{platformsLabel.slice(1)}
		</h2>
	</div>
	<span id="platforms"></span>
</div>

{#if selectedProject}
	<ProjectModal
		bind:isOpen={isModalOpen}
		project={selectedProject}
		categories={projectCategories}
		{currentCategoryId}
		{currentProjectIndex}
		onProjectChange={handleProjectChange}
	/>
{/if}

<ImageModal
	bind:isOpen={isImageModalOpen}
	imageSrc={selectedImageSrc}
	altText={selectedImageAlt}
	images={selectedImages}
/>

<style>
</style>
