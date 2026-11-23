<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import HomeTop from '$lib/components/home/HomeTop.svelte';
	import HomeAbout from '$lib/components/home/HomeAbout.svelte';
	import HomeEducation from '$lib/components/home/HomeEducation.svelte';
	import HomeShowcases from '$lib/components/home/HomeShowcases.svelte';
	import HomePlatforms from '$lib/components/home/HomePlatforms.svelte';
	import HomeContact from '$lib/components/home/HomeContact.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import { locale } from '$lib/i18n';
	import { clientApps, myApps } from '$lib/data/projects';

	const SITE = 'https://gustavolara.pro/';
	const OG_IMAGE = `${SITE}og-image.png`;
	const TITLE = 'Gustavo Lara | Software Architect & Tech Lead (Brazil)';
	const DESCRIPTION =
		'Gustavo Lara is a Brazilian Software Architect & Tech Lead with 8+ years of experience in legacy modernization, distributed systems, microservices (Go, Java) and applied AI. Portfolio, projects and contact.';

	const person = {
		'@type': 'Person',
		'@id': `${SITE}#person`,
		name: 'Gustavo Lara',
		alternateName: ['Gustavo D. S. Lara', 'gusdslara'],
		givenName: 'Gustavo',
		familyName: 'Lara',
		jobTitle: 'Software Architect & Tech Lead',
		description: DESCRIPTION,
		url: SITE,
		image: `${SITE}assets/img/avatar/gustavodslara.jpg`,
		email: 'mailto:gustavodslara@gmail.com',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Cuiabá',
			addressRegion: 'MT',
			addressCountry: 'BR'
		},
		nationality: { '@type': 'Country', name: 'Brazil' },
		knowsLanguage: ['pt-BR', 'en', 'es'],
		sameAs: ['https://github.com/gusdslara', 'https://www.linkedin.com/in/gustavodslara/'],
		alumniOf: {
			'@type': 'CollegeOrUniversity',
			name: 'Instituto Federal de Mato Grosso (IFMT)',
			sameAs: 'https://ifmt.edu.br/'
		},
		hasOccupation: {
			'@type': 'Occupation',
			name: 'Software Architect',
			occupationLocation: { '@type': 'Country', name: 'Brazil' },
			skills:
				'Software architecture, technical leadership, legacy modernization, distributed systems, microservices, applied AI, native interoperability'
		},
		knowsAbout: [
			'Software Architecture', 'Technical Leadership', 'Legacy Modernization', 'Distributed Systems',
			'Microservices', 'Applied AI', 'LLM orchestration', 'System Design', 'IoT', 'Game Development',
			'Go', 'Java', 'Kotlin', 'Python', 'Rust', 'TypeScript', 'Angular', 'SvelteKit', 'Tauri', 'Android', 'Wear OS'
		],
		subjectOf: { '@type': 'DigitalDocument', name: 'Curriculum Vitae (PT-BR)', url: `${SITE}cv-gusdsl-ptbr.pdf` }
	};

	const abs = (u: string) => (u.startsWith('http') ? u : SITE + u.replace(/^\//, ''));
	const works = [
		...clientApps.map((p) => ({
			'@type': 'CreativeWork',
			name: p.name,
			...(p.link ? { url: p.link } : {}),
			...(p.image ? { image: abs(p.image) } : {}),
			...(p.year ? { dateCreated: String(p.year) } : {}),
			contributor: { '@id': `${SITE}#person` }
		})),
		...myApps.map((p: any) => ({
			'@type': 'SoftwareApplication',
			name: p.name,
			...(p.link ? { url: p.link } : {}),
			...(p.description ? { description: p.description } : {}),
			author: { '@id': `${SITE}#person` }
		}))
	];

	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'ProfilePage',
				'@id': `${SITE}#page`,
				url: SITE,
				name: TITLE,
				description: DESCRIPTION,
				inLanguage: 'en',
				dateModified: '2026-11-22',
				primaryImageOfPage: OG_IMAGE,
				mainEntity: { '@id': `${SITE}#person` },
				isPartOf: { '@id': `${SITE}#website` }
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE}#website`,
				url: SITE,
				name: 'Gustavo Lara',
				inLanguage: ['en', 'pt-BR', 'es'],
				publisher: { '@id': `${SITE}#person` }
			},
			person,
			{
				'@type': 'ItemList',
				'@id': `${SITE}#portfolio`,
				name: 'Gustavo Lara — Portfolio projects',
				itemListElement: works.map((item, i) => ({ '@type': 'ListItem', position: i + 1, item }))
			}
		]
	};
	// escapa "<" para não fechar o <script> se algum texto contiver "</"
	const jsonLdTag = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}<\/script>`;
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<link rel="canonical" href={SITE} />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

	<meta property="og:type" content="profile" />
	<meta property="profile:first_name" content="Gustavo" />
	<meta property="profile:last_name" content="Lara" />
	<meta property="og:site_name" content="Gustavo Lara" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:url" content={SITE} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Gustavo Lara — Software Architect & Tech Lead" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:locale:alternate" content="pt_BR" />
	<meta property="og:locale:alternate" content="es_ES" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
	<meta name="twitter:image" content={OG_IMAGE} />

	<meta name="geo.region" content="BR-MT" />
	<meta name="geo.placename" content="Cuiabá, Mato Grosso, Brazil" />

	{@html jsonLdTag}
</svelte:head>

<Navbar />

<main class="flex-1 w-full">
	<div class="h-20 md:h-24"></div>

	{#key $locale}
		<HomeTop />

		<div class="h-12 md:h-16"></div>
		<HomeAbout />

		<div class="h-12 md:h-20"></div>
		<HomeEducation />

		<div class="h-12 md:h-20"></div>
		<HomeShowcases />

		<HomePlatforms />

		<div class="h-12 md:h-20"></div>
		<HomeContact />
	{/key}

	<Footer />
</main>
