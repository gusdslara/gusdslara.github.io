<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { t, locale } from '$lib/i18n';
	import type { Language } from '$lib/i18n/dictionaries';

	export let scrollY = 0;
	export let scrollContainer: HTMLElement | null = null;

	let mobileMenuOpen = false;
	let activeSection = 'home';

	$: isScrolled = scrollY > 100;

	import LanguageSelector from './LanguageSelector.svelte';
	import { tick } from 'svelte';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	$: if ($locale) {
		tick().then(() => {
			if (typeof window !== 'undefined') {
				ScrollTrigger.refresh();
			}
		});
	}

	$: navItems = [
		{ id: 'home', label: $t('nav.home') },
		{ id: 'about', label: $t('nav.about') },
		{ id: 'experience', label: $t('nav.experience') },
		{ id: 'education', label: $t('nav.education') },
		{ id: 'showcases', label: $t('nav.showcases') },
		{ id: 'platforms', label: $t('nav.platforms') },
		{ id: 'contact', label: $t('nav.contact') }
	];

	function getNavbarHeight(): number {
		const navEl = document.querySelector('nav');
		return navEl ? navEl.getBoundingClientRect().height : 72;
	}

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (!element) return;

		const wasMobileMenuOpen = mobileMenuOpen;

		mobileMenuOpen = false;

		const performScroll = () => {
			const navbarHeight = getNavbarHeight();
			if (scrollContainer) {
				const elementTop = element.getBoundingClientRect().top;
				const containerTop = scrollContainer.getBoundingClientRect().top;
				const currentScrollTop = scrollContainer.scrollTop;

				const offsetPosition = currentScrollTop + (elementTop - containerTop) - navbarHeight;

				scrollContainer.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			} else {
				const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
				const offsetPosition = elementPosition - navbarHeight;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		};

		if (wasMobileMenuOpen) {
			setTimeout(() => {
				requestAnimationFrame(performScroll);
			}, 350);
		} else {
			requestAnimationFrame(performScroll);
		}
	}

	function updateActiveSection() {
		if (!navItems) return;
		const sections = navItems.map((item) => item.id);
		const scrollPosition = scrollY + 150;

		if (scrollContainer) {
			const atBottom =
				scrollContainer.scrollTop + scrollContainer.clientHeight >=
				scrollContainer.scrollHeight - 10;
			if (atBottom && scrollY > 100) {
				activeSection = sections[sections.length - 1];
				return;
			}
		} else if (typeof window !== 'undefined') {
			const atBottom =
				window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10;
			if (atBottom && scrollY > 100) {
				activeSection = sections[sections.length - 1];
				return;
			}
		}

		for (let i = sections.length - 1; i >= 0; i--) {
			const element = document.getElementById(sections[i]);
			if (element) {
				let elementTop = 0;

				if (scrollContainer) {
					const rect = element.getBoundingClientRect();
					const containerRect = scrollContainer.getBoundingClientRect();
					elementTop = rect.top - containerRect.top + scrollContainer.scrollTop;
				} else {
					const rect = element.getBoundingClientRect();
					elementTop = rect.top + window.scrollY;
				}

				if (elementTop <= scrollPosition) {
					activeSection = sections[i];
					break;
				}
			}
		}
	}

	$: if (scrollY >= 0) {
		updateActiveSection();
	}

	function handleScroll() {
		scrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
	}

	$: if (scrollContainer) {
		scrollContainer.addEventListener('scroll', handleScroll);
		scrollY = scrollContainer.scrollTop;
		updateActiveSection();
	} else if (typeof window !== 'undefined') {
		window.addEventListener('scroll', handleScroll);
		scrollY = window.scrollY;
		updateActiveSection();
	}

	onDestroy(() => {
		if (scrollContainer) {
			scrollContainer.removeEventListener('scroll', handleScroll);
		}
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', handleScroll);
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && mobileMenuOpen) {
			mobileMenuOpen = false;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<nav
	class="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm transition-all duration-300 px-4 md:px-8 py-3 md:py-4"
	class:shadow-md={isScrolled}
>
	<div class="max-w-7xl mx-auto flex items-center justify-between">
		<a
			href="/"
			class="flex items-center no-underline transition-transform duration-200 hover:scale-105"
		>
			<img src="/assets/img/logos/gustavolara.png" alt="NP Logo" class="h-8 md:h-10 w-auto" />
		</a>

		<div class="hidden lg:flex items-center gap-2">
			{#each navItems as item}
				<button
					on:click={() => scrollToSection(item.id)}
					class="px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 relative group {activeSection ===
					item.id
						? 'text-[#dd206b]'
						: 'text-black/70'}"
				>
					{item.label}
					<span
						class="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-[#dd206b] transition-all duration-300 {activeSection ===
						item.id
							? 'w-8'
							: 'w-0'}"
					></span>
					<span
						class="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-[#dd206b]/30 transition-all duration-300 group-hover:w-8 {activeSection ===
						item.id
							? 'hidden'
							: ''}"
					></span>
				</button>
			{/each}
			
			<div class="relative ml-2 lg:ml-4 flex items-center">
				<LanguageSelector />
			</div>
		</div>

		<button
			on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
			class="lg:hidden flex flex-col items-center justify-center w-10 h-10 space-y-1.5 focus:outline-none z-[70] relative"
			aria-label="Toggle menu"
			aria-expanded={mobileMenuOpen}
		>
			<span
				class="w-6 h-0.5 transition-all duration-300 {mobileMenuOpen
					? 'rotate-45 translate-y-2 bg-white'
					: 'bg-black'}"
			></span>
			<span
				class="w-6 h-0.5 transition-all duration-300 {mobileMenuOpen
					? 'opacity-0 bg-white'
					: 'bg-black'}"
			></span>
			<span
				class="w-6 h-0.5 transition-all duration-300 {mobileMenuOpen
					? '-rotate-45 -translate-y-2 bg-white'
					: 'bg-black'}"
			></span>
		</button>
	</div>
</nav>

<div
	role="button"
	tabindex="0"
	class="drawer-backdrop lg:hidden fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
	class:opacity-100={mobileMenuOpen}
	class:pointer-events-auto={mobileMenuOpen}
	class:opacity-0={!mobileMenuOpen}
	class:pointer-events-none={!mobileMenuOpen}
	on:click={() => (mobileMenuOpen = false)}
	on:keydown={(e) => {
		if (e.key === 'Enter') mobileMenuOpen = false;
	}}
></div>

<div
	class="drawer lg:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white z-[60] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out"
	class:translate-x-0={mobileMenuOpen}
	class:translate-x-full={!mobileMenuOpen}
	aria-hidden={!mobileMenuOpen}
>
	<div class="flex items-center justify-end px-4 py-3 border-b border-gray-100 bg-[#dd206b]">
		<button
			on:click={() => (mobileMenuOpen = false)}
			class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-200"
			aria-label="Fechar menu"
		>
			<svg
				class="w-5 h-5 text-white"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>

	<nav class="flex flex-col flex-1 px-4 py-6 gap-1 overflow-y-auto">
		{#each navItems as item, i}
			<button
				on:click={() => scrollToSection(item.id)}
				class="drawer-item text-left px-5 py-3.5 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-3 group {activeSection ===
				item.id
					? 'bg-[#dd206b] text-white shadow-md shadow-[#dd206b]/30'
					: 'text-gray-700 hover:bg-gray-50 hover:text-[#dd206b]'}"
				style="animation-delay: {i * 40}ms"
			>
				<span
					class="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200 {activeSection ===
					item.id
						? 'bg-white'
						: 'bg-[#dd206b]/40 group-hover:bg-[#dd206b]'}"
				></span>
				{item.label}
			</button>
		{/each}
	</nav>

	<div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
		<p class="text-xs text-gray-400">© 2025 Gustavo Lara</p>
		<div class="relative min-w-[120px]">
			<LanguageSelector isMobile={true} />
		</div>
	</div>
</div>

<style>
	.drawer {
		will-change: transform;
	}

	.drawer-item {
		animation: none;
	}

	.translate-x-0 .drawer-item {
		animation: slideInItem 0.3s ease-out both;
	}

	@keyframes slideInItem {
		from {
			opacity: 0;
			transform: translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
