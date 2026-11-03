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
		class="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4"
		on:click={handleBackdropClick}
		role="presentation"
		transition:fade={{ duration: 200 }}
	>
		<div
			class="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
			transition:scale={{ duration: 300, easing: quintOut, start: 0.9 }}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<button
				on:click={closeModal}
				class="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors z-50"
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
					class="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-50 bg-black/20 md:bg-transparent rounded-full"
					on:click={prevImage}
					aria-label="Previous image"
				>
					<svg
						class="w-8 h-8 md:w-10 md:h-10"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
			{/if}

			<img
				src={images.length > 0 ? images[currentIndex] : imageSrc}
				alt={altText}
				class="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
			/>

			
			{#if images.length > 1}
				<button
					class="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-50 bg-black/20 md:bg-transparent rounded-full"
					on:click={nextImage}
					aria-label="Next image"
				>
					<svg
						class="w-8 h-8 md:w-10 md:h-10"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			{/if}
		</div>
	</div>
{/if}
