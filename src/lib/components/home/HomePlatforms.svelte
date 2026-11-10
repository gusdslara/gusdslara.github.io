<script lang="ts">
	import { Motion } from 'svelte-motion';
	import AnimatedSection from '$lib/components/utils/AnimatedSection.svelte';
	import { staggerContainer } from '$lib/utils/animations';
	import ShowcasePlatformItem from './ShowcasePlatformItem.svelte';
	import { t } from '$lib/i18n';
</script>

<AnimatedSection
	customVariant={staggerContainer}
	delay={0.1}
	className="home-platforms relative z-20 pt-6 pb-8 md:pt-8 md:pb-16 px-4 md:px-8 lg:px-12 bg-white"
>
	<div class="max-w-7xl mx-auto">
		<ShowcasePlatformItem
			href="https://games.unrender.pro"
			title="Unrender Games"
			description={$t('home.platforms.unrenderDesc')}
			buttonText={$t('home.platforms.unrenderBtn')}
			imgSrc="/assets/img/illustrations/unrender.png"
			imgAlt="Unrender Games Illustration"
			gradientClass="bg-gradient-to-br from-purple-50 to-pink-50"
			isOpenSource={false}
			technologies={['Unity', 'ThreeJS', 'Blender', 'PixiJS']}
		/>
	</div>
</AnimatedSection>
