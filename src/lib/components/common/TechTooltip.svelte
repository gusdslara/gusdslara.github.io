<script context="module" lang="ts">
	export interface TooltipTool {
		name: string;
		logo: string;
		color?: string;
	}

	export interface TooltipJob {
		id: number;
		company: string;
		logo: string;
		title: string;
		startDate: string;
		endDate: string;
		color: string;
		isFreelance?: boolean;
	}
</script>

<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { locale, t } from '$lib/i18n';
	import { techUsage, fallbackUsage, type TechUsage } from '$lib/data/techUsage';

	export let id = 'tech-tooltip';
	export let anchor: HTMLElement | null = null;
	export let tool: TooltipTool | null = null;
	export let jobs: TooltipJob[] = [];

	const dispatch = createEventDispatcher<{ enter: void; leave: void }>();

	let tip: HTMLDivElement;
	let top = 0;
	let left = 0;
	let arrowX = 0;
	let placement: 'top' | 'bottom' = 'top';
	let reducedMotion = false;

	$: usages = tool ? (techUsage[tool.name] ?? []) : [];
	$: accent = tool?.color ?? '#dd206b';

	const text = (v: string | Record<string, string>) =>
		typeof v === 'string' ? v : (v[$locale] ?? v.en);

	const jobOf = (u: TechUsage) => ('job' in u ? jobs.find((j) => j.id === u.job) : undefined);

	/** Moves the node to <body> so `position: fixed` isn't affected by transformed ancestors. */
	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return { destroy: () => node.remove() };
	}

	function position() {
		if (!anchor || !tip) return;
		const r = anchor.getBoundingClientRect();
		const tw = tip.offsetWidth;
		const th = tip.offsetHeight;
		const margin = 12;
		const topSafe = 76; // keep clear of the fixed navbar
		const gap = 12;
		const center = r.left + r.width / 2;

		placement = r.top - th - gap >= topSafe ? 'top' : 'bottom';
		top = placement === 'top' ? r.top - th - gap : r.bottom + gap;
		left = Math.min(Math.max(center - tw / 2, margin), window.innerWidth - tw - margin);
		arrowX = Math.min(Math.max(center - left, 18), tw - 18);
	}

	let raf = 0;
	function schedulePosition() {
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(position);
	}

	// Reposition whenever the anchor/content changes.
	$: if (anchor && tool) tick().then(position);

	/** Balloon "pop" from the arrow tip. */
	function pop(_node: HTMLElement, { duration = 180 }: { duration?: number } = {}) {
		return {
			duration: reducedMotion ? 0 : duration,
			easing: cubicOut,
			css: (k: number) =>
				`opacity:${k}; transform: translateY(${(1 - k) * (placement === 'top' ? 6 : -6)}px) scale(${0.94 + k * 0.06});`
		};
	}

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.addEventListener('scroll', schedulePosition, { passive: true, capture: true });
		window.addEventListener('resize', schedulePosition, { passive: true });
	});

	onDestroy(() => {
		if (typeof window === 'undefined') return;
		cancelAnimationFrame(raf);
		window.removeEventListener('scroll', schedulePosition, { capture: true });
		window.removeEventListener('resize', schedulePosition);
	});
</script>

{#if tool && anchor}
	<div
		use:portal
		bind:this={tip}
		{id}
		role="tooltip"
		class="tech-tooltip fixed z-[1000] w-[min(340px,calc(100vw-24px))]"
		style="top:{top}px; left:{left}px; transform-origin:{arrowX}px {placement === 'top'
			? '100%'
			: '0%'};"
		transition:pop
		on:pointerenter={() => dispatch('enter')}
		on:pointerleave={() => dispatch('leave')}
	>
		<div
			class="relative bg-white rounded-xl border border-black/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.14)] overflow-hidden"
		>
			<!-- accent bar -->
			<div class="h-1 w-full" style="background:{accent};"></div>

			<div class="p-4">
				<div class="flex items-center gap-2 mb-3">
					<span class="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
						<img src={tool.logo} loading="lazy" decoding="async" alt="" class="max-h-4 max-w-[18px] object-contain" />
					</span>
					<span class="text-sm font-semibold text-black">{tool.name}</span>
					<span class="ml-auto text-[11px] uppercase tracking-wide text-black/40 font-medium">
						{$t('home.about.whereUsed')}
					</span>
				</div>

				{#if usages.length}
					<ul class="flex flex-col gap-3">
						{#each usages as u}
							{@const job = jobOf(u)}
							<li class="flex items-start gap-3">
								{#if job}
									<span
										class="w-8 h-8 rounded-full bg-white shadow-md overflow-hidden flex items-center justify-center shrink-0 border-2"
										class:border-dashed={job.isFreelance}
										style="border-color:{job.color};"
									>
										<img src={job.logo} loading="lazy" decoding="async" alt="" class="w-full h-full object-contain p-0.5" />
									</span>
									<div class="min-w-0 flex-1">
										<p class="text-[13px] leading-snug text-black">
											<span class="font-semibold">{job.company}</span>
											<span class="text-black/50">· {job.title}</span>
										</p>
										<p class="text-[11px] text-black/50 mt-0.5">
											<span class="bg-black/5 px-2 py-0.5 rounded-full">
												{job.startDate} — {job.endDate}
											</span>
										</p>
										<p class="text-xs leading-relaxed text-black/70 mt-1.5">{text(u.how)}</p>
									</div>
								{:else if 'project' in u}
									<span
										class="w-8 h-8 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0"
										aria-hidden="true"
									>
										{#if u.client}
											<!-- lucide: briefcase -->
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" /></svg>
										{:else}
											<!-- lucide: folder-code -->
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10.5 8 13l2 2.5" /><path d="m14 10.5 2 2.5-2 2.5" /><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" /></svg>
										{/if}
									</span>
									<div class="min-w-0 flex-1">
										<p class="text-[13px] leading-snug text-black flex items-center gap-2 flex-wrap">
											<span class="font-semibold">{text(u.project)}</span>
											<span
												class="text-[10px] px-2 py-0.5 rounded-full font-medium bg-primary-50 text-primary-600"
											>
												{u.client ? $t('home.about.clientProject') : $t('home.about.personalProject')}
											</span>
										</p>
										<p class="text-xs leading-relaxed text-black/70 mt-1.5">{text(u.how)}</p>
									</div>
								{/if}
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-xs leading-relaxed text-black/60">{text(fallbackUsage)}</p>
				{/if}
			</div>
		</div>

		<!-- arrow -->
		<span
			class="tech-tooltip-arrow absolute w-3 h-3 bg-white border-black/[0.08] rotate-45"
			class:is-top={placement === 'top'}
			class:is-bottom={placement === 'bottom'}
			style="left:{arrowX - 6}px; {placement === 'bottom' ? `background:${accent};` : ''}"
			aria-hidden="true"
		></span>
	</div>
{/if}

<style>
	.tech-tooltip-arrow.is-top {
		bottom: -6px;
		border-right-width: 1px;
		border-bottom-width: 1px;
	}

	.tech-tooltip-arrow.is-bottom {
		top: -5px;
		border: 0;
	}
</style>
