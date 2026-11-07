export const pt = {
    nav: {
        home: 'Início',
        about: 'Sobre',
        experience: 'Experiência',
        education: 'Educação',
        showcases: 'Portfólio',
        platforms: 'Plataformas',
        contact: 'Contato'
    },
    home: {
        top: {
            greeting: "Olá, eu sou Gustavo Lara",
            title1: 'Arquiteto',
            title2: 'de Software',
            title3: '& Tech Lead',
            desc1: 'Arquiteto de Software e Tech Lead com vasta experiência em modernização de legado, arquiteturas distribuídas e interoperabilidade com código nativo. Perfil poliglota, com alta adaptabilidade a novas linguagens e ecossistemas.',
            desc2: 'Atuo na liderança técnica de times e projetos de ponta a ponta, conectando decisões de arquitetura e IA aplicada aos objetivos de negócio, com foco em performance, escalabilidade e entregas contínuas.'
        },
        about: {
            title: 'Sobre Mim',
            desc1: 'Com sólida atuação como Arquiteto de Software e Tech Lead, me especializei em <strong class="text-black font-medium">modernização de legado</strong>, <strong class="text-black font-medium">arquiteturas distribuídas</strong> e <strong class="text-black font-medium">IA aplicada</strong>. Liderei a engenharia e entrega de <strong class="text-black font-medium">plataformas escaláveis de microsserviços</strong> em Go e Java, orquestradores de IA locais e cloud, e ecossistemas web, mobile e IoT de alta concorrência.',
            desc2: 'Meu foco está em conectar decisões arquiteturais e inteligência artificial diretamente aos objetivos estratégicos de negócio — com foco obstinado em performance, escalabilidade, interoperabilidade nativa e entregas contínuas.',
            yearsExperience: 'Anos de Experiência',
            projectsDelivered: 'Projetos Entregues',
            downloadCV: 'Baixar CV',
            cvLink: '/cv-gusdsl-ptbr.pdf',
            stack: 'Stack',
            languages: 'Linguagens',
            frontend: 'Frontend',
            backend: 'Backend',
            databases: 'Bancos de Dados',
            cloud: 'Nuvem & DevOps',
            ai: 'IA & Dados',
            tools: 'Ferramentas',
            gamedev: 'Desenvolvimento de Jogos & 3D',
            expertise: 'Especialidades',
            experience: 'Experiência',
            clickToExplore: 'Clique para explorar minha trajetória',
            freelance: 'Freelance',
            stackHint: 'Passe o mouse ou toque em uma tecnologia para ver onde e como a usei.',
            whereUsed: 'Onde usei',
            personalProject: 'Projeto pessoal',
            clientProject: 'Projeto de cliente'
        },
        education: {
            title: 'Educação',
            inProgress: 'Em andamento'
        },
        showcases: {
            clients: 'Projetos de Clientes',
            personal: 'Projetos Pessoais',
            morePersonal: 'Mais Projetos Pessoais',
            learnMore: 'Saiba Mais',
            access: 'Acessar',
            myPlatforms: 'Minhas Plataformas'
        },
        platforms: {
            unrenderDesc: 'Estúdio de jogos especializado em jogos VR e experiências imersivas de realidade virtual. Criando entretenimento de realidade virtual de próxima geração.',
            unrenderBtn: 'NOSSOS PROJETOS',
            memorycardDesc: 'Backup automático em nuvem para salvamentos de jogos em todas as plataformas, lojas e emuladores. Solução open source para nunca mais perder seu progresso nos jogos.',
            memorycardBtn: 'TESTE AGORA'
        },
        contact: {
            title: 'Procurando o Arquiteto de Software?',
            subtitle: 'Entre em contato comigo:',
            emailLabel: 'Ou me envie um email:'
        }
    },
    common: {
        footer: {
            staticSite: '<span class="font-medium">Static Site</span> de Alta Performance, construído com',
            and: 'e',
            copyright: '© {year} Copyright | Gustavo Lara | Todos os direitos reservados.'
        },
        modal: {
            category: 'Categoria',
            project: 'Projeto',
            about: 'Sobre o Projeto',
            tech: 'Tecnologias',
            features: 'Principais Funcionalidades',
            architecture: 'Arquitetura de Software',
            gallery: 'Galeria do Projeto',
            viewProject: 'Ver Projeto',
            viewCode: 'Ver Código'
        },
        model3d: {
            loading: 'Carregando modelo 3D...',
            error: 'Não foi possível carregar o modelo',
            checkPath: 'Verifique se o caminho do arquivo está correto.',
            instructions: '🖱️ Arrastar: Rotacionar · Scroll: Zoom · Shift+Arrastar: Pan'
        }
    },
    projects: {
        '1': {
            name: 'Simbium: Plataforma de Atendimento & Gestão com IA',
            description: 'Plataforma SaaS de inteligência conversacional e gestão (SGA) para o mercado fitness. Automatiza vendas e suporte 24/7 via WhatsApp e Instagram com IA humanizada, qualificação de leads, agendamento de aulas experimentais e funil CRM em tempo real.',
            role: 'Tech Lead & Arquiteto de Software',
            features: [
                'Atendimento automatizado 24/7 com IA conversacional humanizada via WhatsApp e Instagram',
                'Qualificação inteligente de leads e agendamento automático de aulas experimentais',
                'Funil de vendas CRM em formato Kanban com inbox multicanal unificado',
                'Arquitetura de microsserviços em Go (Fiber, gRPC) e PostgreSQL de alta performance',
                'Orquestração de LLMs com validação determinística contra alucinações'
            ]
        },
        '2': {
            name: 'EduCanoas: App de gestão educacional',
            description: 'Aplicativo mobile de gestão educacional para escolas, permitindo acompanhamento de alunos, comunicação com pais, gerenciamento de notas, frequência e atividades escolares.',
            role: 'Lead Mobile Developer',
            features: [
                'Painel para professores, alunos e pais',
                'Sistema de mensagens e notificações push',
                'Controle de frequência e notas',
                'Calendário de eventos e atividades',
                'Compartilhamento de documentos e materiais',
                'Sincronização offline'
            ]
        },
        '3': {
            name: 'myQIMA: Certificações Internacionais & Gestão com IA',
            description: 'Plataforma global de certificações e segurança alimentar da QIMA. Atuação na modernização e migração dos módulos de certificações internacionais de produtos orgânicos, automatizando auditorias de conformidade, emissão de certificados e compliance regulatório com arquitetura de microsserviços e inteligência artificial.',
            role: 'Engenheiro de Software',
            features: [
                'Migração e modernização do módulo de certificações internacionais de orgânicos (USDA Organic, EU Organic, GFSI)',
                'Microfrontends em Angular para gestão de auditorias, inspeções e relatórios técnicos',
                'BFF de alta performance em Quarkus com compilação nativa (GraalVM) e microsserviços Spring Boot',
                'Pipeline de IA com Python, Ollama, FastAPI e gRPC para auditoria e validação documental de conformidade',
                'Dashboard em tempo real para rastreabilidade de certificações, planos de ação corretiva (CAPA) e renovações automatizadas'
            ]
        },
        '4': {
            name: 'Sucesso360: Plataforma de CRM & Pós-Vendas',
            description: 'Plataforma corporativa de CRM voltada à gestão completa do ciclo de pós-vendas (Sucesso do Cliente) para a Oi Soluções. Construída com arquitetura modular de microfrontends em Angular e microsserviços em Quarkus, .NET e Node.js, cobrindo múltiplos domínios (Onboarding, Ongoing, Suporte, Playbooks e Expansão) com infraestrutura DevOps e automação CI/CD.',
            role: 'Líder Técnico & DevOps',
            features: [
                'Arquitetura modular de microfrontends em Angular com deploys independentes por domínio',
                'Microsserviços de alta disponibilidade desenvolvidos em Quarkus, .NET e Node.js',
                'Cobertura completa de pós-vendas: Onboarding, Gestão de Playbooks, Planos de Ação e Health Score',
                'Módulos integrados: Conhecer o Cliente, Painel de Experiência, Radar de Pendências e Dashboard de Gestão',
                'Atuação como DevOps: estruturação completa de pipelines CI/CD (GitHub Actions) e provisionamento de infraestrutura (Terraform e Docker)'
            ]
        },
        '1_my': {
            name: 'ng-tropicaliacraft-landingpage',
            caption: 'Landing Page para o TropicaliaCraft em Angular (SSG) com hidratação zoneless + Serviços em Go/Fiber',
            description: 'Landing page de alta performance construída com Angular moderno utilizando hidratação zoneless e Server-Side Generation (SSG). Inclui integração com serviços backend em Go usando Fiber para gerenciar os dados dinâmicos do servidor de Minecraft.',
            features: [
                'Hidratação Zoneless para máxima performance',
                'Server-Side Generation (SSG)',
                'Integração com API RESTful em Go',
                'Design responsivo e acessível'
            ]
        },
        '2_my': {
            name: 'svelte-threejs-tech-store',
            caption: 'Landing Page em SvelteKit e TailwindCSS + Animações com GSAP e Three.js',
            description: 'Loja virtual tecnológica e interativa desenvolvida com SvelteKit. Combina a fluidez do TailwindCSS com animações complexas controladas pelo GSAP e visualizações 3D imersivas renderizadas via Three.js.',
            features: [
                'Visualização de produtos em 3D interativo',
                'Animações suaves baseadas em scroll (GSAP ScrollTrigger)',
                'Arquitetura SvelteKit com transições rápidas',
                'Layout moderno e responsivo'
            ]
        },
        'all': 'Todos',
        'software': 'Software',
        'hardware': 'Hardware',
        '3d': 'Modelagem 3D',
        'games': 'Games',
        'm1': { description: 'Landing Page em Svelte' },
        'm2': { description: 'Interface Web para IA local' },
        'm3': { description: 'Streaming de mídia local' },
        'm4': { description: 'Paint 3D cúbico interativo' },
        'm5': { description: 'Album interativo de viagens em 3D' },
        'm6': { description: 'Passeio virtual imersivo' },
        'm10': { description: 'Infraestrutura de Minecraft' },
        '3d-1': {
            name: 'Apple iPad Pro',
            description: 'Modelo 3D detalhado do Apple iPad Pro com texturas PBR e acabamento realista'
        },
        '3d-2': {
            name: 'ASUS ROG RTX 4090',
            description: 'Modelagem da placa de vídeo ASUS ROG GeForce RTX 4090 com detalhes de hardware'
        },
        '3d-3': {
            name: 'Bird Orange',
            description: 'Modelo estilizado de pássaro laranja com texturização artística'
        },
        '3d-4': {
            name: 'Destiny 2 Character Bust',
            description: 'Busto de personagem inspirado no universo Destiny 2 com detalhes de armadura'
        },
        '3d-5': {
            name: 'iPhone 17 Pro Max',
            description: 'Conceito 3D do iPhone 17 Pro Max com materiais metálicos e vidro realistas'
        },
        '3d-6': {
            name: 'MacBook Pro M3 16"',
            description: 'Modelo fiel do MacBook Pro M3 16 polegadas 2024 com tela e teclado detalhados'
        },
        '3d-7': {
            name: 'Medieval Fantasy Book',
            description: 'Livro de fantasia medieval com texturização detalhada de couro e páginas envelhecidas'
        },
        '3d-8': {
            name: 'Meta Quest 3',
            description: 'Headset de realidade mista Meta Quest 3 com controladores e detalhes de engenharia'
        },
        '3d-9': {
            name: 'Samsung Galaxy S25 Ultra',
            description: 'Modelo 3D do Samsung Galaxy S25 Ultra com câmeras e acabamentos premium'
        },
        '3d-10': {
            name: 'Steam Deck',
            description: 'Console portátil Steam Deck com botões, thumbsticks e tela detalhados'
        },
        'game-1': { description: 'Jogo de corrida infinita com tema cyberpunk' },
        'game-2': { description: 'Exploração espacial em 2D com elementos de survival' }
    },
    jobs: {
        '1': {
            title: 'Tech Lead',
            startDate: 'Mar 2026',
            endDate: 'Out 2026',
            description: [
                'Atuei na liderança da migração do SaaS (gestão para academias com IA) de Python/Supabase para Go, o orquestrador de IA (Fiber, gRPC, OpenAI, pgvector, Redis) com validação determinística contra alucinações, além de criar o backend principal (GORM, PostgreSQL, PostgREST, Goose) integrando webhooks da Meta (HMAC).',
                'Conduzi otimizações de escala que eliminaram picos de CPU no banco (cache, filtros server-side e paralelismo adaptativo), estruturei o CI/CD (GitHub Actions, VPS e Railway) e implementei diversas outras funcionalidades omnichannel, incluindo videoconferência (LiveKit), edição colaborativa (Yjs) e transcrição de reuniões.'
            ]
        },
        '2': {
            title: 'Engenheiro de Software',
            startDate: 'Set 2024',
            endDate: 'Dez 2025',
            description: [
                'Atuei em um projeto internacional de modernização de legado (PHP e MySQL) focado na automação de processos manuais de backoffice, como emissão de certificados. Desenvolvi um microfrontend (Angular, TypeScript) e um BFF em Java (Quarkus com compilação nativa via GraalVM) para baixo consumo de memória e rápida inicialização, e agregando dados do legado via API RESTful.',
                'Construí agentes de IA locais em Python (Ollama, FastAPI, gRPC) com arquitetura RAG e ChromaDB para executar validações semânticas complexas, eliminando a análise humana manual e garantindo total privacidade sem envio de dados a provedores externos.'
            ]
        },
        '3': {
            title: 'Arquiteto de Software',
            startDate: 'Jul 2024',
            endDate: '1 sprint',
            description: 'Projetei e implementei um agente de IA para atendimento via WhatsApp sobre uma arquitetura de microserviços em Go, com comunicação gRPC e persistência com ent. O sistema era agnóstico de modelo e orquestrava LLMs em um pipeline de RAG e Tool Use, permitindo que o agente consultasse a base de conhecimento e executasse ações por ferramentas durante a conversa.'
        },
        '4': {
            title: 'Desenvolvedor IoT',
            startDate: 'Set 2023',
            endDate: 'Out 2023',
            description: [
                'Atuei no desenvolvimento de uma solução IoT para automação de cultivo, criando firmwares em C++ (PlatformIO) para ESP32/ESP32-CAM e integrando atuadores Tuya e sensores via MQTT.',
                'Desenvolvi o controle central como PWA (Svelte, Tailwind) para uso móvel e como um hub local em um tablet, além de servidor local com backend e visão computacional (Python, FastAPI, YOLOv8), InfluxDB e Grafana.'
            ]
        },
        '5': {
            title: 'Líder Técnico',
            startDate: 'Mai 2022',
            endDate: 'Jul 2024',
            description: [
                'Atuei na liderança da arquitetura e desenvolvimento de uma plataforma de pós-vendas modular, definindo microserviços (.NET e Spring Boot) e microfrontends (Angular) para deploys independentes. Estruturei o CI/CD (GitHub Actions) e a infraestrutura como código (Terraform) para provisionamento na AWS (EC2).',
                'Conduzi o planejamento de sprints e o refinamento técnico, traduzindo demandas de negócio para o backlog e mentorando o time em decisões arquiteturais e desafios complexos.'
            ]
        },
        '6': {
            title: 'Desenvolvedor Full Stack',
            startDate: 'Jun 2022',
            endDate: '1 sprint',
            description: 'Atuei na manutenção e evolução de um sistema legado crítico (Java 6, JSF, JBoss Seam e Oracle), corrigindo bugs, atualizando telas e ajustando regras de negócio sem quebrar a arquitetura existente, com foco em estabilidade e entrega rápida.'
        },
        '7': {
            title: 'Desenvolvedor de aplicativos',
            startDate: 'Ago 2021',
            endDate: '1 sprint',
            description: 'Entreguei o MVP de um aplicativo de restaurante em Flutter dentro de uma única sprint de prototipação rápida. Defini a arquitetura de gerenciamento de estado com MobX, deixando a base organizada para o aplicativo continuar evoluindo depois do MVP.'
        },
        '8': {
            title: 'Desenvolvedor Sênior',
            startDate: 'Mai 2021',
            endDate: 'Mai 2022',
            description: [
                'Atuei na migração de middlewares bancários de alta concorrência para caixas eletrônicos, saindo de Spring 3 para microserviços reativos em Java 11 (Spring Boot WebFlux), utilizando jPOS, ISO-8583, Kafka e Redis.',
                'Participei também da migração do frontend dos terminais de Windows/JAM (Java Swing) para Linux Yocto com Qt e Rust, integrando a nova interface aos microserviços e eliminando a dependência de plataforma proprietária.'
            ]
        },
        '9': {
            title: 'Desenvolvedor Pleno',
            startDate: 'Jan 2020',
            endDate: 'Mai 2021',
            description: [
                'Atuei na modernização de um sistema legado de auditoria (Delphi e Oracle), migrando as regras para microserviços em Java 11, Kotlin e Spring Boot (OpenFeign).',
                'Desenvolvi rotinas assíncronas, processamento em lote e ETL (Kafka, Spring Batch), implementei extração de dados via OCR (Tess4J) e integrei bibliotecas nativas legadas via JNI e JNA para utilização de (.dll e .so).'
            ]
        },
        '10': {
            title: 'Desenvolvedor Júnior',
            startDate: 'Jan 2019',
            endDate: 'Jan 2020',
            description: [
                'Atuei no desenvolvimento de um app de gestão educacional (Ionic 3, Angular 4, Cordova) com arquitetura offline-first (SQLite e NgRx) para uso sem internet e sincronização posterior, além de otimização de performance com lazy loading.',
                'Automatizei a esteira de build e publicação na App Store e Google Play utilizando Jenkins e Fastlane.'
            ]
        },
        '11': {
            title: 'Desenvolvedor júnior',
            startDate: 'Mar 2018',
            endDate: 'Dez 2018',
            description: [
                'Atuei no desenvolvimento de um ERP/PDV desktop (Java Swing, MySQL) e de um dashboard de BI (Angular, Spring Boot, MongoDB).',
                'Implementei a emissão de NF-e (JAX-WS, assinatura XML-DSig), pipelines de ETL para o BI, integração com hardwares de PDV via bibliotecas nativas (.dll com JNI/JNA) e distribuição centralizada com atualização automática via Java Web Start (JNLP).'
            ]
        }
    },
    expertise: {
        '1': {
            title: 'Sistemas Distribuídos & Backend',
            skills: [
                'Microsserviços, BFF & API Gateway',
                'Arquitetura Hexagonal, Clean Arch & DDD',
                'Event-Driven Architecture (Kafka, RabbitMQ)',
                'Padrão Saga, Outbox & Circuit Breaker',
                'CQRS, Event Sourcing & Idempotência',
                'Fiber, gRPC, Protobuf, GORM & ent',
                'Quarkus (GraalVM), Spring WebFlux & Micronaut',
                'NestJS, Express, Prisma & .NET Core'
            ]
        },
        '2': {
            title: 'IA Aplicada & Engenharia de Dados',
            skills: [
                'Agentes Autônomos (RAG, Tool Use, LangGraph)',
                'Orquestração com LangChain, LlamaIndex & MCP',
                'Inferência Local & Privada (Ollama, vLLM)',
                'Busca Vetorial & Semântica (pgvector, ChromaDB)',
                'LLM Guardrails & Validação Determinística',
                'Visão Computacional & OCR (YOLOv8, OpenCV, Tess4J)',
                'Pipelines de ETL & Batch (Spring Batch, Pandas)',
                'APIs de IA & ML (FastAPI, PyTorch, TensorFlow)'
            ]
        },
        '3': {
            title: 'Frontend Moderno & Mobile',
            skills: [
                'Angular (Signals, NgRx, Zoneless) & Microfrontends',
                'SvelteKit (Runes, SSR/SSG) & Tailwind CSS',
                'Animações & 3D Web (GSAP, SvelteMotion, Three.js)',
                'Mobile Multiplataforma (Flutter, MobX, BLoC, Ionic)',
                'Mobile Nativo (Jetpack Compose, SwiftUI)',
                'Arquitetura PWA & Sincronização Offline-First',
                'Aplicações Desktop & Embarcadas (Tauri, Qt)',
                'Data Visualization (D3.js, Highcharts, Chart.js)'
            ]
        },
        '4': {
            title: 'IoT, Embarcados & Real-Time',
            skills: [
                'Firmwares & RTOS (ESP-IDF, PlatformIO, Zephyr)',
                'Controle de Hardware (GPIO, I2C, SPI, UART, PWM)',
                'Automação, Sensores MQTT & Atuadores (Tuya, Relés)',
                'Interfaces Embarcadas (LVGL, Qt, Linux Yocto)',
                'Single Board Computers (Orange Pi, Raspberry Pi)',
                'Interoperabilidade Nativa (JNI, JNA, FFI, DLL/SO)',
                'Periféricos, Leitores Biométricos & Impressoras Térmicas',
                'Vídeo Real-Time (LiveKit, WebRTC) & Colaboração (Yjs/CRDT)'
            ]
        },
        '5': {
            title: 'Cloud, DevOps & Observabilidade',
            skills: [
                'Infraestrutura como Código (Terraform) & Multi-Cloud',
                'Containers & Service Mesh (Docker, K8s, Linkerd, Cilium)',
                'CI/CD & Automação (GitHub Actions, Jenkins, Fastlane)',
                'Observabilidade & Tracing (OpenTelemetry, Jaeger, SigNoz)',
                'Métricas & Séries Temporais (Prometheus, Grafana, InfluxDB)',
                'Centralização de Logs & APM (ELK Stack)',
                'Cache Distribuído, Tuning de Banco & Mensageria',
                'DevSecOps, Qualidade & Proxies (SonarQube, Trivy, Caddy)'
            ]
        },
        '6': {
            title: 'Games, XR & Modelagem 3D',
            skills: [
                'Desenvolvimento de Jogos 2D/3D (Unity, Three.js, PixiJS)',
                'Experiências Imersivas VR, AR & MR (WebXR, Meta Quest)',
                'Modelagem 3D Hard-Surface & Orgânica (Blender)',
                'Retopologia, UV Mapping & Texturização PBR',
                'Rigging, Skinning & Animação de Personagens',
                'Shaders, Iluminação & Otimização de Assets (glTF/Draco)',
                'Game Design (GDD), Level Design & Mecânicas de Jogo',
                'Infraestrutura de Servidores Multiplayer & Cloud Saves'
            ]
        }
    },
    education: {
        '1': {
            degree: 'Superior',
            field: 'Sistemas para Internet',
            description: ['Curso Superior no Instituto Federal de Mato Grosso (IFMT) com formação sólida em desenvolvimento de software, arquitetura de sistemas web, bancos de dados e engenharia de software.']
        }
    }
};
