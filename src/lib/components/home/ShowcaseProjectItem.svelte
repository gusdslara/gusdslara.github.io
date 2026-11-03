<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { fadeUpVariant } from '$lib/utils/animations';
	import { getToolIcon } from '$lib/config/toolIcons';
	import { tabs } from '$lib/data/projects';
	import { t } from '$lib/i18n';

	export let app: any;
	export let openProjectModal: (app: any) => void;

	$: categoryTab = tabs.find((tab) => tab.id === (app.category || 'software'));
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
			<div class="absolute top-0 right-0 z-10 w-[150px] h-[150px] overflow-hidden">
				<span
					class="block absolute w-[200px] py-2 bg-green-500 text-white text-center text-xs font-medium rotate-45 top-[30px] -right-[50px] shadow-lg"
				>
					Open Source
				</span>
			</div>
		{/if}

		<div class="flex-1">
			{#if categoryTab}
				<div
					class="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 rounded-lg bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm text-xs font-semibold text-black/80"
				>
					<svg class="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
						<path d={categoryTab.icon} />
					</svg>
					<span>{$t(`projects.${categoryTab.id}`)}</span>
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
									class="w-full h-full object-contain opacity-90"
								/>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
		<div class="flex-shrink-0">
			<img
				src={app.image}
				alt={app.name}
				class="max-w-[140px] md:max-w-[180px] h-auto rounded-xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2"
			/>
		</div>

		<div
			class="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 md:p-8 gap-5 transform scale-95 group-hover:scale-100 z-20 backdrop-blur-sm"
		>
			<h5 class="text-white font-bold text-xl md:text-2xl text-center">{app.name}</h5>
			<p class="text-white/80 text-[clamp(0.7rem,1.8vw,1rem)] text-center">
				{app.description}
			</p>
			<div class="flex gap-3 flex-wrap justify-center mt-2">
				<button
					class="bg-white/10 text-white backdrop-blur-md px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all flex items-center gap-2 border border-white/20 shadow-xl"
					on:click|stopPropagation={() => openProjectModal(app)}
				>
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
						<path
							d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
						/>
					</svg>
					{$t('home.showcases.learnMore')}
				</button>
				{#if app.link}
					<a
						href={app.link}
						target="_blank"
						rel="noopener"
						class="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-all no-underline shadow-xl"
						on:click|stopPropagation
					>
						{$t('home.showcases.access')}
					</a>
				{/if}
			</div>
		</div>
	</div>
</Motion>
