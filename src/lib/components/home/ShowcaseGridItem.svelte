<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { fadeUpVariant } from '$lib/utils/animations';
	import { getToolIcon } from '$lib/config/toolIcons';
	import { tabs } from '$lib/data/projects';
	import { t } from '$lib/i18n';

	export let logo: any;
	export let openProjectModal: (project: any) => void;

	$: categoryTab = tabs.find((tab) => tab.id === logo.category);
</script>

<Motion variants={fadeUpVariant} initial="hidden" animate="visible" exit="hidden" let:motion>
	<Motion
		whileHover={{ scale: 1.05 }}
		transition={{ type: 'spring', stiffness: 400, damping: 10 }}
		let:motion={hoverMotion}
	>
		<button
			use:motion
			class="group relative p-3 md:p-4 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden h-44 md:h-48"
			style="background: {logo.color};"
			on:click={() => openProjectModal(logo)}
			tabindex="0"
		>
			<div
				use:hoverMotion
				class="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4"
			>
				{#if categoryTab}
					<div
						class="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm text-[10px] font-semibold text-black/80"
					>
						<svg class="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
							<path d={categoryTab.icon} />
						</svg>
						<span>{$t(`projects.${categoryTab.id}`)}</span>
					</div>
				{/if}

				{#if logo.githubUrl}
					<div class="absolute top-0 right-0 z-10 w-[100px] h-[100px] overflow-hidden">
						<span
							class="block absolute w-[140px] py-1 bg-green-500 text-white text-center text-[10px] font-medium rotate-45 top-[20px] -right-[35px] shadow-lg"
						>
							Open Source
						</span>
					</div>
				{/if}

				<div class="flex flex-col items-center justify-center w-full mt-2 md:mt-0 z-10">
					<img
						src={logo.image}
						alt={logo.name}
						class="max-w-full h-10 md:h-12 object-contain transition-transform duration-300 group-hover:scale-90"
					/>
					<span class="text-black font-semibold text-xs mt-3 text-center px-2">{logo.name}</span>

					{#if logo.technologies}
						<div class="flex flex-wrap gap-1.5 justify-center mt-3 z-20">
							{#each logo.technologies.slice(0, 4) as tech}
								{#if getToolIcon(tech)}
									<div
										class="w-6 h-6 bg-white/70 backdrop-blur-sm rounded-lg flex flex-shrink-0 items-center justify-center p-1 shadow-sm border border-white/50"
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
							{#if logo.technologies.length > 4}
								<div
									class="w-6 h-6 bg-white/70 backdrop-blur-sm rounded-lg flex flex-shrink-0 items-center justify-center shadow-sm border border-white/50 text-[9px] font-bold text-black/70"
									title={logo.technologies.slice(4).join(', ')}
								>
									+{logo.technologies.length - 4}
								</div>
							{/if}
						</div>
					{/if}
				</div>

				<div
					class="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-3 gap-2 transform scale-95 group-hover:scale-100 z-30 backdrop-blur-sm"
				>
					<h5 class="text-white font-bold text-xs md:text-sm text-center">{logo.name}</h5>
					<p class="text-white/80 text-[clamp(0.6rem,1.5vw,0.8rem)] text-center">
						{logo.description}
					</p>
					<div class="flex flex-wrap gap-2 justify-center mt-1">
						<button
							class="bg-white/20 text-white backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[10px] font-semibold hover:bg-white/30 transition-all border border-white/20 flex items-center gap-1"
							on:click|stopPropagation={() => openProjectModal(logo)}
						>
							<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 512 512">
								<path
									d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
								/>
							</svg>
							Saiba Mais
						</button>
						{#if logo.link}
							<a
								href={logo.link}
								target="_blank"
								rel="noopener"
								class="bg-white text-black px-2.5 py-1.5 rounded-lg text-[10px] font-semibold hover:bg-gray-100 transition-all no-underline"
								on:click|stopPropagation
							>
								Acessar
							</a>
						{/if}
					</div>
				</div>
			</div>
		</button>
	</Motion>
</Motion>
