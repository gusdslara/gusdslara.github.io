<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { staggerContainer, fadeUpVariant } from '$lib/utils/animations';
	import { t } from '$lib/i18n';
</script>

<div id="home" class="min-h-[70vh] flex items-center px-4 md:px-8 lg:px-12">
	<div class="max-w-7xl mx-auto w-full">
		<div class="h-16 md:h-32"></div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
			
			<Motion initial="hidden" animate="visible" variants={staggerContainer} let:motion>
				<div use:motion>
					<Motion variants={fadeUpVariant} let:motion>
						<h4 use:motion class="text-xl md:text-2xl font-normal text-black mb-4 md:mb-6">
							{$t('home.top.greeting')}
						</h4>
					</Motion>

					<Motion variants={fadeUpVariant} let:motion>
						<h2
							use:motion
							class="text-4xl md:text-6xl lg:text-7xl font-extralight font-display leading-tight text-black mb-1"
							style="font-family: 'Outfit', sans-serif;"
						>
							{$t('home.top.title1')}
						</h2>
					</Motion>
					<Motion variants={fadeUpVariant} let:motion>
						<h2
							use:motion
							class="text-4xl md:text-6xl lg:text-7xl font-extralight font-display leading-tight text-black mb-1"
							style="font-family: 'Outfit', sans-serif;"
						>
							{$t('home.top.title2')}
						</h2>
					</Motion>
					<Motion variants={fadeUpVariant} let:motion>
						<h2
							use:motion
							class="text-4xl md:text-6xl lg:text-7xl font-extralight font-display leading-tight text-black mb-6 md:mb-8"
							style="font-family: 'Outfit', sans-serif;"
						>
							{$t('home.top.title3')}
						</h2>
					</Motion>

					<Motion variants={fadeUpVariant} let:motion>
						<p use:motion class="text-base md:text-lg leading-relaxed text-black/70 max-w-2xl">
							{$t('home.top.desc1')}
						</p>
					</Motion>
					<Motion variants={fadeUpVariant} let:motion>
						<p use:motion class="text-base md:text-lg leading-relaxed text-black/70 max-w-2xl mt-2">
							{$t('home.top.desc2')}
						</p>
					</Motion>
				</div>
			</Motion>

			
			<Motion
				initial={{ opacity: 0, scale: 0.9, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
				let:motion
			>
				<div use:motion class="flex items-center justify-center lg:justify-end">
					<Motion
						animate={{ y: [0, -8, 0] }}
						transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
						let:motion
					>
						<div use:motion class="relative w-full max-w-md lg:max-w-lg">
							<div
								class="absolute inset-0 bg-gradient-to-br from-[#dd206b]/20 to-[#667eea]/20 rounded-full blur-3xl transform scale-110"
							></div>
							<Motion
								whileHover={{ scale: 1.05, rotate: 2 }}
								whileTap={{ scale: 0.95 }}
								transition={{ type: 'spring', stiffness: 300 }}
								let:motion
							>
								<img
									use:motion
									src="/assets/img/avatar/perfil-transparente.png"
									alt="Gustavo Lara"
									class="relative w-full h-auto rounded-full shadow-2xl cursor-pointer"
								/>
							</Motion>
						</div>
					</Motion>
				</div>
			</Motion>
		</div>

		<div class="h-16 md:h-32"></div>
	</div>
</div>
