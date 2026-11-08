<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let isOpen = false;
	export let imageSrc: string;
	export let altText: string = 'Image';
	export let images: string[] = [];

	let currentIndex = 0;

	$: if (isOpen && images.length > 0) {
		const foundIndex = images.indexOf(imageSrc);
		currentIndex = foundIndex !== -1 ? foundIndex : 0;
	}

	$: currentSrc = images.length > 0 ? images[currentIndex] : imageSrc;

	function closeModal() {
		isOpen = false;
	}

	function nextImage(e?: Event) {
		e?.stopPropagation();
		if (images.length > 1) {
			currentIndex = (currentIndex + 1) % images.length;
		}
	}

	function prevImage(e?: Event) {
		e?.stopPropagation();
		if (images.length > 1) {
			currentIndex = (currentIndex - 1 + images.length) % images.length;
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		} else if (event.key === 'ArrowRight') {
			nextImage();
		} else if (event.key === 'ArrowLeft') {
			prevImage();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	
	<div
		class="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4"
		on:click={handleBackdropClick}
		role="presentation"
		transition:fade={{ duration: 200 }}
	>
		<div
			class="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
			transition:scale={{ duration: 300, easing: quintOut, start: 0.9 }}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<button
				on:click={closeModal}
				class="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors z-50 p-1"
				aria-label="Close modal"
			>
				<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			
			{#if images.length > 1}
				<button
					class="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 p-2.5 text-white/70 hover:text-white transition-colors z-50 bg-black/40 hover:bg-black/60 md:bg-black/30 rounded-full"
					on:click={prevImage}
					aria-label="Previous image"
				>
					<svg
						class="w-7 h-7 md:w-9 md:h-9"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
			{/if}

			<div class="relative flex items-center justify-center max-w-full max-h-[85vh]">
				<img
					src={currentSrc}
					alt={altText}
					class="max-w-[85vw] md:max-w-[70vw] max-h-[78vh] w-auto h-auto rounded-2xl shadow-2xl object-contain {currentSrc && currentSrc.includes('wearos') ? 'rounded-full bg-neutral-900 border-4 border-white/20' : ''}"
				/>
			</div>

			{#if images.length > 1}
				<div class="mt-3 px-3 py-1 bg-black/60 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full">
					{currentIndex + 1} / {images.length}
				</div>
			{/if}

			
			{#if images.length > 1}
				<button
					class="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 p-2.5 text-white/70 hover:text-white transition-colors z-50 bg-black/40 hover:bg-black/60 md:bg-black/30 rounded-full"
					on:click={nextImage}
					aria-label="Next image"
				>
					<svg
						class="w-7 h-7 md:w-9 md:h-9"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			{/if}
		</div>
	</div>
{/if}
