<script lang="ts">
	import { onMount } from 'svelte';
	import { Motion } from 'svelte-motion';
	import { fadeUpVariant } from '$lib/utils/animations';

	let visible = false;
	let element: HTMLElement;

	export let delay = 0;
	export let customVariant = fadeUpVariant;
	export let rootMargin = '100px';
	export let threshold = 0.0;
	export let tag = 'div';
	export let className = '';
	export let id = '';

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
				}
			},
			{
				threshold,
				rootMargin
			}
		);

		if (element) {
			observer.observe(element);
		}

		return () => {
			if (element) {
				observer.unobserve(element);
			}
		};
	});

	$: currentState = visible ? 'visible' : 'hidden';

	
	$: variantWithDelay = delay
		? {
				...customVariant,
				visible: {
					...customVariant.visible,
					transition: {
						...customVariant.visible?.transition,
						delay
					}
				}
			}
		: customVariant;
</script>

<Motion initial="hidden" animate={currentState} variants={variantWithDelay} let:motion>
	<svelte:element
		this={tag}
		bind:this={element}
		use:motion
		class={`animated-section ${className}`}
		{id}
	>
		<slot />
	</svelte:element>
</Motion>

<style>
	.animated-section {
		width: 100%;
	}
</style>
