<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { fadeUpVariant } from '$lib/utils/animations';

	export let href: string;
	export let title: string;
	export let description: string;
	export let buttonText: string;
	export let imgSrc: string;
	export let imgAlt: string;
	export let gradientClass: string;
	export let isOpenSource: boolean = false;
	export let technologies: string[] = [];

	import { getToolIcon } from '$lib/config/toolIcons';
</script>

<Motion
	variants={fadeUpVariant}
	whileHover={{ y: -8, scale: 1.02 }}
	whileTap={{ scale: 0.98 }}
	transition={{ type: 'spring', stiffness: 400, damping: 10 }}
	let:motion
>
	<a
		use:motion
		{href}
		target="_blank"
		rel="noopener"
		class="block relative rounded-xl overflow-hidden {gradientClass} no-underline text-black border-none shadow-md"
	>
		{#if isOpenSource}
			<div class="absolute top-0 right-0 z-10 w-[150px] h-[150px] overflow-hidden">
				<span
					class="block absolute w-[200px] py-2 bg-green-500 text-white text-center text-sm rotate-45 top-[30px] -right-[50px] shadow-lg"
				>
					Open Source
				</span>
			</div>
		{/if}

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-12 items-center">
			<div class="text-content">
				<div class="flex items-center justify-center my-4 md:hidden">
					<img src={imgSrc} alt={imgAlt} class="max-w-[70%] h-auto" />
				</div>
				<h3 class="text-3xl md:text-4xl font-medium mb-4">{title}</h3>
				<p class="text-base md:text-lg leading-relaxed text-black/75 mb-6">
					{description}
				</p>

				{#if technologies && technologies.length > 0}
					<div class="flex flex-wrap gap-2 mb-8">
						{#each technologies as tech}
							{#if getToolIcon(tech)}
								<div
									class="w-8 h-8 bg-white/70 backdrop-blur-sm rounded-lg flex items-center justify-center p-1.5 shadow-sm border border-white/50"
									title={tech}
								>
									<img
										src={getToolIcon(tech)}
										alt={tech}
										class="w-full h-full object-contain opacity-90"
									/>
								</div>
							{/if}
						{/each}
					</div>
				{/if}

				<button
					class="bg-[#dd206b] text-white border-none px-8 py-3 rounded font-medium transition-all duration-300 hover:bg-[#c01252] hover:-translate-y-0.5"
				>
					{buttonText}
				</button>
			</div>

			<div class="hidden md:flex items-center justify-center">
				<img src={imgSrc} alt={imgAlt} class="max-w-full h-auto" />
			</div>
		</div>
	</a>
</Motion>
