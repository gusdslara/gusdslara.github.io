<script lang="ts">
	import { t } from '$lib/i18n';
	const year = new Date().getFullYear();

	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com/gusdslara',
			icon: 'github'
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/gustavodslara/',
			icon: 'linkedin'
		}
	];
</script>

<footer class="w-full border-t border-black/5 bg-black/[0.015] py-8 md:py-10 px-4 md:px-8 lg:px-12 mt-12 md:mt-16">
	<div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
		<div class="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
			<p class="text-xs md:text-sm text-black/60 m-0 leading-relaxed">
				{@html $t('common.footer.staticSite')}
				<a
					href="https://kit.svelte.dev"
					target="_blank"
					rel="noopener"
					class="font-medium text-black underline hover:text-[#dd206b] transition-colors">SvelteKit</a
				>
				+
				<a
					href="https://www.typescriptlang.org"
					target="_blank"
					rel="noopener"
					class="font-medium text-black underline hover:text-[#dd206b] transition-colors">TS</a
				>
				+
				<a
					href="https://tailwindcss.com"
					target="_blank"
					rel="noopener"
					class="font-medium text-black underline hover:text-[#dd206b] transition-colors">Tailwind</a
				>
				{$t('common.footer.and')}
				<a
					href="https://svelte-motion.gradientdescent.de/"
					target="_blank"
					rel="noopener"
					class="font-medium text-black underline hover:text-[#dd206b] transition-colors">Motion</a
				>
			</p>
			<p class="text-xs text-black/40 m-0">
				{$t('common.footer.copyright', { year: year.toString() })}
			</p>
		</div>

		<div class="flex items-center gap-3">
			{#each socialLinks as social}
				<a
					href={social.url}
					target="_blank"
					rel="noopener"
					aria-label={social.name}
					class="flex items-center justify-center w-11 h-11 rounded-full bg-black/5 hover:bg-black/10 transition-all duration-300 hover:-translate-y-0.5 no-underline"
				>
					<img
						src="/assets/svg/icons/social/{social.icon}.svg"
						alt={social.name}
						class="w-4 h-4 opacity-70 transition-opacity duration-300 hover:opacity-100"
					/>
				</a>
			{/each}
		</div>
	</div>
</footer>
