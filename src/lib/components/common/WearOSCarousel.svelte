<script lang="ts">
	export let images: string[] = [];
	export let name: string = 'Wear OS';
	export let maxVisible: number = 5;
	export let onImageClick: ((src: string, index: number) => void) | undefined = undefined;

	let containerWidth = 0;
	let currentIndex = 0;
	let touchStartX = 0;
	let touchEndX = 0;

	// Responsive visible count: 1 on mobile (<440px), 3 on tablet (<720px), 5 on desktop (>=720px)
	$: dynamicVisible = calculateVisible(containerWidth, maxVisible, images.length);

	function calculateVisible(width: number, max: number, total: number): number {
		if (total <= 1) return 1;
		let count = 1;
		if (width >= 720) count = 5;
		else if (width >= 440) count = 3;
		else count = 1;
		count = Math.min(count, max, total);
		if (count === 4) count = 3;
		if (count === 2 && total >= 3) count = 3;
		return Math.max(1, count);
	}

	$: visibleItems = computeVisible(images, currentIndex, dynamicVisible);

	function computeVisible(imgs: string[], start: number, count: number) {
		if (!imgs || imgs.length === 0) return [];
		const result = [];
		const total = imgs.length;
		for (let i = 0; i < count; i++) {
			const idx = (start + i) % total;
			result.push({
				slotIndex: i,
				originalIndex: idx,
				src: imgs[idx],
				isCenter: count > 1 && i === Math.floor(count / 2)
			});
		}
		return result;
	}

	export function next() {
		if (images.length <= 1) return;
		currentIndex = (currentIndex + 1) % images.length;
	}

	export function prev() {
		if (images.length <= 1) return;
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	export function goTo(idx: number) {
		if (idx >= 0 && idx < images.length) {
			currentIndex = idx;
		}
	}

	function handleSlotClick(item: { originalIndex: number; src: string; isCenter: boolean }) {
		if (item.isCenter || dynamicVisible <= 1) {
			if (onImageClick) {
				onImageClick(item.src, item.originalIndex);
			}
		} else {
			const centerSlot = Math.floor(dynamicVisible / 2);
			const slot = visibleItems.findIndex((v) => v.originalIndex === item.originalIndex);
			const diff = slot - centerSlot;
			currentIndex = (currentIndex + diff + images.length) % images.length;
		}
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.changedTouches[0].screenX;
	}

	function handleTouchEnd(e: TouchEvent) {
		touchEndX = e.changedTouches[0].screenX;
		const diff = touchStartX - touchEndX;
		if (Math.abs(diff) > 35) {
			if (diff > 0) next();
			else prev();
		}
	}
</script>

<div
	bind:clientWidth={containerWidth}
	class="relative w-full select-none py-3 px-2 sm:px-4 bg-gray-50/80 rounded-2xl border border-gray-200/70 shadow-xs flex flex-col items-center justify-center gap-2.5"
	on:touchstart={handleTouchStart}
	on:touchend={handleTouchEnd}
	role="group"
	aria-label="Carrossel Wear OS"
>
	<!-- Carousel Row: Controls + Centered Watch Prints -->
	<div class="relative w-full flex items-center justify-between gap-2 sm:gap-3">
		<!-- Left Arrow Button -->
		{#if images.length > 1}
			<button
				type="button"
				class="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-gray-100 text-gray-700 shadow-sm border border-gray-200/90 flex items-center justify-center transition-all active:scale-95 cursor-pointer z-10"
				on:click|stopPropagation={prev}
				aria-label="Anterior"
				title="Anterior"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
		{/if}

		<!-- Watch Prints Row -->
		<div class="flex-1 flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5 overflow-hidden py-1">
			{#each visibleItems as item (item.originalIndex + '-' + item.slotIndex)}
				<button
					type="button"
					class="group/watch relative flex flex-col items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer flex-shrink-0"
					class:scale-105={dynamicVisible > 1 && item.isCenter}
					class:opacity-75={dynamicVisible > 1 && !item.isCenter}
					class:hover:opacity-100={!item.isCenter}
					on:click|stopPropagation={() => handleSlotClick(item)}
					title="{name} - Tela #{item.originalIndex + 1}"
				>
					<!-- Circular Watch Print -->
					<div
						class="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-gray-100 shadow-lg border-2 transition-all duration-300 {item.isCenter ? 'border-emerald-500 shadow-emerald-500/25 ring-4 ring-emerald-500/20' : 'border-gray-200 hover:border-gray-300'}"
					>
						<img
							src={item.src}
							alt="{name} - Tela {item.originalIndex + 1}"
							loading="lazy"
							decoding="async"
							class="w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover/watch:scale-105"
						/>
					</div>
					{#if item.isCenter || dynamicVisible <= 1}
						<span class="mt-1 text-[10px] font-medium text-gray-500 flex items-center gap-1 opacity-0 group-hover/watch:opacity-100 transition-opacity">
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
							</svg>
							Clique para ampliar
						</span>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Right Arrow Button -->
		{#if images.length > 1}
			<button
				type="button"
				class="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-gray-100 text-gray-700 shadow-sm border border-gray-200/90 flex items-center justify-center transition-all active:scale-95 cursor-pointer z-10"
				on:click|stopPropagation={next}
				aria-label="Próximo"
				title="Próximo"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		{/if}
	</div>

	<!-- Pagination Dots -->
	{#if images.length > 1}
		<div class="flex items-center gap-1.5 py-0.5">
			{#each images as _, idx}
				<button
					type="button"
					class="h-1.5 rounded-full transition-all duration-300 cursor-pointer {idx === currentIndex ? 'w-4 bg-emerald-500' : 'w-1.5 bg-gray-300 hover:bg-gray-400'}"
					on:click|stopPropagation={() => goTo(idx)}
					aria-label="Ir para tela #{idx + 1}"
				/>
			{/each}
		</div>
	{/if}
</div>
