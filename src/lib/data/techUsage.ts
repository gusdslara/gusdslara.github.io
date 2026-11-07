import type { Language } from '$lib/i18n/dictionaries';

export type LocalizedText = Record<Language, string>;

/**
 * Where/how a technology from the Stack section was used.
 * - `job`: id of the experience in HomeAbout (`jobs.<id>` in the locales).
 * - `project`: name of a personal/client project when it wasn't used at a job.
 */
export type TechUsage =
	| { job: number; how: LocalizedText }
	| { project: string | LocalizedText; client?: boolean; how: LocalizedText };

const l = (pt: string, en: string, es: string): LocalizedText => ({ pt, en, es });

/** Fallback for techs that still don't have a documented usage. */
export const fallbackUsage: LocalizedText = l(
	'Usado em estudos e projetos pessoais.',
	'Used in studies and personal projects.',
	'Usado en estudios y proyectos personales.'
);

export const techUsage: Record<string, TechUsage[]> = {
	// ───────── Linguagens ─────────
	JavaScript: [
		{
			job: 10,
			how: l(
				'App de gestão educacional híbrido com Ionic e Cordova.',
				'Hybrid education management app with Ionic and Cordova.',
				'App híbrida de gestión educativa con Ionic y Cordova.'
			)
		},
		{
			project: 'Tech Store',
			how: l(
				'Animações de scroll com GSAP e cenas 3D com Three.js.',
				'Scroll animations with GSAP and 3D scenes with Three.js.',
				'Animaciones de scroll con GSAP y escenas 3D con Three.js.'
			)
		}
	],
	TypeScript: [
		{
			job: 2,
			how: l(
				'Microfrontend em Angular para automação do backoffice.',
				'Angular microfrontend automating backoffice processes.',
				'Microfrontend en Angular para automatizar el backoffice.'
			)
		},
		{
			job: 5,
			how: l(
				'Microfrontends Angular da plataforma de pós-vendas.',
				'Angular microfrontends for the after-sales platform.',
				'Microfrontends Angular de la plataforma de posventa.'
			)
		},
		{
			project: 'gustavolara.pro',
			how: l(
				'Este portfólio, em SvelteKit com TypeScript.',
				'This portfolio, built with SvelteKit and TypeScript.',
				'Este portafolio, en SvelteKit con TypeScript.'
			)
		}
	],
	Python: [
		{
			job: 2,
			how: l(
				'Agentes de IA locais com Ollama, FastAPI e RAG.',
				'Local AI agents with Ollama, FastAPI and RAG.',
				'Agentes de IA locales con Ollama, FastAPI y RAG.'
			)
		},
		{
			job: 4,
			how: l(
				'Backend local com visão computacional (YOLOv8).',
				'Local backend with computer vision (YOLOv8).',
				'Backend local con visión por computadora (YOLOv8).'
			)
		},
		{
			job: 1,
			how: l(
				'Stack original do SaaS, migrada para Go sob minha liderança.',
				'Original SaaS stack, migrated to Go under my lead.',
				'Stack original del SaaS, migrada a Go bajo mi liderazgo.'
			)
		}
	],
	Java: [
		{
			job: 2,
			how: l(
				'BFF em Quarkus com compilação nativa via GraalVM.',
				'Quarkus BFF with native compilation via GraalVM.',
				'BFF en Quarkus con compilación nativa vía GraalVM.'
			)
		},
		{
			job: 8,
			how: l(
				'Microserviços reativos (WebFlux) para caixas eletrônicos.',
				'Reactive microservices (WebFlux) for ATMs.',
				'Microservicios reactivos (WebFlux) para cajeros automáticos.'
			)
		},
		{
			job: 9,
			how: l(
				'Modernização de legado de auditoria em microserviços.',
				'Audit legacy modernization into microservices.',
				'Modernización del legado de auditoría en microservicios.'
			)
		},
		{
			job: 11,
			how: l(
				'ERP/PDV desktop em Swing com emissão de NF-e.',
				'Swing desktop ERP/POS with e-invoice (NF-e) issuing.',
				'ERP/PDV de escritorio en Swing con emisión de NF-e.'
			)
		}
	],
	Kotlin: [
		{
			job: 9,
			how: l(
				'Microserviços Spring Boot na migração do legado Delphi.',
				'Spring Boot microservices replacing the Delphi legacy.',
				'Microservicios Spring Boot en la migración del legado Delphi.'
			)
		}
	],
	Golang: [
		{
			job: 1,
			how: l(
				'Orquestrador de IA e backend principal (Fiber, gRPC, GORM).',
				'AI orchestrator and main backend (Fiber, gRPC, GORM).',
				'Orquestador de IA y backend principal (Fiber, gRPC, GORM).'
			)
		},
		{
			job: 3,
			how: l(
				'Microserviços do agente de IA para WhatsApp.',
				'Microservices for the WhatsApp AI agent.',
				'Microservicios del agente de IA para WhatsApp.'
			)
		},
		{
			project: 'Argus Player',
			how: l(
				'Servidor de streaming de mídia local.',
				'Local media streaming server.',
				'Servidor de streaming de medios local.'
			)
		}
	],
	Rust: [
		{
			job: 8,
			how: l(
				'Nova interface dos terminais em Linux Yocto, com Qt.',
				'New terminal UI on Linux Yocto, alongside Qt.',
				'Nueva interfaz de terminales en Linux Yocto, con Qt.'
			)
		}
	],
	C: [
		{
			job: 9,
			how: l(
				'Integração com bibliotecas nativas (.dll/.so) via JNI e JNA.',
				'Integration with native libraries (.dll/.so) via JNI and JNA.',
				'Integración con bibliotecas nativas (.dll/.so) vía JNI y JNA.'
			)
		},
		{
			job: 11,
			how: l(
				'Comunicação com hardware de PDV por bibliotecas nativas.',
				'POS hardware communication through native libraries.',
				'Comunicación con hardware de PDV mediante bibliotecas nativas.'
			)
		}
	],
	'C++': [
		{
			job: 4,
			how: l(
				'Firmwares para ESP32/ESP32-CAM com PlatformIO.',
				'ESP32/ESP32-CAM firmware with PlatformIO.',
				'Firmwares para ESP32/ESP32-CAM con PlatformIO.'
			)
		},
		{
			job: 8,
			how: l(
				'Interface Qt dos terminais bancários.',
				'Qt interface for banking terminals.',
				'Interfaz Qt de los terminales bancarios.'
			)
		}
	],

	// ───────── Frontend ─────────
	Angular: [
		{
			job: 2,
			how: l(
				'Microfrontend que substituiu processos manuais do legado PHP.',
				'Microfrontend replacing manual processes from the PHP legacy.',
				'Microfrontend que reemplazó procesos manuales del legado PHP.'
			)
		},
		{
			job: 5,
			how: l(
				'Microfrontends com deploys independentes.',
				'Microfrontends with independent deploys.',
				'Microfrontends con despliegues independientes.'
			)
		},
		{
			job: 10,
			how: l(
				'App offline-first com Ionic e NgRx.',
				'Offline-first app with Ionic and NgRx.',
				'App offline-first con Ionic y NgRx.'
			)
		},
		{
			project: 'TropicaliaCraft',
			how: l(
				'Landing page com SSG e hidratação zoneless.',
				'Landing page with SSG and zoneless hydration.',
				'Landing page con SSG e hidratación zoneless.'
			)
		}
	],
	NgRx: [
		{
			job: 10,
			how: l(
				'Estado offline-first com sincronização posterior.',
				'Offline-first state with deferred sync.',
				'Estado offline-first con sincronización posterior.'
			)
		}
	],
	Svelte: [
		{
			job: 4,
			how: l(
				'PWA de controle central e hub local em tablet.',
				'Central control PWA and local tablet hub.',
				'PWA de control central y hub local en tablet.'
			)
		},
		{
			project: 'gustavolara.pro',
			how: l(
				'Este portfólio, em SvelteKit (SSG).',
				'This portfolio, built with SvelteKit (SSG).',
				'Este portafolio, en SvelteKit (SSG).'
			)
		}
	],
	Ionic: [
		{
			job: 10,
			how: l(
				'App EduCanoas publicado na App Store e Google Play.',
				'EduCanoas app shipped to the App Store and Google Play.',
				'App EduCanoas publicada en App Store y Google Play.'
			)
		}
	],
	'Tailwind CSS': [
		{
			job: 4,
			how: l(
				'Interface da PWA de automação de cultivo.',
				'UI of the grow-automation PWA.',
				'Interfaz de la PWA de automatización de cultivo.'
			)
		},
		{
			project: 'Tech Store',
			how: l(
				'Layout da loja 3D em SvelteKit.',
				'Layout of the SvelteKit 3D store.',
				'Layout de la tienda 3D en SvelteKit.'
			)
		},
		{
			project: 'gustavolara.pro',
			how: l('Estilização deste portfólio.', 'Styling of this portfolio.', 'Estilos de este portafolio.')
		}
	],
	Sass: [
		{
			project: 'gustavolara.pro',
			how: l(
				'Tokens e estilos globais deste portfólio.',
				'Tokens and global styles for this portfolio.',
				'Tokens y estilos globales de este portafolio.'
			)
		}
	],
	Flutter: [
		{
			job: 7,
			how: l(
				'MVP de app de restaurante em uma sprint, com MobX.',
				'Restaurant app MVP in one sprint, using MobX.',
				'MVP de app de restaurante en un sprint, con MobX.'
			)
		}
	],
	Android: [
		{
			job: 10,
			how: l(
				'Build e publicação na Google Play com Jenkins e Fastlane.',
				'Google Play build and release with Jenkins and Fastlane.',
				'Build y publicación en Google Play con Jenkins y Fastlane.'
			)
		}
	],
	Qt: [
		{
			job: 8,
			how: l(
				'Migração do frontend dos caixas de Java Swing para Qt.',
				'ATM frontend migration from Java Swing to Qt.',
				'Migración del frontend de cajeros de Java Swing a Qt.'
			)
		}
	],

	// ───────── Backend ─────────
	'Spring Boot': [
		{
			job: 2,
			how: l(
				'Microsserviços de certificação e auditoria integrados ao BFF Quarkus.',
				'Certification and audit microservices integrated with the Quarkus BFF.',
				'Microservicios de certificación y auditoría integrados con el BFF Quarkus.'
			)
		},
		{
			job: 5,
			how: l(
				'Microserviços da plataforma de pós-vendas.',
				'Microservices for the after-sales platform.',
				'Microservicios de la plataforma de posventa.'
			)
		},
		{
			job: 8,
			how: l(
				'WebFlux reativo com jPOS, ISO-8583 e Kafka.',
				'Reactive WebFlux with jPOS, ISO-8583 and Kafka.',
				'WebFlux reactivo con jPOS, ISO-8583 y Kafka.'
			)
		},
		{
			job: 9,
			how: l(
				'Microserviços com OpenFeign e Spring Batch.',
				'Microservices with OpenFeign and Spring Batch.',
				'Microservicios con OpenFeign y Spring Batch.'
			)
		},
		{
			job: 11,
			how: l('Backend do dashboard de BI.', 'BI dashboard backend.', 'Backend del dashboard de BI.')
		}
	],
	Quarkus: [
		{
			job: 2,
			how: l(
				'BFF nativo (GraalVM) com baixo consumo de memória.',
				'Native (GraalVM) BFF with a low memory footprint.',
				'BFF nativo (GraalVM) con bajo consumo de memoria.'
			)
		},
		{
			job: 5,
			how: l(
				'Microsserviços Java de pós-vendas no Sucesso360.',
				'Java after-sales microservices in Sucesso360.',
				'Microservicios Java de posventa en Sucesso360.'
			)
		}
	],
	Fiber: [
		{
			job: 1,
			how: l(
				'API do orquestrador de IA em Go.',
				'API for the Go AI orchestrator.',
				'API del orquestador de IA en Go.'
			)
		},
		{
			project: 'TropicaliaCraft',
			how: l(
				'Serviços com os dados do servidor de Minecraft.',
				'Services serving the Minecraft server data.',
				'Servicios con los datos del servidor de Minecraft.'
			)
		}
	],
	gRPC: [
		{
			job: 1,
			how: l(
				'Comunicação entre o orquestrador de IA e os serviços.',
				'Communication between the AI orchestrator and services.',
				'Comunicación entre el orquestador de IA y los servicios.'
			)
		},
		{
			job: 2,
			how: l(
				'Interface dos agentes de IA locais em Python.',
				'Interface for the local Python AI agents.',
				'Interfaz de los agentes de IA locales en Python.'
			)
		},
		{
			job: 3,
			how: l(
				'Comunicação entre os microserviços Go.',
				'Communication between Go microservices.',
				'Comunicación entre los microservicios Go.'
			)
		}
	],
	'.NET': [
		{
			job: 5,
			how: l(
				'Microserviços da plataforma de pós-vendas.',
				'Microservices for the after-sales platform.',
				'Microservicios de la plataforma de posventa.'
			)
		}
	],

	// ───────── Bancos de dados ─────────
	PostgreSQL: [
		{
			job: 1,
			how: l(
				'Banco principal com pgvector, GORM, PostgREST e Goose.',
				'Main database with pgvector, GORM, PostgREST and Goose.',
				'Base principal con pgvector, GORM, PostgREST y Goose.'
			)
		}
	],
	MySQL: [
		{
			job: 2,
			how: l(
				'Banco do legado PHP integrado via API RESTful.',
				'PHP legacy database, integrated via RESTful API.',
				'Base del legado PHP integrada vía API RESTful.'
			)
		},
		{
			job: 11,
			how: l('Banco do ERP/PDV desktop.', 'Desktop ERP/POS database.', 'Base del ERP/PDV de escritorio.')
		}
	],
	'Oracle DB': [
		{
			job: 9,
			how: l(
				'Banco do legado de auditoria (Delphi).',
				'Audit legacy database (Delphi).',
				'Base del legado de auditoría (Delphi).'
			)
		},
		{
			job: 6,
			how: l(
				'Sistema legado crítico em Java 6, JSF e JBoss Seam.',
				'Critical legacy system on Java 6, JSF and JBoss Seam.',
				'Sistema legado crítico en Java 6, JSF y JBoss Seam.'
			)
		}
	],
	MongoDB: [
		{
			job: 11,
			how: l(
				'Armazenamento do dashboard de BI.',
				'BI dashboard storage.',
				'Almacenamiento del dashboard de BI.'
			)
		}
	],
	Redis: [
		{
			job: 1,
			how: l(
				'Cache que eliminou picos de CPU no banco.',
				'Caching that removed database CPU spikes.',
				'Caché que eliminó picos de CPU en la base.'
			)
		},
		{
			job: 8,
			how: l(
				'Cache nos middlewares bancários de alta concorrência.',
				'Caching in high-concurrency banking middleware.',
				'Caché en middlewares bancarios de alta concurrencia.'
			)
		}
	],
	Supabase: [
		{
			job: 1,
			how: l(
				'Backend original do SaaS, migrado para Go.',
				'Original SaaS backend, migrated to Go.',
				'Backend original del SaaS, migrado a Go.'
			)
		}
	],
	InfluxDB: [
		{
			job: 4,
			how: l(
				'Séries temporais dos sensores, com Grafana.',
				'Sensor time series, with Grafana.',
				'Series temporales de sensores, con Grafana.'
			)
		}
	],
	ChromaDB: [
		{
			job: 2,
			how: l(
				'Base vetorial do RAG para validações semânticas.',
				'RAG vector store for semantic validation.',
				'Base vectorial del RAG para validaciones semánticas.'
			)
		}
	],
	Firebase: [
		{
			job: 10,
			how: l(
				'Notificações push do app EduCanoas.',
				'Push notifications for the EduCanoas app.',
				'Notificaciones push de la app EduCanoas.'
			)
		}
	],

	// ───────── Nuvem & DevOps ─────────
	Docker: [
		{
			project: 'Tropicalia Server',
			how: l(
				'Infraestrutura conteinerizada do servidor de Minecraft.',
				'Containerized Minecraft server infrastructure.',
				'Infraestructura en contenedores del servidor de Minecraft.'
			)
		}
	],
	Terraform: [
		{
			job: 5,
			how: l(
				'Infraestrutura como código para provisionar a AWS.',
				'Infrastructure as code to provision AWS.',
				'Infraestructura como código para aprovisionar AWS.'
			)
		}
	],
	AWS: [
		{
			job: 5,
			how: l(
				'Deploy dos microserviços em EC2.',
				'Microservices deployed on EC2.',
				'Despliegue de microservicios en EC2.'
			)
		}
	],
	Azure: [
		{
			project: 'Tropicalia Server',
			how: l(
				'Hospedagem do servidor de Minecraft.',
				'Hosting for the Minecraft server.',
				'Hosting del servidor de Minecraft.'
			)
		}
	],
	Kafka: [
		{
			job: 8,
			how: l(
				'Mensageria dos microserviços bancários reativos.',
				'Messaging for reactive banking microservices.',
				'Mensajería de los microservicios bancarios reactivos.'
			)
		},
		{
			job: 9,
			how: l(
				'Rotinas assíncronas e ETL.',
				'Async routines and ETL.',
				'Rutinas asíncronas y ETL.'
			)
		}
	],
	GitHub: [
		{
			job: 1,
			how: l(
				'CI/CD com GitHub Actions para VPS e Railway.',
				'CI/CD with GitHub Actions to VPS and Railway.',
				'CI/CD con GitHub Actions hacia VPS y Railway.'
			)
		},
		{
			job: 5,
			how: l(
				'Pipelines de CI/CD com GitHub Actions.',
				'CI/CD pipelines with GitHub Actions.',
				'Pipelines de CI/CD con GitHub Actions.'
			)
		}
	],

	// ───────── IA & Dados ─────────
	FastAPI: [
		{
			job: 2,
			how: l(
				'APIs dos agentes de IA locais.',
				'APIs for the local AI agents.',
				'APIs de los agentes de IA locales.'
			)
		},
		{
			job: 4,
			how: l(
				'Backend de visão computacional do servidor local.',
				'Computer vision backend on the local server.',
				'Backend de visión por computadora del servidor local.'
			)
		}
	],
	PyTorch: [
		{
			job: 4,
			how: l(
				'Inferência do YOLOv8 para visão computacional.',
				'YOLOv8 inference for computer vision.',
				'Inferencia de YOLOv8 para visión por computadora.'
			)
		}
	],
	Ollama: [
		{
			job: 2,
			how: l(
				'LLMs locais, sem enviar dados a provedores externos.',
				'Local LLMs, without sending data to external providers.',
				'LLMs locales, sin enviar datos a proveedores externos.'
			)
		},
		{
			project: 'PolyUI',
			how: l('Interface web para IA local.', 'Web UI for local AI.', 'Interfaz web para IA local.')
		}
	],
	OpenCV: [
		{
			job: 4,
			how: l(
				'Processamento de imagens das ESP32-CAM.',
				'Image processing from the ESP32-CAMs.',
				'Procesamiento de imágenes de las ESP32-CAM.'
			)
		}
	],
	MQTT: [
		{
			job: 4,
			how: l(
				'Comunicação com sensores e atuadores Tuya.',
				'Communication with sensors and Tuya actuators.',
				'Comunicación con sensores y actuadores Tuya.'
			)
		}
	],

	// ───────── Ferramentas ─────────
	Git: [
		{
			job: 1,
			how: l(
				'Versionamento e code review em todos os times.',
				'Version control and code review across all teams.',
				'Versionado y code review en todos los equipos.'
			)
		}
	],
	'IntelliJ IDEA': [
		{
			job: 2,
			how: l(
				'IDE dos serviços Java/Quarkus.',
				'IDE for the Java/Quarkus services.',
				'IDE de los servicios Java/Quarkus.'
			)
		},
		{
			job: 9,
			how: l('IDE dos serviços Java e Kotlin.', 'IDE for the Java and Kotlin services.', 'IDE de los servicios Java y Kotlin.')
		}
	],

	// ───────── Games & 3D ─────────
	Blender: [
		{
			project: l('Galeria 3D', '3D Gallery', 'Galería 3D'),
			how: l(
				'Modelagem e texturização PBR dos modelos da galeria 3D.',
				'Modeling and PBR texturing for the 3D gallery models.',
				'Modelado y texturizado PBR de los modelos de la galería 3D.'
			)
		}
	],
	'Three.js': [
		{
			project: 'Voxel Canvas',
			how: l('Paint 3D cúbico interativo.', 'Interactive voxel 3D paint.', 'Paint 3D cúbico interactivo.')
		},
		{
			project: 'WebXR Tour Virtual',
			how: l('Passeio virtual imersivo em WebXR.', 'Immersive WebXR virtual tour.', 'Recorrido virtual inmersivo en WebXR.')
		}
	]
};
