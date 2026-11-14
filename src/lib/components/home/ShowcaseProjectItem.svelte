<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { fadeUpVariant } from '$lib/utils/animations';
	import { getToolIcon } from '$lib/config/toolIcons';
	import { tabs } from '$lib/data/projects';
	import { t } from '$lib/i18n';
	import { stripHtml } from '$lib/utils/string';

	export let app: any;
	export let openProjectModal: (app: any) => void;

	$: rawCategories = app.categories
		? app.categories
		: Array.isArray(app.category)
			? app.category
			: [app.category || 'software'];
	$: categoryTabs = rawCategories
		.map((catId: string) => tabs.find((tab) => tab.id === catId))
		.filter(Boolean);
</script>

<Motion variants={fadeUpVariant} let:motion>
	<div
		use:motion
		class="group relative rounded-xl p-6 md:p-8 text-black transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-4 hover:-translate-y-2 hover:shadow-xl overflow-hidden cursor-pointer h-full"
		style="background: {app.background};"
		on:click={() => openProjectModal(app)}
		on:keydown={(e) => e.key === 'Enter' && openProjectModal(app)}
		role="button"
		tabindex="0"
	>
		{#if app.githubUrl}
			<div class="absolute top-0 right-0 z-30 w-[150px] h-[150px] overflow-hidden pointer-events-none">
				<span
					class="block absolute w-[200px] py-2 bg-green-500 text-white text-center text-xs font-medium rotate-45 top-[30px] -right-[50px] shadow-lg uppercase tracking-wider"
				>
					Open Source
				</span>
			</div>
		{/if}

		<!-- Left Side: Categories, Caption, Title, Tech Icons -->
		<div class="flex-1">
			{#if categoryTabs.length > 0}
				<div class="flex flex-wrap gap-1.5 mb-3">
					{#each categoryTabs as categoryTab}
						<div
							class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm text-xs font-semibold text-black/80"
						>
							<svg class="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
								<path d={categoryTab.icon} />
							</svg>
							<span>{$t(`projects.${categoryTab.id}`)}</span>
						</div>
					{/each}
				</div>
			{/if}

			<p class="text-sm text-black/60 mb-2 m-0 uppercase tracking-wider font-medium">
				{app.caption}
			</p>
			<h5 class="text-xl md:text-2xl font-bold m-0 group-hover:text-black/80 transition-colors">
				{app.name}
			</h5>

			{#if app.technologies}
				<div class="flex flex-wrap gap-1.5 mt-4">
					{#each app.technologies as tech}
						{#if getToolIcon(tech)}
							<div
								class="w-7 h-7 md:w-8 md:h-8 bg-white/70 backdrop-blur-sm rounded-lg flex items-center justify-center p-1.5 shadow-sm border border-white/50"
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
				</div>
			{/if}
		</div>

		<!-- Right Side Image: 2 Rounded Watch Prints for Wear OS or 2 Mobile Prints or Standard App Mockup -->
		{#if app.isWearOS && app.wearosImages && app.wearosImages.length >= 2}
			{@const gameImg = app.image || app.wearosImages[1]}
			{@const controlsImg = app.wearosImages[0]}
			<div class="flex-shrink-0 flex items-center -space-x-4 sm:-space-x-5 py-2">
				<div
					class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 sm:border-3 border-white/90 shadow-xl bg-neutral-900 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-rotate-3"
					title="{app.name} - Controles"
				>
					<img
						src={controlsImg}
						alt="{app.name} controles"
						loading="lazy"
						decoding="async"
						class="w-full h-full object-contain"
					/>
				</div>
				<div
					class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 sm:border-3 border-white/90 shadow-xl bg-neutral-900 transition-transform duration-500 group-hover:translate-x-1 group-hover:rotate-3 z-10"
					title="{app.name} - Gameplay"
				>
					<img
						src={gameImg}
						alt="{app.name} gameplay"
						loading="lazy"
						decoding="async"
						class="w-full h-full object-contain"
					/>
				</div>
			</div>
		{:else if app.phoneImages?.length && app.image}
			<div class="flex-shrink-0 relative w-44 sm:w-52 md:w-56 h-44 sm:h-52 md:h-56 pointer-events-none">
				<img
					src={app.image}
					alt="{app.name} — Desktop"
					loading="lazy"
					decoding="async"
					class="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] h-auto object-contain rounded-lg shadow-lg rotate-[6deg] z-20 transition-transform duration-500 group-hover:rotate-[8deg]"
				/>
				<img
					src={app.phoneImages[0]}
					alt="{app.name} — Mobile"
					loading="lazy"
					decoding="async"
					class="absolute left-0 top-1/2 -translate-y-1/2 h-[92%] w-auto max-w-[44%] object-contain rounded-xl shadow-xl -rotate-[6deg] z-10 transition-transform duration-500 group-hover:-rotate-[8deg]"
				/>
			</div>
		{:else if app.additionalImages && app.additionalImages.length >= 2}
			<div class="flex-shrink-0 relative w-36 sm:w-44 md:w-52 h-44 sm:h-52 md:h-56 flex items-center justify-center pointer-events-none">
				<img
					src={app.additionalImages[1]}
					alt="{app.name} 2"
					loading="lazy"
					decoding="async"
					class="absolute max-h-[88%] max-w-[65%] w-auto h-auto object-contain rounded-[1.1rem] drop-shadow-md transition-transform duration-500 group-hover:scale-105 translate-x-5 sm:translate-x-6 translate-y-1.5 rotate-[8deg] group-hover:translate-y-2 group-hover:rotate-[11deg] z-10"
				/>
				<img
					src={app.additionalImages[0]}
					alt="{app.name} 1"
					loading="lazy"
					decoding="async"
					class="absolute max-h-[92%] max-w-[68%] w-auto h-auto object-contain rounded-[1.1rem] drop-shadow-xl transition-transform duration-500 group-hover:scale-105 -translate-x-4 sm:-translate-x-5 -translate-y-1 rotate-[-6deg] group-hover:-translate-y-1.5 group-hover:rotate-[-8deg] z-20"
				/>
			</div>
		{:else}
			<div class="flex-shrink-0 flex items-center justify-center">
				<img
					src={app.image}
					alt={app.name}
					loading="lazy"
					decoding="async"
					class="w-auto h-auto max-w-[140px] md:max-w-[180px] max-h-44 sm:max-h-52 object-contain rounded-xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2"
				/>
			</div>
		{/if}

		<!-- Hover Overlay -->
		<div
			class="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 gap-2.5 sm:gap-3.5 md:gap-4 transform scale-95 group-hover:scale-100 z-20 backdrop-blur-md overflow-hidden"
		>
			<h5 class="text-white font-bold text-base sm:text-lg md:text-xl text-center leading-snug line-clamp-2 m-0 max-w-full">
				{app.name}
			</h5>
			{#if app.description}
				<p class="text-white/80 text-xs sm:text-sm text-center leading-relaxed line-clamp-3 sm:line-clamp-4 m-0 max-w-full">
					{stripHtml(app.description)}
				</p>
			{/if}
			<div class="flex gap-2 sm:gap-3 flex-wrap justify-center mt-1 pointer-events-auto shrink-0">
				<button
					class="bg-white/15 text-white backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-white/25 transition-all flex items-center gap-1.5 border border-white/20 shadow-lg active:scale-95 cursor-pointer"
					on:click|stopPropagation={() => openProjectModal(app)}
				>
					<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 512 512">
						<path
							d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
						/>
					</svg>
					{$t('home.showcases.learnMore')}
				</button>
				{#if app.apkUrl}
					<a
						href={app.apkUrl}
						download
						class="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all no-underline shadow-lg flex items-center gap-1.5 active:scale-95"
						on:click|stopPropagation
						title="Baixar APK"
					>
						<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
						</svg>
						<span>Baixar APK</span>
						{#if app.apkSize}
							<span class="text-[10px] bg-emerald-800/80 px-1.5 py-0.5 rounded-full font-mono">{app.apkSize}</span>
						{/if}
					</a>
				{/if}
				{#if app.link}
					<a
						href={app.link}
						target="_blank"
						rel="noopener"
						class="bg-white text-black px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-all no-underline shadow-lg flex items-center active:scale-95"
						on:click|stopPropagation
					>
						{$t('home.showcases.access')}
					</a>
				{:else if app.githubUrl}
					<a
						href={app.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-white text-black px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-all no-underline shadow-lg flex items-center gap-1.5 active:scale-95"
						on:click|stopPropagation
					>
						<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
						<span>Código</span>
					</a>
				{/if}
			</div>
		</div>
	</div>
</Motion>
