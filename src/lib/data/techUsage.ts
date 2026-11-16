import type { Language } from '$lib/i18n/dictionaries';

export type LocalizedText = Record<Language, string>;

/**
 * Where/how a technology from the Stack section was used.
 * - `job`: id of the experience in HomeAbout (`jobs.<id>` in the locales).
 * - `project`: name of a personal project, or of a client/freelance project (`client: true`)
 *   that isn't listed in the career section (NDA, short engagements etc.).
 */
export type TechUsage =
	| { job: number; how: LocalizedText }
	| { project: string | LocalizedText; client?: boolean; how: LocalizedText };

const l = (pt: string, en: string, es: string): LocalizedText => ({ pt, en, es });

/** Fallback for techs that still don't have a documented usage. */
export const fallbackUsage: LocalizedText = l(
	'Uso ainda não documentado aqui.',
	'Usage not documented here yet.',
	'Uso aún no documentado aquí.'
);

// ───────── Client / freelance projects (NDA or short engagements) ─────────
const bookingMvp = l('MVP de agendamento online', 'Online booking MVP', 'MVP de agendamiento online');
const clinicSaas = l('SaaS para clínicas', 'Clinic management SaaS', 'SaaS para clínicas');
const iosApp = l('App iOS nativo', 'Native iOS app', 'App iOS nativa');
const fieldApp = l('App Android de campo', 'Android field app', 'App Android de campo');
const serverless = l('Integrações serverless', 'Serverless integrations', 'Integraciones serverless');
const dataPipeline = l('Pipeline de dados de vendas', 'Sales data pipeline', 'Pipeline de datos de ventas');
const embeddedHmi = l('IHM embarcada', 'Embedded HMI', 'HMI embebida');
const vrTraining = l('Treinamento em VR', 'VR training', 'Entrenamiento en VR');
const productConfigurator = l('Configurador 3D de produto', '3D product configurator', 'Configurador 3D de producto');
const gallery3d = l('Galeria 3D', '3D Gallery', 'Galería 3D');

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
			job: 1,
			how: l(
				'Servidor de edição colaborativa em tempo real (Yjs).',
				'Real-time collaborative editing server (Yjs).',
				'Servidor de edición colaborativa en tiempo real (Yjs).'
			)
		},
		{
			project: bookingMvp,
			client: true,
			how: l(
				'API e painel administrativo do MVP em Node.js.',
				'MVP API and admin panel in Node.js.',
				'API y panel administrativo del MVP en Node.js.'
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
			project: clinicSaas,
			client: true,
			how: l(
				'Backend NestJS e frontend do MVP, ponta a ponta tipados.',
				'NestJS backend and frontend of the MVP, typed end to end.',
				'Backend NestJS y frontend del MVP, tipados de punta a punta.'
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
		},
		{
			project: 'Meutube',
			how: l(
				'App Android e Android TV com Jetpack Compose, Room e Media3.',
				'Android and Android TV app with Jetpack Compose, Room and Media3.',
				'App Android y Android TV con Jetpack Compose, Room y Media3.'
			)
		},
		{
			project: fieldApp,
			client: true,
			how: l(
				'MVP nativo para equipes de campo, com sincronização offline.',
				'Native MVP for field teams, with offline sync.',
				'MVP nativo para equipos de campo, con sincronización offline.'
			)
		}
	],
	Scala: [
		{
			job: 9,
			how: l(
				'Jobs Spark para cruzar grandes volumes de dados de auditoria.',
				'Spark jobs cross-checking large volumes of audit data.',
				'Jobs Spark para cruzar grandes volúmenes de datos de auditoría.'
			)
		},
		{
			project: dataPipeline,
			client: true,
			how: l(
				'Processamento em lote com Spark para o MVP de um painel de BI.',
				'Spark batch processing for a BI dashboard MVP.',
				'Procesamiento por lotes con Spark para el MVP de un panel de BI.'
			)
		}
	],
	Groovy: [
		{
			job: 11,
			how: l(
				'Scripts de build (Gradle) e regras fiscais configuráveis do ERP.',
				'Build scripts (Gradle) and configurable tax rules for the ERP.',
				'Scripts de build (Gradle) y reglas fiscales configurables del ERP.'
			)
		},
		{
			job: 10,
			how: l(
				'Jenkinsfiles da esteira de build e publicação nas lojas.',
				'Jenkinsfiles for the build and store release pipeline.',
				'Jenkinsfiles del pipeline de build y publicación en las tiendas.'
			)
		}
	],
	Swift: [
		{
			job: 10,
			how: l(
				'Plugins nativos Cordova para recursos do iOS no app EduCanoas.',
				'Native Cordova plugins for iOS features in the EduCanoas app.',
				'Plugins nativos Cordova para recursos de iOS en la app EduCanoas.'
			)
		},
		{
			project: iosApp,
			client: true,
			how: l(
				'MVP de app iOS nativo integrado a APIs REST e notificações push.',
				'Native iOS app MVP integrated with REST APIs and push notifications.',
				'MVP de app iOS nativa integrada a APIs REST y notificaciones push.'
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
			project: 'Deadly BiteZ (Bitez)',
			how: l(
				'Servidor multiplayer em tempo real com WebSocket e WebRTC.',
				'Real-time multiplayer server with WebSocket and WebRTC.',
				'Servidor multijugador en tiempo real con WebSocket y WebRTC.'
			)
		},
		{
			project: 'memorycard.cloud',
			how: l(
				'Backend de sincronização e backup de saves.',
				'Save sync and backup backend.',
				'Backend de sincronización y respaldo de partidas.'
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
		},
		{
			project: 'Tropicalia Launcher',
			how: l(
				'Núcleo do launcher em Tauri: downloads, instâncias e atualizações.',
				'Tauri launcher core: downloads, instances and updates.',
				'Núcleo del launcher en Tauri: descargas, instancias y actualizaciones.'
			)
		},
		{
			project: 'HomeStream',
			how: l(
				'Servidor de mídia local com transcodificação via FFmpeg.',
				'Local media server with FFmpeg transcoding.',
				'Servidor de medios local con transcodificación vía FFmpeg.'
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
		},
		{
			project: 'Crash Team Racing Native (Wear OS)',
			how: l(
				'Port nativo para relógios Wear OS com SDL e OpenGL.',
				'Native port to Wear OS watches with SDL and OpenGL.',
				'Port nativo para relojes Wear OS con SDL y OpenGL.'
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
		},
		{
			project: 'Metal Gear Solid (Wear OS)',
			how: l(
				'Port nativo do engine para relógios Wear OS.',
				'Native engine port to Wear OS watches.',
				'Port nativo del motor para relojes Wear OS.'
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
		},
		{
			job: 5,
			how: l(
				'Estado compartilhado entre os microfrontends de pós-vendas.',
				'Shared state across the after-sales microfrontends.',
				'Estado compartido entre los microfrontends de posventa.'
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
		},
		{
			project: 'Meu Tempero! — Cuiabá',
			how: l(
				'Simulador 3D culinário e gestão em Svelte 5 + Three.js (WebGPU) com Tauri v2.',
				'Cozy 3D cooking and management simulator built with Svelte 5 + Three.js (WebGPU) and Tauri v2.',
				'Simulador 3D culinario y de gestión en Svelte 5 + Three.js (WebGPU) con Tauri v2.'
			)
		},
		{
			project: 'Deadly BiteZ (Bitez)',
			how: l(
				'Hardcore survival roguelike multiplayer 3D com mapa real em Svelte e Three.js.',
				'Hardcore 3D real-time multiplayer zombie survival roguelike in Svelte and Three.js.',
				'Hardcore survival roguelike multijugador 3D con mapa real en Svelte y Three.js.'
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
			project: 'TropicaliaCraft',
			how: l(
				'Visual da landing page do servidor.',
				'Look and feel of the server landing page.',
				'Diseño de la landing page del servidor.'
			)
		},
		{
			project: 'gustavolara.pro',
			how: l('Estilização deste portfólio.', 'Styling of this portfolio.', 'Estilos de este portafolio.')
		}
	],
	Sass: [
		{
			job: 5,
			how: l(
				'Tokens e tema compartilhados entre os microfrontends.',
				'Tokens and theme shared across the microfrontends.',
				'Tokens y tema compartidos entre los microfrontends.'
			)
		},
		{
			job: 10,
			how: l(
				'Temas e componentes customizados do app Ionic.',
				'Themes and custom components for the Ionic app.',
				'Temas y componentes personalizados de la app Ionic.'
			)
		},
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
		},
		{
			project: 'Meutube',
			how: l(
				'App nativo para celular e Android TV, com controle dos pais.',
				'Native app for phones and Android TV, with parental controls.',
				'App nativa para celular y Android TV, con control parental.'
			)
		},
		{
			project: 'Tropicalia Launcher',
			how: l(
				'Versão Android (APK) do launcher do servidor.',
				'Android (APK) build of the server launcher.',
				'Versión Android (APK) del launcher del servidor.'
			)
		},
		{
			project: 'Wear OS',
			how: l(
				'Ports nativos de jogos clássicos para relógios.',
				'Native ports of classic games to smartwatches.',
				'Ports nativos de juegos clásicos para relojes.'
			)
		}
	],
	'Jetpack Compose': [
		{
			project: 'Meutube',
			how: l(
				'Interface adaptada a toque no celular e a controle remoto na TV.',
				'UI adapted to touch on phones and to the remote on TV.',
				'Interfaz adaptada al toque en el celular y al control remoto en la TV.'
			)
		},
		{
			project: fieldApp,
			client: true,
			how: l(
				'Telas de checklist e vistoria do MVP, com Room e Material 3.',
				'Checklist and inspection screens for the MVP, with Room and Material 3.',
				'Pantallas de checklist e inspección del MVP, con Room y Material 3.'
			)
		}
	],
	SwiftUI: [
		{
			project: iosApp,
			client: true,
			how: l(
				'Interface do MVP iOS, do onboarding às telas de pedido.',
				'iOS MVP interface, from onboarding to the ordering screens.',
				'Interfaz del MVP iOS, del onboarding a las pantallas de pedido.'
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
	LVGL: [
		{
			job: 4,
			how: l(
				'Telas touch nos controladores ESP32 da estufa.',
				'Touch screens on the greenhouse ESP32 controllers.',
				'Pantallas táctiles en los controladores ESP32 del invernadero.'
			)
		},
		{
			project: embeddedHmi,
			client: true,
			how: l(
				'Painel de operação de um equipamento de automação em ESP32 com display.',
				'Operator panel for an automation device on ESP32 with a display.',
				'Panel de operación de un equipo de automatización en ESP32 con pantalla.'
			)
		}
	],
	Tauri: [
		{
			project: 'Meu Tempero! — Cuiabá',
			how: l(
				'Empacotamento desktop do jogo com Tauri v2.',
				'Desktop packaging of the game with Tauri v2.',
				'Empaquetado de escritorio del juego con Tauri v2.'
			)
		},
		{
			project: 'Tropicalia Launcher',
			how: l(
				'Launcher multiplataforma leve com frontend SvelteKit.',
				'Lightweight cross-platform launcher with a SvelteKit frontend.',
				'Launcher multiplataforma liviano con frontend SvelteKit.'
			)
		},
		{
			project: 'memorycard.cloud',
			how: l(
				'Cliente desktop que detecta e sincroniza os saves.',
				'Desktop client that detects and syncs game saves.',
				'Cliente de escritorio que detecta y sincroniza las partidas.'
			)
		},
		{
			project: 'HomeStream',
			how: l(
				'App desktop do servidor de mídia doméstico.',
				'Desktop app for the home media server.',
				'App de escritorio del servidor de medios doméstico.'
			)
		}
	],
	'D3.js': [
		{
			job: 11,
			how: l(
				'Visualizações customizadas do dashboard de BI.',
				'Custom visualizations for the BI dashboard.',
				'Visualizaciones personalizadas del dashboard de BI.'
			)
		},
		{
			job: 9,
			how: l(
				'Gráficos de relacionamento para análise das auditorias.',
				'Relationship graphs for audit analysis.',
				'Gráficos de relaciones para el análisis de las auditorías.'
			)
		}
	],
	Highcharts: [
		{
			job: 5,
			how: l(
				'Dashboards de indicadores de pós-vendas e CRM.',
				'After-sales and CRM KPI dashboards.',
				'Dashboards de indicadores de posventa y CRM.'
			)
		}
	],
	'Chart.js': [
		{
			job: 10,
			how: l(
				'Gráficos de frequência e desempenho dos alunos no app.',
				'Student attendance and performance charts in the app.',
				'Gráficos de asistencia y desempeño de los alumnos en la app.'
			)
		},
		{
			project: bookingMvp,
			client: true,
			how: l(
				'Relatórios de ocupação e faturamento no painel administrativo.',
				'Occupancy and revenue reports in the admin panel.',
				'Reportes de ocupación y facturación en el panel administrativo.'
			)
		}
	],

	// ───────── Backend ─────────
	'Node.js': [
		{
			job: 1,
			how: l(
				'Serviço de edição colaborativa (Yjs) e transcrição de reuniões.',
				'Collaborative editing (Yjs) and meeting transcription service.',
				'Servicio de edición colaborativa (Yjs) y transcripción de reuniones.'
			)
		},
		{
			project: 'Tropicalia Server',
			how: l(
				'Serviços de integração e automação do servidor.',
				'Integration and automation services for the server.',
				'Servicios de integración y automatización del servidor.'
			)
		},
		{
			project: bookingMvp,
			client: true,
			how: l(
				'Backend completo do MVP, da agenda aos lembretes automáticos.',
				'Full MVP backend, from scheduling to automated reminders.',
				'Backend completo del MVP, de la agenda a los recordatorios automáticos.'
			)
		}
	],
	Express: [
		{
			project: bookingMvp,
			client: true,
			how: l(
				'API REST do MVP com autenticação JWT e webhooks de pagamento.',
				'MVP REST API with JWT auth and payment webhooks.',
				'API REST del MVP con autenticación JWT y webhooks de pago.'
			)
		}
	],
	NestJS: [
		{
			project: clinicSaas,
			client: true,
			how: l(
				'Backend modular multi-tenant do MVP, com filas e autenticação.',
				'Modular multi-tenant MVP backend, with queues and auth.',
				'Backend modular multi-tenant del MVP, con colas y autenticación.'
			)
		}
	],
	Prisma: [
		{
			project: clinicSaas,
			client: true,
			how: l(
				'ORM e migrations do MVP sobre PostgreSQL.',
				'ORM and migrations for the MVP on PostgreSQL.',
				'ORM y migrations del MVP sobre PostgreSQL.'
			)
		}
	],
	Sequelize: [
		{
			project: bookingMvp,
			client: true,
			how: l(
				'Modelagem e migrations do MVP sobre MySQL.',
				'Modeling and migrations for the MVP on MySQL.',
				'Modelado y migrations del MVP sobre MySQL.'
			)
		}
	],
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
	Micronaut: [
		{
			job: 8,
			how: l(
				'Serviços auxiliares leves de consulta para os terminais.',
				'Lightweight auxiliary lookup services for the terminals.',
				'Servicios auxiliares livianos de consulta para los terminales.'
			)
		},
		{
			project: serverless,
			client: true,
			how: l(
				'Funções em AWS Lambda com cold start baixo para integrações de pagamento.',
				'Low cold-start AWS Lambda functions for payment integrations.',
				'Funciones en AWS Lambda con cold start bajo para integraciones de pago.'
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
		},
		{
			job: 3,
			how: l(
				'Persistência dos microserviços do agente via ent.',
				'Persistence for the agent microservices via ent.',
				'Persistencia de los microservicios del agente vía ent.'
			)
		},
		{
			project: clinicSaas,
			client: true,
			how: l(
				'Banco multi-tenant do MVP com Prisma.',
				'Multi-tenant MVP database with Prisma.',
				'Base multi-tenant del MVP con Prisma.'
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
	Neo4j: [
		{
			job: 9,
			how: l(
				'Grafo de vínculos entre empresas, sócios e contratos para apontar indícios de fraude.',
				'Graph linking companies, partners and contracts to flag fraud indicators.',
				'Grafo de vínculos entre empresas, socios y contratos para señalar indicios de fraude.'
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
		},
		{
			job: 7,
			how: l(
				'Autenticação e Firestore do MVP em Flutter.',
				'Authentication and Firestore for the Flutter MVP.',
				'Autenticación y Firestore del MVP en Flutter.'
			)
		}
	],

	// ───────── Nuvem & DevOps ─────────
	Docker: [
		{
			job: 1,
			how: l(
				'Deploy dos serviços Go em VPS e Railway.',
				'Deploying the Go services to VPS and Railway.',
				'Despliegue de los servicios Go en VPS y Railway.'
			)
		},
		{
			job: 5,
			how: l(
				'Imagens dos microserviços .NET e Spring Boot na AWS.',
				'Images for the .NET and Spring Boot microservices on AWS.',
				'Imágenes de los microservicios .NET y Spring Boot en AWS.'
			)
		},
		{
			project: 'Tropicalia Server',
			how: l(
				'Infraestrutura conteinerizada do servidor de Minecraft.',
				'Containerized Minecraft server infrastructure.',
				'Infraestructura en contenedores del servidor de Minecraft.'
			)
		}
	],
	Kubernetes: [
		{
			job: 8,
			how: l(
				'Orquestração e escala dos microserviços bancários.',
				'Orchestration and scaling of the banking microservices.',
				'Orquestación y escalado de los microservicios bancarios.'
			)
		},
		{
			job: 2,
			how: l(
				'Deploy do BFF nativo e dos agentes de IA em cluster.',
				'Cluster deploys of the native BFF and AI agents.',
				'Despliegue en clúster del BFF nativo y de los agentes de IA.'
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
		},
		{
			project: 'Tropicalia Server',
			how: l(
				'Hospedagem em instâncias EC2 e volumes persistentes EBS.',
				'Hosting on EC2 instances and persistent EBS volumes.',
				'Hosting en instancias EC2 y volúmenes persistentes EBS.'
			)
		},
		{
			project: serverless,
			client: true,
			how: l(
				'Lambda, API Gateway e SQS para integrações de pagamento.',
				'Lambda, API Gateway and SQS for payment integrations.',
				'Lambda, API Gateway y SQS para integraciones de pago.'
			)
		}
	],
	Azure: [
		{
			project: 'memorycard.cloud',
			how: l(
				'Infraestrutura em nuvem e armazenamento de backups de saves.',
				'Cloud infrastructure and game save backup storage.',
				'Infraestructura en la nube y almacenamiento de respaldos de partidas.'
			)
		}
	],
	'Google Cloud': [
		{
			job: 10,
			how: l(
				'Projeto Firebase/FCM e Cloud Functions do app EduCanoas.',
				'Firebase/FCM project and Cloud Functions for the EduCanoas app.',
				'Proyecto Firebase/FCM y Cloud Functions de la app EduCanoas.'
			)
		},
		{
			project: bookingMvp,
			client: true,
			how: l(
				'Hospedagem do MVP em Cloud Run com Cloud SQL.',
				'MVP hosted on Cloud Run with Cloud SQL.',
				'Hosting del MVP en Cloud Run con Cloud SQL.'
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
	RabbitMQ: [
		{
			job: 5,
			how: l(
				'Mensageria assíncrona entre os microserviços .NET e Spring Boot.',
				'Async messaging between the .NET and Spring Boot microservices.',
				'Mensajería asíncrona entre los microservicios .NET y Spring Boot.'
			)
		},
		{
			project: clinicSaas,
			client: true,
			how: l(
				'Filas de notificações e lembretes do MVP.',
				'Notification and reminder queues for the MVP.',
				'Colas de notificaciones y recordatorios del MVP.'
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
	Maven: [
		{
			job: 8,
			how: l(
				'Build e dependências dos microserviços bancários.',
				'Build and dependencies for the banking microservices.',
				'Build y dependencias de los microservicios bancarios.'
			)
		},
		{
			job: 11,
			how: l(
				'Build do ERP/PDV e empacotamento para o Java Web Start.',
				'ERP/POS build and packaging for Java Web Start.',
				'Build del ERP/PDV y empaquetado para Java Web Start.'
			)
		}
	],
	Gradle: [
		{
			job: 9,
			how: l(
				'Build multi-módulo dos microserviços Java e Kotlin.',
				'Multi-module build for the Java and Kotlin microservices.',
				'Build multimódulo de los microservicios Java y Kotlin.'
			)
		},
		{
			project: 'Meutube',
			how: l(
				'Build do app Android com Kotlin DSL e version catalogs.',
				'Android app build with Kotlin DSL and version catalogs.',
				'Build de la app Android con Kotlin DSL y version catalogs.'
			)
		}
	],
	'ELK Stack': [
		{
			job: 8,
			how: l(
				'Logs centralizados e rastreio das transações dos caixas.',
				'Centralized logs and tracing of ATM transactions.',
				'Logs centralizados y rastreo de las transacciones de los cajeros.'
			)
		},
		{
			job: 9,
			how: l(
				'Monitoramento das rotinas de lote e ETL.',
				'Monitoring of the batch and ETL routines.',
				'Monitoreo de las rutinas por lotes y ETL.'
			)
		}
	],
	SonarQube: [
		{
			job: 9,
			how: l(
				'Quality gate e cobertura de testes nos microserviços.',
				'Quality gate and test coverage on the microservices.',
				'Quality gate y cobertura de pruebas en los microservicios.'
			)
		},
		{
			job: 5,
			how: l(
				'Análise estática integrada ao CI dos microserviços.',
				'Static analysis integrated into the microservices CI.',
				'Análisis estático integrado al CI de los microservicios.'
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
	TensorFlow: [
		{
			job: 9,
			how: l(
				'Classificação dos documentos digitalizados após o OCR.',
				'Classification of scanned documents after OCR.',
				'Clasificación de los documentos digitalizados tras el OCR.'
			)
		}
	],
	'TensorFlow.js': [
		{
			job: 4,
			how: l(
				'Pré-análise das imagens das plantas direto na PWA.',
				'Plant image pre-analysis right in the PWA.',
				'Preanálisis de las imágenes de las plantas directo en la PWA.'
			)
		}
	],
	LangChain: [
		{
			job: 3,
			how: l(
				'Pipeline de RAG e Tool Use do agente de WhatsApp.',
				'RAG and Tool Use pipeline for the WhatsApp agent.',
				'Pipeline de RAG y Tool Use del agente de WhatsApp.'
			)
		},
		{
			job: 2,
			how: l(
				'Cadeias de validação semântica dos agentes locais.',
				'Semantic validation chains for the local agents.',
				'Cadenas de validación semántica de los agentes locales.'
			)
		}
	],
	LlamaIndex: [
		{
			job: 2,
			how: l(
				'Ingestão e indexação de documentos no RAG com ChromaDB.',
				'Document ingestion and indexing into the RAG with ChromaDB.',
				'Ingesta e indexación de documentos en el RAG con ChromaDB.'
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
	'MCP Server': [
		{
			job: 1,
			how: l(
				'Ferramentas do orquestrador de IA expostas via MCP.',
				'AI orchestrator tools exposed through MCP.',
				'Herramientas del orquestador de IA expuestas vía MCP.'
			)
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
	Pandas: [
		{
			job: 4,
			how: l(
				'Análise histórica dos dados de sensores do cultivo.',
				'Historical analysis of the grow sensor data.',
				'Análisis histórico de los datos de sensores del cultivo.'
			)
		},
		{
			job: 2,
			how: l(
				'Limpeza e preparo dos dados do legado para o RAG.',
				'Cleaning and preparing legacy data for the RAG.',
				'Limpieza y preparación de los datos del legado para el RAG.'
			)
		}
	],
	NumPy: [
		{
			job: 4,
			how: l(
				'Pré e pós-processamento das imagens para o YOLOv8.',
				'Image pre- and post-processing for YOLOv8.',
				'Pre y posprocesamiento de las imágenes para YOLOv8.'
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
		},
		{
			job: 5,
			how: l(
				'Fluxo de branches e revisão que mantive como líder técnico.',
				'Branching and review flow I kept as tech lead.',
				'Flujo de branches y revisión que mantuve como líder técnico.'
			)
		}
	],
	'VS Code': [
		{
			job: 4,
			how: l(
				'Firmwares com PlatformIO e a PWA em Svelte.',
				'Firmware with PlatformIO and the Svelte PWA.',
				'Firmwares con PlatformIO y la PWA en Svelte.'
			)
		},
		{
			job: 1,
			how: l(
				'Desenvolvimento dos serviços Go e do frontend.',
				'Development of the Go services and frontend.',
				'Desarrollo de los servicios Go y del frontend.'
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
	DataGrip: [
		{
			job: 1,
			how: l(
				'Tuning de queries PostgreSQL que eliminou picos de CPU.',
				'PostgreSQL query tuning that removed CPU spikes.',
				'Tuning de queries PostgreSQL que eliminó picos de CPU.'
			)
		},
		{
			job: 9,
			how: l(
				'Engenharia reversa das regras no Oracle do legado.',
				'Reverse engineering of business rules in the legacy Oracle.',
				'Ingeniería inversa de las reglas en el Oracle del legado.'
			)
		}
	],
	Figma: [
		{
			job: 5,
			how: l(
				'Protótipos e handoff dos microfrontends com o time de produto.',
				'Prototypes and microfrontend handoff with the product team.',
				'Prototipos y handoff de los microfrontends con el equipo de producto.'
			)
		},
		{
			job: 7,
			how: l(
				'Protótipo navegável validado antes da sprint do MVP.',
				'Clickable prototype validated before the MVP sprint.',
				'Prototipo navegable validado antes del sprint del MVP.'
			)
		}
	],
	Affinity: [
		{
			project: 'Meu Tempero! — Cuiabá',
			how: l(
				'Arte 2D, UI do jogo e materiais de divulgação.',
				'2D art, game UI and promotional material.',
				'Arte 2D, UI del juego y material promocional.'
			)
		},
		{
			project: 'gustavolara.pro',
			how: l(
				'Tratamento das imagens e capturas deste portfólio.',
				'Editing of the images and captures in this portfolio.',
				'Edición de las imágenes y capturas de este portafolio.'
			)
		}
	],
	GIMP: [
		{
			project: gallery3d,
			how: l(
				'Pintura e ajuste de texturas dos modelos 3D.',
				'Painting and tweaking textures for the 3D models.',
				'Pintura y ajuste de texturas de los modelos 3D.'
			)
		},
		{
			project: 'Deadly BiteZ (Bitez)',
			how: l(
				'Texturas e sprites dos zumbis e construções.',
				'Textures and sprites for zombies and buildings.',
				'Texturas y sprites de los zombis y construcciones.'
			)
		}
	],

	// ───────── Games & 3D ─────────
	Unity: [
		{
			project: vrTraining,
			client: true,
			how: l(
				'MVP de treinamento imersivo para Meta Quest em realidade mista.',
				'Immersive mixed-reality training MVP for Meta Quest.',
				'MVP de entrenamiento inmersivo para Meta Quest en realidad mixta.'
			)
		}
	],
	Blender: [
		{
			project: gallery3d,
			how: l(
				'Modelagem e texturização PBR dos modelos da galeria 3D.',
				'Modeling and PBR texturing for the 3D gallery models.',
				'Modelado y texturizado PBR de los modelos de la galería 3D.'
			)
		},
		{
			project: 'Deadly BiteZ (Bitez)',
			how: l(
				'Modelos, rigging e animação de inimigos, sobreviventes e construções.',
				'Models, rigging and animation for enemies, survivors and buildings.',
				'Modelos, rigging y animación de enemigos, sobrevivientes y construcciones.'
			)
		},
		{
			project: 'Meu Tempero! — Cuiabá',
			how: l(
				'Patrimônios de Cuiabá recriados em 3D para os cenários.',
				'Cuiabá landmarks recreated in 3D for the environments.',
				'Patrimonios de Cuiabá recreados en 3D para los escenarios.'
			)
		}
	],
	'Three.js': [
		{
			project: 'Meu Tempero! — Cuiabá',
			how: l(
				'Cenários 3D, personagens chibis procedurais, iluminação dinâmica e shader de mundo curvo.',
				'3D environments, procedural chibi characters, dynamic lighting, and curved-world shader.',
				'Escenarios 3D, personajes chibis procedimentales, iluminación dinámica y shader de mundo curvo.'
			)
		},
		{
			project: 'Deadly BiteZ (Bitez)',
			how: l(
				'Motor 3D com renderização de mapa real (OpenStreetMap), estúdio de customização e física de sobrevivência.',
				'3D engine with real-world map rendering (OpenStreetMap), character studio, and survival physics.',
				'Motor 3D con renderizado de mapas reales (OpenStreetMap), estudio de personalización y físicas.'
			)
		},
		{
			project: 'Voxel Canvas',
			how: l('Paint 3D cúbico interativo.', 'Interactive voxel 3D paint.', 'Paint 3D cúbico interactivo.')
		},
		{
			project: 'WebXR Tour Virtual',
			how: l('Passeio virtual imersivo em WebXR.', 'Immersive WebXR virtual tour.', 'Recorrido virtual inmersivo en WebXR.')
		}
	],
	'Babylon.js': [
		{
			project: productConfigurator,
			client: true,
			how: l(
				'MVP de configurador 3D no navegador para um e-commerce de móveis.',
				'In-browser 3D configurator MVP for a furniture e-commerce.',
				'MVP de configurador 3D en el navegador para un e-commerce de muebles.'
			)
		}
	]
};
