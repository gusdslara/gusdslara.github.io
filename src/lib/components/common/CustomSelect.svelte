<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let label: string = '';
	export let options: { value: any; label: string }[] = [];
	export let value: any;
	export let onChange: (value: any) => void;

	let isOpen = false;
	let container: HTMLDivElement;

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectOption(optionValue: any) {
		value = optionValue;
		onChange(value);
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (container && !container.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	onMount(() => {
		window.addEventListener('click', handleClickOutside);
		return () => window.removeEventListener('click', handleClickOutside);
	});

	$: selectedLabel = options.find((o) => o.value === value)?.label || 'Selecione...';
</script>

<div class="flex flex-col gap-1 flex-1 min-w-[140px]" bind:this={container}>
	{#if label}
		<span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold px-1">{label}</span>
	{/if}

	<div class="relative group">
		<button
			type="button"
			class="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium flex items-center justify-between transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/5"
			on:click={toggleDropdown}
		>
			<span class="truncate">{selectedLabel}</span>
			<svg
				class="w-4 h-4 text-gray-400 transition-transform duration-300 {isOpen ? 'rotate-180' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if isOpen}
			<div
				class="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-xl shadow-xl z-[100] overflow-hidden"
				transition:slide={{ duration: 200 }}
			>
				<div class="max-h-60 overflow-y-auto no-scrollbar py-1">
					{#each options as option}
						<button
							type="button"
							class="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-black hover:text-white {value ===
							option.value
								? 'bg-black/5 font-semibold'
								: 'text-gray-700'}"
							on:click={() => selectOption(option.value)}
						>
							{option.label}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
