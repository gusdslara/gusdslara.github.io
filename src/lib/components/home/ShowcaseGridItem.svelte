<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { fadeUpVariant } from '$lib/utils/animations';
	import { getToolIcon } from '$lib/config/toolIcons';
	import { tabs } from '$lib/data/projects';
	import { t } from '$lib/i18n';
	import { stripHtml } from '$lib/utils/string';

	export let logo: any;
	export let openProjectModal: (project: any) => void;

	$: rawCategories = logo.categories
		? logo.categories
		: Array.isArray(logo.category)
			? logo.category
			: [logo.category || 'software'];
	$: categoryTabs = rawCategories
		.map((catId: string) => tabs.find((tab) => tab.id === catId))
		.filter(Boolean);
</script>

<Motion variants={fadeUpVariant} initial="hidden" animate="visible" exit="hidden" let:motion>
	<Motion
		whileHover={{ scale: 1.05 }}
		transition={{ type: 'spring', stiffness: 400, damping: 10 }}
		let:motion={hoverMotion}
	>
		<button
			use:motion
			class="group relative p-3 md:p-3.5 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden h-48 sm:h-52 w-full"
			style="background: {logo.color};"
			on:click={() => openProjectModal(logo)}
			tabindex="0"
		>
			<div
				use:hoverMotion
				class="absolute inset-0 w-full h-full flex flex-col items-center justify-between p-3 sm:p-3.5"
			>
				{#if categoryTabs.length > 0}
					<div class="absolute top-2.5 left-2.5 z-20 flex flex-wrap gap-1 max-w-[70%]">
						{#each categoryTabs as categoryTab}
							<div
								class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm text-[10px] font-semibold text-black/80"
							>
								<svg class="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
									<path d={categoryTab.icon} />
								</svg>
								<span>{$t(`projects.${categoryTab.id}`)}</span>
							</div>
						{/each}
					</div>
				{/if}

				{#if logo.githubUrl}
					<div class="absolute top-0 right-0 z-40 w-[90px] h-[90px] overflow-hidden pointer-events-none">
						<span
							class="block absolute w-[130px] py-1 bg-green-500 text-white text-center text-[9px] font-semibold rotate-45 top-[18px] -right-[36px] shadow-md uppercase tracking-wider"
						>
							Open Source
						</span>
					</div>
				{/if}

				<!-- Center Preview Area (reserved height so it never overlaps badges or texts) -->
				<div class="flex-1 w-full flex items-center justify-center pt-5 pb-0.5 relative z-10 min-h-0">
					{#if logo.additionalImages && logo.additionalImages.length >= 2}
						<div class="relative w-full h-24 sm:h-28 flex items-center justify-center pointer-events-none">
							<img
								src={logo.additionalImages[1]}
								alt="{logo.name} 2"
								loading="lazy"
								decoding="async"
								class="absolute max-h-[92%] max-w-[54%] w-auto h-auto object-contain rounded-xl drop-shadow-md transition-transform duration-500 group-hover:scale-105 translate-x-3.5 sm:translate-x-4 translate-y-0.5 rotate-[8deg] group-hover:translate-y-1 group-hover:rotate-[11deg] z-10"
							/>
							<img
								src={logo.additionalImages[0]}
								alt="{logo.name} 1"
								loading="lazy"
								decoding="async"
								class="absolute max-h-[96%] max-w-[56%] w-auto h-auto object-contain rounded-xl drop-shadow-xl transition-transform duration-500 group-hover:scale-105 -translate-x-3.5 sm:-translate-x-4 -translate-y-0.5 rotate-[-6deg] group-hover:-translate-y-1 group-hover:rotate-[-8deg] z-20"
							/>
						</div>
					{:else if logo.isWearOS}
						<div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/80 shadow-md bg-neutral-900 transition-transform duration-300 group-hover:scale-105">
							<img
								src={logo.image}
								alt={logo.name}
								loading="lazy"
								decoding="async"
								class="w-full h-full object-contain"
							/>
						</div>
					{:else}
						<img
							src={logo.image}
							alt={logo.name}
							loading="lazy"
							decoding="async"
							class="w-auto h-auto max-w-[75%] max-h-16 sm:max-h-20 object-contain transition-transform duration-300 group-hover:scale-95 drop-shadow-sm"
						/>
					{/if}
				</div>

				<!-- Bottom Name & Tech Badges Area (always visible, never cut off) -->
				<div class="w-full flex flex-col items-center justify-center shrink-0 z-10 pt-0.5">
					<span class="text-black font-semibold text-xs text-center px-1 leading-snug line-clamp-1 w-full" title={logo.name}>
						{logo.name}
					</span>

					{#if logo.technologies}
						<div class="flex flex-wrap gap-1.5 justify-center mt-1.5 z-10">
							{#each logo.technologies.slice(0, 4) as tech}
								{#if getToolIcon(tech)}
									<div
										class="w-6 h-6 bg-white/70 backdrop-blur-sm rounded-lg flex flex-shrink-0 items-center justify-center p-1 shadow-sm border border-white/50"
										title={tech}
									>
										<img
											src={getToolIcon(tech)}
											alt={tech}
											loading="lazy"
											decoding="async"
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
					class="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-2.5 sm:p-3 gap-1.5 sm:gap-2 transform scale-95 group-hover:scale-100 z-30 backdrop-blur-md overflow-hidden"
				>
					<h5 class="text-white font-bold text-xs sm:text-sm text-center line-clamp-1 leading-snug m-0 max-w-full">
						{logo.name}
					</h5>
					{#if logo.description}
						<p class="text-white/80 text-[10px] sm:text-xs text-center line-clamp-2 sm:line-clamp-3 leading-tight m-0 max-w-full">
							{stripHtml(logo.description)}
						</p>
					{/if}
					<div class="flex flex-wrap gap-1.5 justify-center mt-0.5 pointer-events-auto shrink-0">
						<button
							class="bg-white/15 text-white backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold hover:bg-white/25 transition-all border border-white/20 flex items-center gap-1 active:scale-95"
							on:click|stopPropagation={() => openProjectModal(logo)}
						>
							<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 512 512">
								<path
									d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
								/>
							</svg>
							{$t('home.showcases.learnMore')}
						</button>
						{#if logo.link}
							<a
								href={logo.link}
								target="_blank"
								rel="noopener"
								class="bg-white text-black px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold hover:bg-gray-100 transition-all no-underline shadow-sm flex items-center active:scale-95"
								on:click|stopPropagation
							>
								{$t('home.showcases.access')}
							</a>
						{/if}
					</div>
				</div>
			</div>
		</button>
	</Motion>
</Motion>
