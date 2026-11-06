<script lang="ts">
	import { t } from '$lib/i18n';
	export let name: string;
	export let description: string;
	export let stackImages: string[] = [];
	export let stackImageNames: string[] = [];
	export let backgroundColor: string = '#ffffff';
	export let phoneImages: string[] = [];
	export let onClick: () => void = () => {};
	export let onImageClick: (imageSrc: string) => void = () => {};
	export let titleColor: string = '#ffffff';
	export let type: 'mobile' | 'desktop' | 'desktop-left' = 'mobile';
	export let link: string = '';

	$: displayPhoneImages = [
		phoneImages[0] || '/assets/img/placeholder-phone.png',
		phoneImages[1] || phoneImages[0] || '/assets/img/placeholder-phone.png'
	];

	function handleImageClick(e: MouseEvent, src: string) {
		e.stopPropagation();
		onImageClick(src);
	}

	import { Motion } from 'svelte-motion';
</script>

<Motion
	whileHover={{ scale: 1.02 }}
	whileTap={{ scale: 0.98 }}
	transition={{ type: 'spring', stiffness: 300, damping: 20 }}
	let:motion={cardMotion}
>
	<div
		use:cardMotion
		class="group relative w-full rounded-2xl sm:rounded-3xl overflow-hidden text-left border-none cursor-pointer p-0 shadow-lg aspect-[4/3] min-h-[290px] sm:min-h-[310px] md:min-h-[330px]"
		style="background-color: {backgroundColor};"
		on:click={onClick}
		role="button"
		tabindex="0"
		on:keydown={(e) => e.key === 'Enter' && onClick()}
	>
		<div
			class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0"
		>
			<button
				class="absolute transform transition-all duration-500 hover:scale-105 brightness-90 hover:brightness-100 pointer-events-auto cursor-zoom-in border-none bg-transparent p-0
			{type === 'desktop-left' ? 'z-20' : ''}
			{type === 'mobile'
					? 'translate-x-8 sm:translate-x-12 translate-y-0 rotate-[12deg] hover:translate-y-2 hover:rotate-[15deg] w-[32%] sm:w-[28%] md:w-[25%] max-h-[65%]'
					: type === 'desktop-left'
						? 'translate-x-8 sm:translate-x-12 translate-y-4 sm:translate-y-6 rotate-[12deg] hover:translate-y-4 hover:rotate-[15deg] w-[32%] sm:w-[28%] md:w-[25%] max-h-[60%]'
						: 'translate-x-6 sm:translate-x-8 translate-y-3 sm:translate-y-4 rotate-[6deg] hover:translate-y-6 hover:rotate-[8deg] w-[62%] sm:w-[58%] md:w-[55%] max-h-[78%]'}"
				on:click={(e) => handleImageClick(e, displayPhoneImages[1])}
				aria-label="{name} Screen 2"
			>
				<img
					src={displayPhoneImages[1]}
					alt="{name} Screen 2"
					loading="lazy"
					decoding="async"
					class="w-full h-full object-contain drop-shadow-2xl {type === 'mobile' ||
					type === 'desktop-left'
						? 'rounded-[1.2rem] sm:rounded-[1.5rem] md:rounded-[2rem]'
						: 'rounded-lg sm:rounded-xl'}"
				/>
			</button>

			<button
				class="absolute transform transition-all duration-500 hover:scale-110 pointer-events-auto cursor-zoom-in border-none bg-transparent p-0
			{type === 'desktop-left' ? 'z-10' : 'z-10'}
			{type === 'mobile'
					? '-translate-x-6 sm:-translate-x-8 translate-y-0 rotate-[-12deg] hover:-translate-y-2 hover:rotate-[-15deg] w-[36%] sm:w-[32%] md:w-[30%] max-h-[65%]'
					: type === 'desktop-left'
						? '-translate-x-3 sm:-translate-x-4 -translate-y-2 rotate-[-6deg] hover:-translate-y-4 hover:rotate-[-8deg] w-[66%] sm:w-[62%] md:w-[60%] max-h-[78%]'
						: '-translate-x-8 sm:-translate-x-12 translate-y-4 sm:translate-y-6 rotate-[-12deg] hover:-translate-y-4 hover:rotate-[-15deg] w-[30%] sm:w-[28%] md:w-[25%] max-h-[58%]'}"
				on:click={(e) => handleImageClick(e, displayPhoneImages[0])}
				aria-label="{name} Screen 1"
			>
				<img
					src={displayPhoneImages[0]}
					alt="{name} Screen 1"
					loading="lazy"
					decoding="async"
					class="w-full h-full object-contain drop-shadow-2xl {type === 'mobile' ||
					type === 'desktop'
						? 'rounded-[1.2rem] sm:rounded-[1.5rem] md:rounded-[2rem]'
						: 'rounded-lg sm:rounded-xl'}"
				/>
			</button>
		</div>

		<div
			class="absolute inset-0 flex flex-col justify-between p-3.5 sm:p-5 md:p-6 z-30 pointer-events-none"
		>
			<div class="relative z-20 w-full flex items-start justify-between gap-3 pointer-events-auto">
				<h3
					class="text-sm sm:text-base md:text-lg font-semibold mb-0 drop-shadow-md leading-snug line-clamp-2 max-w-[85%]"
					style="color: {titleColor};"
				>
					{name}
				</h3>
			</div>

			<div class="relative z-20 w-full flex items-end justify-between gap-3 mt-auto">
				<div class="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 pointer-events-none">
					{#each stackImages.slice(0, 4) as logo, i}
						<Motion
							whileHover={{ scale: 1.25, rotate: 10 }}
							transition={{ type: 'spring', stiffness: 400, damping: 10 }}
							let:motion={logoMotion}
						>
							<div
								use:logoMotion
								class="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center p-1.5 shadow-sm pointer-events-auto border border-white/20"
							>
								<img
									src={logo}
									alt={stackImageNames[i] || 'Tech'}
									title={stackImageNames[i] || 'Tech'}
									loading="lazy"
									decoding="async"
									class="w-full h-full object-contain"
								/>
							</div>
						</Motion>
					{/each}
					{#if stackImages.length > 4}
						<div
							class="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center p-1 shadow-sm text-[10px] sm:text-xs font-bold text-gray-800 pointer-events-auto border border-white/20"
							title={stackImageNames.slice(4).join(', ')}
							aria-label={stackImageNames.slice(4).join(', ')}
						>
							+{stackImages.length - 4}
						</div>
					{/if}
				</div>
			</div>
		</div>

		<div
			class="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 sm:p-6 md:p-7 gap-2.5 sm:gap-3.5 transform scale-95 group-hover:scale-100 z-40 backdrop-blur-md overflow-hidden"
		>
			<h5 class="text-white font-bold text-sm sm:text-base md:text-lg text-center leading-snug line-clamp-2 m-0 max-w-full">
				{name}
			</h5>
			{#if description}
				<p class="text-white/80 text-xs sm:text-sm text-center leading-relaxed line-clamp-3 sm:line-clamp-4 m-0 max-w-full">
					{description}
				</p>
			{/if}
			<div class="flex gap-2 sm:gap-3 flex-wrap justify-center mt-1 pointer-events-auto shrink-0">
				<button
					class="bg-white/15 text-white backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-white/25 transition-all flex items-center gap-1.5 border border-white/20 shadow-lg active:scale-95"
					on:click|stopPropagation={onClick}
				>
					<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 512 512">
						<path
							d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
						/>
					</svg>
					{$t('home.showcases.learnMore')}
				</button>
				{#if link}
					<a
						href={link}
						target="_blank"
						rel="noopener"
						class="bg-white text-black px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-all no-underline shadow-lg flex items-center active:scale-95"
						on:click|stopPropagation
					>
						{$t('home.showcases.access')}
					</a>
				{/if}
			</div>
		</div>
	</div>
</Motion>
