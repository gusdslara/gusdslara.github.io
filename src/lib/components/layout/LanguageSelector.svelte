<script lang="ts">
	import { locale } from '$lib/i18n';
	import type { Language } from '$lib/i18n/dictionaries';
	import { fade, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	
	export let isMobile = false;

	let isOpen = false;
	const options: { value: Language, label: string, icon: string }[] = [
		{ value: 'en', label: 'English', icon: '🇺🇸' },
		{ value: 'pt', label: 'Português', icon: '🇧🇷' },
		{ value: 'es', label: 'Español', icon: '🇪🇸' }
	];

	$: currentOption = options.find(o => o.value === $locale) || options[0];

	function selectLanguage(lang: Language) {
		locale.set(lang);
		isOpen = false;
	}

	function toggle() {
		isOpen = !isOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.lang-selector-container')) {
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="relative lang-selector-container z-[80] {isMobile ? 'w-full' : ''}">
	<button
		on:click|stopPropagation={toggle}
		class="{isMobile ? 'w-full justify-between px-4 py-3 bg-gray-50 border-gray-100' : 'px-3 py-1.5 bg-white/50 backdrop-blur-md hover:bg-white/70 border-white/20'} flex items-center gap-2 border rounded-xl text-sm font-medium text-black transition-all duration-300"
		aria-label="Select Language"
	>
		<span class="flex items-center gap-2">
			<span class="text-base leading-none">{currentOption.icon}</span>
			{#if isMobile}
				<span>{currentOption.label}</span>
			{:else}
				<span>{currentOption.value.toUpperCase()}</span>
			{/if}
		</span>
		<svg 
			class="w-4 h-4 transition-transform duration-300 {isOpen ? 'rotate-180 text-[#dd206b]' : 'text-gray-400'}" 
			fill="none" viewBox="0 0 24 24" stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if isOpen}
		<div 
			transition:scale={{ duration: 200, start: 0.95, opacity: 0 }}
			class="absolute {isMobile ? 'bottom-full left-0 w-full mb-2 origin-bottom' : 'top-full mt-2 right-0 w-40 origin-top'} bg-white/95 backdrop-blur-xl border border-gray-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-xl overflow-hidden"
		>
			<div class="flex flex-col py-1.5">
				{#each options as option}
					<button
						on:click|stopPropagation={() => selectLanguage(option.value)}
						class="flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors hover:bg-gray-50/80 {$locale === option.value ? 'font-semibold text-[#dd206b]' : 'text-gray-600'}"
					>
						<span class="text-base leading-none">{option.icon}</span>
						<span>{option.label}</span>
						{#if $locale === option.value}
							<svg class="w-4 h-4 ml-auto text-[#dd206b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
