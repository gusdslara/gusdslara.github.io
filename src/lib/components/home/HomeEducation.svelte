<script lang="ts">
	import { onMount } from 'svelte';
	import { Motion } from 'svelte-motion';
	import AnimatedSection from '$lib/components/utils/AnimatedSection.svelte';
	import { staggerContainer, fadeUpVariant, hoverSpring, tapSpring } from '$lib/utils/animations';
	import ScrollText from '$lib/components/utils/ScrollText.svelte';
	import { t } from '$lib/i18n';

	let openEducation: Set<number> = new Set([1, 2, 3]);
	let isMobile = false;

	onMount(() => {
		isMobile = window.innerWidth < 768;
		if (isMobile) {
			openEducation = new Set([1]);
		}
	});

	interface EducationItem {
		id: number;
		institution: string;
		logo: string;
		degree: string;
		field: string;
		startDate: string;
		endDate: string;
		color: string;
		description: string | string[];
		status?: 'completed' | 'in-progress';
	}

	$: educationItems = [
		{
			id: 1,
			institution: 'Instituto Federal de Mato Grosso',
			logo: '/assets/img/logos/ifmt_logo.png',
			degree: $t('education.1.degree'),
			field: $t('education.1.field'),
			startDate: '2018',
			endDate: '2021',
			color: '#027DFD',
			description: $t('education.1.description'),
			status: 'completed'
		}
	] as EducationItem[];

	function toggleEducation(id: number) {
		if (openEducation.has(id)) {
			openEducation.delete(id);
		} else {
			openEducation.add(id);
		}
		openEducation = openEducation;
	}
</script>

<div id="education" class="home-education pt-4 md:pt-8 px-4 md:px-8 lg:px-12 bg-white">
	<div class="mb-6 md:mb-8">
		<h2 class="text-3xl md:text-4xl font-medium whitespace-nowrap">
			<ScrollText text={$t('home.education.title')} />
		</h2>
	</div>

	<AnimatedSection
		customVariant={staggerContainer}
		className="max-w-7xl mx-auto pt-4 relative pl-4 md:pl-8"
	>
		<div class="absolute left-6 top-0 bottom-0 w-0.5 bg-[#027DFD]"></div>

		{#each educationItems as edu, i}
			<Motion variants={fadeUpVariant} let:motion>
				<div
					use:motion
					class="relative pl-16 cursor-pointer group mb-8"
					on:click={() => toggleEducation(edu.id)}
					on:keydown={(e) => e.key === 'Enter' && toggleEducation(edu.id)}
					role="button"
					tabindex="0"
				>
					<div
						class="absolute left-6 top-4 w-10 h-0.5 transition-all duration-300 group-hover:w-12"
						style="background: {edu.color};"
					></div>

					<div
						class="absolute left-4 top-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform group-hover:scale-125 shadow-lg"
						style="background: {openEducation.has(edu.id)
							? edu.color
							: '#fff'}; border-color: {edu.color};"
						class:ring-4={openEducation.has(edu.id)}
						class:ring-opacity-30={openEducation.has(edu.id)}
						style:--tw-ring-color={edu.color}
					>
						{#if openEducation.has(edu.id)}
							<div class="w-2 h-2 rounded-full bg-white"></div>
						{/if}
					</div>

					<Motion
						whileHover={{ scale: 1.1, rotate: [-5, 5, 0] }}
						transition={{ type: 'spring', stiffness: 400, damping: 10 }}
						let:motion={logoMotion}
					>
						<div
							use:logoMotion
							class="absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md overflow-hidden bg-white z-10"
						>
							<img
								src={edu.logo}
								alt="{edu.institution} logo"
								class="w-full h-full object-contain p-1"
							/>
						</div>
					</Motion>

					<Motion
						whileHover={{ scale: 1.02, y: -4 }}
						whileTap={{ scale: 0.98 }}
						transition={{ type: 'spring', stiffness: 300, damping: 20 }}
						let:motion={cardMotion}
					>
						<div
							use:cardMotion
							class="bg-white rounded-xl p-4 shadow-md border-2"
							style="border-color: {openEducation.has(edu.id) ? edu.color : 'rgba(0,0,0,0.08)'};"
						>
							<div class="flex items-start justify-between mb-2">
								<div class="flex-1">
									<div class="flex items-center gap-2 flex-wrap">
										<h4 class="text-base md:text-lg font-medium text-black">{edu.degree}</h4>
										{#if edu.status === 'in-progress'}
											<span
												class="text-xs px-2 py-0.5 rounded-full font-medium text-white"
												style="background: {edu.color};"
											>
												{$t('home.education.inProgress')}
											</span>
										{/if}
									</div>
									<p class="text-sm md:text-base text-black/70 font-medium">{edu.field}</p>
									<p class="text-sm text-black/60">{edu.institution}</p>
								</div>
								<div
									class="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 flex-shrink-0"
									class:rotate-90={openEducation.has(edu.id)}
									style="background: {edu.color}30;"
								>
									<span style="color: {edu.color};">→</span>
								</div>
							</div>

							<div class="flex items-center gap-2 text-xs md:text-sm text-black/60 mb-2 flex-wrap">
								<span class="bg-black/5 px-2 md:px-3 py-1 rounded-full">{edu.startDate}</span>
								<span>—</span>
								<span class="bg-black/5 px-2 md:px-3 py-1 rounded-full">{edu.endDate}</span>
							</div>

							<Motion
								animate={{
									height: openEducation.has(edu.id) ? 'auto' : 0,
									opacity: openEducation.has(edu.id) ? 1 : 0
								}}
								initial={false}
								transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
								let:motion={descMotion}
							>
								<div use:descMotion class="overflow-hidden">
									<div
										class="mt-3 pt-3 border-t border-black/10 text-xs md:text-sm text-black/70 education-description"
									>
										{#if Array.isArray(edu.description)}
											{#each edu.description as paragraph}
												<p class="mb-3 last:mb-0">{paragraph}</p>
											{/each}
										{:else}
											<p>{edu.description}</p>
										{/if}
									</div>
								</div>
							</Motion>
						</div>
					</Motion>
				</div>
			</Motion>
		{/each}
	</AnimatedSection>
</div>

<style>
	.ring-4 {
		box-shadow: 0 0 0 4px currentColor;
		opacity: 0.3;
	}

	.education-description p {
		text-align: justify;
		text-indent: 2em;
		line-height: 1.6;
	}

	.education-description p:first-child {
		margin-top: 0;
	}
</style>
