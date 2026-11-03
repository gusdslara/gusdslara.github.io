<script lang="ts">
	import { Motion } from 'svelte-motion';
	import AnimatedSection from '$lib/components/utils/AnimatedSection.svelte';
	import { staggerContainer, fadeUpVariant } from '$lib/utils/animations';
	import ScrollText from '$lib/components/utils/ScrollText.svelte';
	import { t } from '$lib/i18n';

	const contacts = [
		{
			name: 'WhatsApp',
			icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z',
			href: 'https://wa.me/5565999207154', 
			color: 'bg-green-500 hover:bg-green-600'
		},
		{
			name: 'Telefone',
			icon: 'M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z',
			href: 'tel:+5565999207154', 
			color: 'bg-blue-500 hover:bg-blue-600'
		},
		{
			name: 'GitHub',
			icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
			href: 'https://github.com/gusdslara',
			color: 'bg-gray-900 hover:bg-gray-800'
		},
		{
			name: 'LinkedIn',
			icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
			href: 'https://linkedin.com/in/gustavodslara', 
			color: 'bg-[#0077b5] hover:bg-[#006399]'
		}
	];
</script>

<div id="contact" class="home-contact py-8 md:py-16 px-4 md:px-8 lg:px-12">
	<AnimatedSection customVariant={staggerContainer} className="max-w-4xl mx-auto">
		<h2
			class="w-full text-3xl md:text-5xl font-extralight font-display mb-6"
			style="font-family: 'Outfit', sans-serif;"
		>
			<ScrollText text={$t('home.contact.title')} />
		</h2>

		
		<Motion variants={fadeUpVariant} let:motion>
			<div use:motion class="mb-8 md:mb-12"></div>
		</Motion>

		
		<Motion variants={fadeUpVariant} let:motion>
			<div use:motion class="bg-white rounded-xl p-6 md:p-10 shadow-lg">
				<h4 class="text-xl md:text-2xl font-medium text-center mb-8">{$t('home.contact.subtitle')}</h4>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
					{#each contacts as contact}
						<Motion
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ type: 'spring', stiffness: 400, damping: 10 }}
							let:motion={btnMotion}
						>
							<a
								use:btnMotion
								href={contact.href}
								target={contact.name === 'LinkedIn' ||
								contact.name === 'WhatsApp' ||
								contact.name === 'GitHub'
									? '_blank'
									: undefined}
								rel={contact.name === 'LinkedIn' ||
								contact.name === 'WhatsApp' ||
								contact.name === 'GitHub'
									? 'noopener noreferrer'
									: undefined}
								class="flex items-center justify-center gap-3 {contact.color} text-white font-medium px-6 py-4 rounded-lg shadow-md hover:shadow-xl group no-underline"
							>
								<svg
									class="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110"
									viewBox="0 0 24 24"
								>
									<path d={contact.icon} />
								</svg>
								<span class="text-lg">{contact.name}</span>
							</a>
						</Motion>
					{/each}
				</div>
			</div>
		</Motion>

		<div class="h-8"></div>

		
		<Motion variants={fadeUpVariant} let:motion>
			<div use:motion class="text-center">
				<p class="text-sm md:text-base text-black/60 mb-2">{$t('home.contact.emailLabel')}</p>
				<Motion
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					transition={{ type: 'spring', stiffness: 400, damping: 10 }}
					let:motion={linkMotion}
				>
					<a
						use:linkMotion
						href="mailto:gustavodslara@gmail.com"
						class="inline-block text-xl md:text-2xl font-medium text-[#dd206b] no-underline hover:underline cursor-pointer"
					>
						gustavodslara@gmail.com
					</a>
				</Motion>
			</div>
		</Motion>
	</AnimatedSection>
</div>
