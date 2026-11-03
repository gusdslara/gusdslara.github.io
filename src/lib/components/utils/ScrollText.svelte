<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	export let text: string = '';
	export let className: string = '';
	export let stagger: number = 0.05;
	export let scrub: number | boolean = 1;
	export let start: string = 'top 95%';
	export let end: string = 'top 70%';
	export let ease: string = 'elastic.out(1, 0.5)';

	let container: HTMLElement;

	onMount(() => {
		const ctx = gsap.context(() => {
			const chars = Array.from(container.querySelectorAll('.char'));
			if (chars.length > 0) {
				gsap.from(chars, {
					scrollTrigger: {
						trigger: container,
						start,
						end,
						scrub
					},
					opacity: 0,
					y: 30,
					rotateX: -90,
					stagger,
					ease,
					duration: 1
				});
			}
		}, container);

		return () => ctx.revert();
	});

	
	$: words = text.split(' ').map((word, i, arr) => word + (i < arr.length - 1 ? ' ' : ''));
</script>

<span
	bind:this={container}
	class="scroll-text-container {className}"
	style="perspective: 1000px; display: inline; font-family: inherit; font-weight: inherit; color: inherit;"
>
	{#each words as word}
		<span class="word inline-block whitespace-nowrap">
			{#each word.split('') as char}
				<span
					class="char inline-block"
					style="transform-style: preserve-3d; will-change: transform, opacity;"
				>
					{char}
				</span>
			{/each}
		</span>
	{/each}
</span>

<style>
	.scroll-text-container {
		text-rendering: optimizeLegibility;
	}
	.word {
		display: inline-block;
	}
	.char {
		display: inline-block;
		white-space: pre;
	}
</style>
