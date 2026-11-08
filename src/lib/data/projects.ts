import { getToolIcon } from '$lib/config/toolIcons';
import type { ClientApp, MyApp, Tab, ProjectData } from '$lib/types/projects';

export const clientApps: ClientApp[] = [
    {
        id: '1',
        name: 'Simbium: Plataforma de Atendimento & Gestão com IA',
        image: '/assets/img/clients/simbium.jpg',
        link: 'https://simbium.com/',
        description:
            'Plataforma SaaS de inteligência conversacional e gestão (SGA) para o mercado fitness. Automatiza vendas e suporte 24/7 via WhatsApp e Instagram com IA humanizada, qualificação de leads, agendamento de aulas experimentais e funil CRM em tempo real.',
        role: 'Tech Lead & Arquiteto de Software',
        year: '2026',
        technologies: ['Go', 'TypeScript', 'PostgreSQL', 'Docker', 'TailwindCSS', 'Redis'],
        features: [
            'Atendimento automatizado 24/7 com IA conversacional humanizada via WhatsApp e Instagram',
            'Qualificação inteligente de leads e agendamento automático de aulas experimentais',
            'Funil de vendas CRM em formato Kanban com inbox multicanal unificado',
            'Arquitetura de microsserviços em Go (Fiber, gRPC) e PostgreSQL de alta performance',
            'Orquestração de LLMs com validação determinística contra alucinações'
        ],
        stackImages: ['Go', 'TypeScript', 'PostgreSQL', 'Docker'].map((t) => getToolIcon(t) ?? ''),
        stackImageNames: ['Go', 'TypeScript', 'PostgreSQL', 'Docker'],
        backgroundColor: '#FFEFEA',
        titleColor: '#000000',
        type: 'desktop',
        secondaryInFront: true,
        phoneImages: [
            '/assets/img/clients/simbium-logo.png',
            '/assets/img/clients/simbium.jpg'
        ],
        additionalImages: [
            '/assets/img/clients/simbium.jpg',
            '/assets/img/clients/simbium-sga.jpg',
            '/assets/img/clients/simbium-demo.jpg',
            '/assets/img/clients/simbium-mobile.png'
        ]
    },
    {
        id: '2',
        name: 'EduCanoas: App de gestão educacional',
        image: '/assets/img/clients/educanoas-preview.png',
        link: 'https://apkpure.com/br/educanoas/br.com.abaco.rs.canoas.educanoas',
        description:
            'Aplicativo mobile de gestão educacional para escolas, permitindo acompanhamento de alunos, comunicação com pais, gerenciamento de notas, frequência e atividades escolares.',
        role: 'Lead Mobile Developer',
        year: '2022-2023',
        technologies: ['Ionic', 'Android', 'iOS', 'Cordova', 'Firebase'],
        features: [
            'Painel para professores, alunos e pais',
            'Sistema de mensagens e notificações push',
            'Controle de frequência e notas',
            'Calendário de eventos e atividades',
            'Compartilhamento de documentos e materiais',
            'Sincronização offline'
        ],
        stackImages: ['Ionic', 'Android', 'iOS', 'Cordova'].map((t) => getToolIcon(t) ?? ''),
        stackImageNames: ['Ionic', 'Android', 'iOS', 'Cordova'],
        backgroundColor: '#E1F0FF',
        titleColor: '#000000',
        type: 'mobile',
        phoneImages: ['/assets/img/clients/educanoas1.png', '/assets/img/clients/educanoas2.png'],
        additionalImages: [
            '/assets/img/clients/educanoas-preview.png',
            '/assets/img/clients/educanoas1.png',
            '/assets/img/clients/educanoas2.png'
        ]
    },
    {
        id: '3',
        name: 'myQIMA: Certificações Internacionais & Gestão com IA',
        image: '/assets/img/clients/myqima-dashboard.png',
        link: 'https://www.qima.com.br/food/myqima-food-safety-certification-platform',
        description:
            'Plataforma global de certificações e segurança alimentar da QIMA. Atuação na modernização e migração dos módulos de certificações internacionais de produtos orgânicos, automatizando auditorias de conformidade, emissão de certificados e compliance regulatório com arquitetura de microsserviços e inteligência artificial.',
        role: 'Engenheiro de Software',
        year: '2024 - 2025',
        technologies: ['Angular', 'Spring Boot', 'Quarkus', 'FastAPI', 'Python', 'Ollama', 'gRPC'],
        features: [
            'Migração e modernização do módulo de certificações internacionais de orgânicos (USDA Organic, EU Organic, GFSI)',
            'Microfrontends em Angular para gestão de auditorias, inspeções e relatórios técnicos',
            'BFF de alta performance em Quarkus com compilação nativa (GraalVM) e microsserviços Spring Boot',
            'Pipeline de IA com Python, Ollama, FastAPI e gRPC para auditoria e validação documental de conformidade',
            'Dashboard em tempo real para rastreabilidade de certificações, planos de ação corretiva (CAPA) e renovações automatizadas'
        ],
        stackImages: ['Angular', 'Spring Boot', 'Quarkus', 'FastAPI', 'Python', 'Ollama', 'gRPC'].map((t) => getToolIcon(t) ?? ''),
        stackImageNames: ['Angular', 'Spring Boot', 'Quarkus', 'FastAPI', 'Python', 'Ollama', 'gRPC'],
        backgroundColor: '#FFF0F2',
        titleColor: '#000000',
        type: 'desktop-left',
        phoneImages: ['/assets/img/clients/myqima-dashboard.png', '/assets/img/clients/myqima-nc-screen.png'],
        additionalImages: [
            '/assets/img/clients/myqima-dashboard.png',
            '/assets/img/clients/myqima-nc-screen.png'
        ]
    },
    {
        id: '4',
        name: 'Sucesso360: Plataforma de CRM & Pós-Vendas',
        image: '/assets/img/clients/sucesso360-dashboard.png',
        description:
            'Plataforma corporativa de CRM voltada à gestão completa do ciclo de pós-vendas (Sucesso do Cliente) para a Oi Soluções. Construída com arquitetura modular de microfrontends em Angular e microsserviços em Quarkus, .NET e Node.js, cobrindo múltiplos domínios (Onboarding, Ongoing, Suporte, Playbooks e Expansão) com infraestrutura DevOps e automação CI/CD.',
        role: 'Líder Técnico & DevOps',
        year: '2022 - 2024',
        technologies: ['Angular', 'Quarkus', '.NET', 'Node.js', 'Docker', 'Terraform', 'CI/CD'],
        features: [
            'Arquitetura modular de microfrontends em Angular com deploys independentes por domínio',
            'Microsserviços de alta disponibilidade desenvolvidos em Quarkus, .NET e Node.js',
            'Cobertura completa de pós-vendas: Onboarding, Gestão de Playbooks, Planos de Ação e Health Score',
            'Módulos integrados: Conhecer o Cliente, Painel de Experiência, Radar de Pendências e Dashboard de Gestão',
            'Atuação como DevOps: estruturação completa de pipelines CI/CD (GitHub Actions) e provisionamento de infraestrutura (Terraform e Docker)'
        ],
        stackImages: ['Angular', 'Quarkus', '.NET', 'Node.js', 'Docker', 'Terraform'].map((t) => getToolIcon(t) ?? ''),
        stackImageNames: ['Angular', 'Quarkus', '.NET', 'Node.js', 'Docker', 'Terraform'],
        backgroundColor: '#E8F7EC',
        titleColor: '#000000',
        type: 'desktop',
        phoneImages: ['/assets/img/clients/sucesso360-login.png', '/assets/img/clients/sucesso360-dashboard.png'],
        additionalImages: [
            '/assets/img/clients/sucesso360-dashboard.png',
            '/assets/img/clients/sucesso360-login.png'
        ]
    }
];

export const myApps: MyApp[] = [
    {
        id: 1,
        name: 'Tropicalia Launcher',
        category: ['software', 'games'],
        categories: ['software', 'games'],
        image: '/assets/img/logos/tropicalialauncher.png',
        caption:
            'Launcher Cross-Platform (Desktop & Mobile) para Minecraft em Tauri v2, Rust & SvelteKit 5',
        description:
            'Launcher oficial do ecossistema TropicaliaCraft desenvolvido para Windows, Linux, macOS e Android. Integra motor gráfico híbrido, autenticação Microsoft OAuth2, gerenciador inteligente de instâncias, download acelerado de mods via Modrinth/CurseForge e sincronização automática de perfis com servidor híbrido.',
        technologies: ['Tauri', 'Rust', 'Svelte', 'TypeScript', 'Android'],
        features: [
            'Arquitetura nativa ultra leve com Tauri v2 e Rust',
            'Frontend moderno e reativo com SvelteKit 5 e TailwindCSS',
            'Suporte multiplataforma completo (Windows, Linux, macOS e Android)',
            'Gerenciador de instâncias e versões de Minecraft (Vanilla, Fabric, Forge, NeoForge, Quilt)',
            'Integração nativa com APIs do Modrinth e CurseForge para mods e shaders',
            'Suporte a contas Microsoft OAuth2 e autenticação offline',
            'Sincronização automática e conexão com servidores TropicaliaCraft'
        ],
        background: '#FFF2EB',
        link: 'https://tropicaliacraft.online/',
        githubUrl: 'https://github.com/gusdslara/tropicaliacraft-launcher',
        additionalImages: [
            '/assets/img/apps/tropicalia-launcher-app.webp',
            '/assets/img/apps/tropicalia-launcher-app-2.webp'
        ]
    },
    {
        id: 3,
        name: 'Crash Team Racing Native (Wear OS)',
        category: ['games', 'software'],
        categories: ['games', 'software'],
        isWearOS: true,
        image: '/assets/img/apps/wearos/ctr-round-cove.png',
        caption: 'Port nativo de Crash Team Racing (PS1) em C/SDL3 rodando a 60 FPS no pulso',
        description:
            'Port nativo de alto desempenho para smartwatches Wear OS (Galaxy Watch / One UI Watch), baseado no projeto open-source de engenharia reversa e port mobile de CTR (como <a href="https://github.com/Simon358/ctr-native-android" target="_blank" rel="noopener noreferrer" class="text-emerald-600 underline font-medium hover:text-emerald-500">ctr-native-android</a> e <a href="https://github.com/CTR-ModSDK/CTR-ModSDK" target="_blank" rel="noopener noreferrer" class="text-emerald-600 underline font-medium hover:text-emerald-500">CTR-ModSDK</a>). Desenvolvido em C com aceleração SDL3 e OpenGL ES 60 FPS, adaptado especificamente para telas circulares de 432x432 px com controles PlayStation em arco e D-pad central.',
        technologies: ['C', 'SDL', 'Android', 'Wear OS', 'OpenGL'],
        features: [
            'Aceleração gráfica nativa via hardware com OpenGL ES a 60 FPS fluidos',
            'Interface e HUD adaptados para display circular de 432x432 (One UI Watch)',
            'Controles clássicos de PlayStation (△, ✕, □, ○, L1/R1, L2/R2) e D-Pad em arco ergonômico',
            'Áudio e trilha sonora original sintetizada em tempo real via SDL3',
            'Sistema de Save State e progresso preservado no armazenamento do smartwatch',
            'Instalação direta via APK compatível com Android Wear OS'
        ],
        background: '#FFF2EB',
        githubUrl: 'https://github.com/gusdslara/ctr-wearos',
        apkUrl: '/assets/downloads/ctr-wearos.apk',
        apkSize: '11.4 MB',
        wearosImages: [
            '/assets/img/apps/wearos/ctr-round-controls.png',
            '/assets/img/apps/wearos/ctr-round-cove.png',
            '/assets/img/apps/wearos/ctr-round-boost.png',
            '/assets/img/apps/wearos/ctr-round-trophy.png'
        ],
        additionalImages: [
            '/assets/img/apps/wearos/ctr-menu-title.png',
            '/assets/img/apps/wearos/ctr-menu-kart.png',
            '/assets/img/apps/wearos/ctr-menu-track.png'
        ]
    },
    {
        id: 4,
        name: 'Super Mario World (Wear OS)',
        category: ['games', 'software'],
        categories: ['games', 'software'],
        isWearOS: true,
        image: '/assets/img/apps/wearos/smw-round-1.png',
        caption: 'Port nativo de Super Mario World adaptado para relógios Wear OS',
        description:
            'Adaptação nativa para smartwatches Wear OS baseada na descompilação de Super Mario World e no projeto open-source <a href="https://github.com/freyta/smw-android" target="_blank" rel="noopener noreferrer" class="text-emerald-600 underline font-medium hover:text-emerald-500">smw-android</a>. Compilado nativamente em C e SDL com overlay de controles táteis circulares translúcidos de alto contraste, vinheta radial e gameplay com zero ghost taps.',
        technologies: ['C', 'Android', 'Wear OS', 'SDL'],
        features: [
            'Renderização precisa preservando física e timing original',
            'Overlay tátil padronizado: Topo (L, SELECT, R), Esquerda (B), Direita (A) e Base (START)',
            'Correção de Ghost Tap: D-Pad virtual e área do botão B desacoplados para evitar toques involuntários ao andar',
            'Mapeamento completo do mapa mundi (Yoshi Island) e fases',
            'Baixo consumo de bateria e alta performance',
            'Pacote APK instalável diretamente em smartwatches Wear OS'
        ],
        background: '#E8F8EE',
        githubUrl: 'https://github.com/gusdslara/smw-wearos',
        apkUrl: '/assets/downloads/smw-wearos.apk',
        apkSize: '26.8 MB',
        wearosImages: [
            '/assets/img/apps/wearos/smw-round-controls.png',
            '/assets/img/apps/wearos/smw-round-1.png',
            '/assets/img/apps/wearos/smw-round-map-1.png',
            '/assets/img/apps/wearos/smw-round-3.png'
        ]
    },
    {
        id: 5,
        name: 'Pokémon FireRed (Wear OS)',
        category: ['games', 'software'],
        categories: ['games', 'software'],
        isWearOS: true,
        image: '/assets/img/apps/wearos/pkmn-round-battle-charmander.png',
        caption: 'Port & Recompilação de Pokémon FireRed otimizado para display circular',
        description:
            'Port e recompilação estendida de Pokémon FireRed para relógios Wear OS baseada na engine open-source <a href="https://github.com/bryanthaboi/gen1recomp" target="_blank" rel="noopener noreferrer" class="text-emerald-600 underline font-medium hover:text-emerald-500">gen1recomp</a> (LÖVE2D/Lua). Padronizada rigorosamente com a mesma UI e paleta de alto contraste do SMW, otimizada para diálogos em telas circulares e navegação via aro digital.',
        technologies: ['Lua', 'C', 'Android', 'Wear OS'],
        features: [
            'Padronização de UI idêntica ao SMW: Topo (L, SELECT, R), Esquerda (B), Direita (A) e Base (START)',
            'Gesto direcional e botão B desacoplados sem conflitos ao andar',
            'Renderização e texto ajustados para leitura ergonômica em smartwatch',
            'Navegação rápida em batalhas Pokémon por gestos na tela',
            'Suporte a rotação de menus pela coroa física / aro digital',
            'Sistema de áudio e efeitos sonoros sincronizados'
        ],
        background: '#FFF0F0',
        githubUrl: 'https://github.com/gusdslara/gen1recomp-wearos',
        wearosImages: [
            '/assets/img/apps/wearos/pkmn-round-controls.png',
            '/assets/img/apps/wearos/pkmn-round-pokecenter.png',
            '/assets/img/apps/wearos/pkmn-round-battle-charmander.png',
            '/assets/img/apps/wearos/pkmn-round-oak-dialog.png'
        ]
    }
];

export const tabs: Tab[] = [
    {
        id: 'all',
        label: 'Todos',
        icon: 'M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z'
    },
    {
        id: 'software',
        label: 'Software',
        icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'
    },
    {
        id: 'hardware',
        label: 'Hardware',
        icon: 'M6 4h12v1H6V4zm0 15h12v1H6v-1zm14-7h-1V7h-3V4h-1v3h-2V4h-1v3H9V4H8v3H5v5H4v1h1v2H4v1h1v3h3v3h1v-3h2v3h1v-3h2v3h1v-3h3v-5h1v-1zm-3 5H7V8h10v9z'
    },
    {
        id: '3d',
        label: 'Modelagem 3D',
        icon: 'M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44a.5.5 0 0 1-.57 0l-7.9-4.44A1 1 0 0 1 3.5 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.09.36-.14.57-.14s.41.05.57.14l7.9 4.44c.32.17.53.5.53.88v9zM12 4.14L5.82 7.62 12 11.1l6.18-3.48L12 4.14zM11 19.38l-6-3.38V9.38l6 3.38v6.62zm2 0v-6.62l6-3.38v6.62l-6 3.38z'
    },
    {
        id: 'games',
        label: 'Games',
        icon: 'M15.5 14a1.5 1.5 0 1 0-1.5-1.5 1.5 1.5 0 0 0 1.5 1.5zm3.5-3a1.5 1.5 0 1 0-1.5-1.5 1.5 1.5 0 0 0 1.5 1.5zM21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2z'
    }
];

export const moreProjects: ProjectData[] = [
    {
        id: 'm0',
        name: 'TropicaliaCraft Landing Page',
        category: 'software',
        categories: ['software'],
        image: '/assets/img/apps/tropicalia-landing-1.webp',
        additionalImages: [
            '/assets/img/apps/tropicalia-landing-1.webp',
            '/assets/img/apps/tropicalia-landing-2.webp'
        ],
        color: '#F5F5F0',
        description: 'Landing Page em Angular (SSG) Zoneless + Go/Fiber',
        technologies: ['Angular', 'Go', 'TailwindCSS'],
        features: [
            'Hidratação Zoneless para máxima performance',
            'Server-Side Generation (SSG)',
            'Integração com API RESTful em Go',
            'Design responsivo e acessível'
        ],
        githubUrl: 'https://github.com/gusdslara/ng-tropicaliacraft-landing-page',
        link: 'https://tropicaliacraft.online/'
    },
    {
        id: 'm1',
        name: 'Pantheon Launcher',
        category: 'software',
        image: '/assets/img/logos/phanteon.png',
        color: '#FFE2E2',
        description: 'Landing Page em Svelte',
        technologies: ['Svelte', 'TailwindCSS'],
        githubUrl: 'https://github.com/gusdslara/pantheon-launcher',
        link: 'https://pantheon.gustavolara.pro/'
    },
    {
        id: 'm2',
        name: 'PolyUI',
        category: 'software',
        image: '/assets/img/logos/polyui.png',
        color: '#FFF0E0',
        description: 'Interface Web para IA local',
        technologies: ['Svelte', 'TailwindCSS'],
        githubUrl: 'https://github.com/gusdslara/poly-ui',
        link: 'https://polyui.gustavolara.pro/'
    },
    {
        id: 'm3',
        name: 'Argus Player',
        category: 'software',
        image: '/assets/img/logos/argusplayer.png',
        color: '#E1F0FF',
        description: 'Streaming de mídia local',
        technologies: ['Angular', 'Go'],
        githubUrl: 'https://github.com/gusdslara/argus-player',
        link: 'https://argus.gustavolara.pro/'
    },
    {
        id: 'm4',
        name: 'Voxel Canvas',
        category: 'software',
        image: '/assets/img/logos/voxelcanvas.png',
        color: '#E2F1E7',
        description: 'Paint 3D cúbico interativo',
        technologies: ['ThreeJS', 'Svelte'],
        githubUrl: 'https://github.com/gusdslara/threejs-voxel-canvas',
        link: 'https://voxelcanvas.gustavolara.pro/'
    },
    {
        id: 'm5',
        name: 'World Trips Album',
        category: 'software',
        image: '/assets/img/logos/worldtrip.png',
        color: '#FFF0E0',
        description: 'Album interativo de viagens em 3D',
        technologies: ['Angular', 'ThreeJS'],
        githubUrl: 'https://github.com/gusdslara/ng-threejs-world-trips',
        link: 'https://trips.gustavolara.pro/'
    },
    {
        id: 'm6',
        name: 'WebXR Tour Virtual',
        category: 'software',
        image: '/assets/img/logos/virtualtour.png',
        color: '#E1F0FF',
        description: 'Passeio virtual imersivo',
        technologies: ['ThreeJS', 'WebXR', 'Svelte'],
        githubUrl: 'https://github.com/gusdslara/svelte-threejs-tour-virtual'
    },
    {
        id: 'm10',
        name: 'Tropicalia Server',
        category: 'hardware',
        image: '/assets/img/apps/server.webp',
        color: '#E0FFF4',
        description: 'Infraestrutura de Minecraft',
        technologies: ['Go', 'Docker', 'Azure'],
        link: 'https://tropicaliacraft.online/'
    },
    {
        id: '3d-1',
        name: 'Apple iPad Pro',
        category: '3d',
        image: '/assets/3dmodels/apple_ipad_pro.png',
        color: '#E8EBF0',
        description: 'Modelo 3D detalhado do Apple iPad Pro com texturas PBR e acabamento realista',
        technologies: ['Blender', 'ThreeJS'],
        modelPath: '/assets/3dmodels/apple_ipad_pro.glb'
    },
    {
        id: '3d-2',
        name: 'ASUS ROG RTX 4090',
        category: '3d',
        image: '/assets/3dmodels/asus_rog_geforce_rtx_4090_v2.0.png',
        color: '#EBE4FF',
        description: 'Modelagem da placa de vídeo ASUS ROG GeForce RTX 4090 com detalhes de hardware',
        technologies: ['Blender', 'ThreeJS'],
        modelPath: '/assets/3dmodels/asus_rog_geforce_rtx_4090_v2.0.glb'
    },
    {
        id: '3d-6',
        name: 'MacBook Pro M3 16"',
        category: '3d',
        image: '/assets/3dmodels/macbook_pro_m3_16_inch_2024.png',
        color: '#E8EBF0',
        description: 'Modelo fiel do MacBook Pro M3 16 polegadas 2024 com tela e teclado detalhados',
        technologies: ['Blender', 'ThreeJS'],
        modelPath: '/assets/3dmodels/macbook_pro_m3_16_inch_2024.glb'
    },
    {
        id: '3d-8',
        name: 'Meta Quest 3',
        category: '3d',
        image: '/assets/3dmodels/meta_quest_3.png',
        color: '#EBE4FF',
        description: 'Headset de realidade mista Meta Quest 3 com controladores e detalhes de engenharia',
        technologies: ['Blender', 'ThreeJS'],
        modelPath: '/assets/3dmodels/meta_quest_3.glb'
    },
    {
        id: 'game-1',
        name: 'Crash Team Racing Native (Wear OS)',
        category: ['games', 'software'],
        categories: ['games', 'software'],
        image: '/assets/img/apps/wearos/ctr-round-cove.png',
        color: '#FFF2EB',
        description: 'Port nativo de CTR (PS1) para Smartwatches Wear OS a 60 FPS',
        technologies: ['C', 'SDL', 'Android', 'Wear OS'],
        githubUrl: 'https://github.com/gusdslara/ctr-wearos',
        apkUrl: '/assets/downloads/ctr-wearos.apk',
        apkSize: '11.4 MB',
        isWearOS: true,
        wearosImages: [
            '/assets/img/apps/wearos/ctr-round-controls.png',
            '/assets/img/apps/wearos/ctr-round-cove.png',
            '/assets/img/apps/wearos/ctr-round-boost.png',
            '/assets/img/apps/wearos/ctr-round-trophy.png'
        ],
        features: [
            'Aceleração gráfica nativa via hardware com OpenGL ES a 60 FPS fluidos',
            'Interface e HUD adaptados para display circular de 432x432 (One UI Watch)',
            'Controles clássicos de PlayStation (△, ✕, □, ○, L1/R1, L2/R2) e D-Pad em arco ergonômico',
            'Áudio e trilha sonora original sintetizada em tempo real via SDL3',
            'Sistema de Save State e progresso preservado no armazenamento do smartwatch',
            'Instalação direta via APK compatível com Android Wear OS'
        ]
    },
    {
        id: 'game-2',
        name: 'Super Mario World (Wear OS)',
        category: ['games', 'software'],
        categories: ['games', 'software'],
        image: '/assets/img/apps/wearos/smw-round-1.png',
        color: '#E8F8EE',
        description: 'Super Mario World adaptado nativamente para telas circulares Wear OS',
        technologies: ['C', 'Android', 'Wear OS', 'SDL'],
        githubUrl: 'https://github.com/gusdslara/smw-wearos',
        apkUrl: '/assets/downloads/smw-wearos.apk',
        apkSize: '26.8 MB',
        isWearOS: true,
        wearosImages: [
            '/assets/img/apps/wearos/smw-round-controls.png',
            '/assets/img/apps/wearos/smw-round-1.png',
            '/assets/img/apps/wearos/smw-round-map-1.png',
            '/assets/img/apps/wearos/smw-round-3.png'
        ],
        features: [
            'Renderização precisa preservando física e timing original',
            'Overlay tátil padronizado: Topo (L, SELECT, R), Esquerda (B), Direita (A) e Base (START)',
            'Correção de Ghost Tap: D-Pad virtual e área do botão B desacoplados para evitar toques involuntários ao andar',
            'Mapeamento completo do mapa mundi (Yoshi Island) e fases',
            'Baixo consumo de bateria e alta performance',
            'Pacote APK instalável diretamente em smartwatches Wear OS'
        ]
    },
    {
        id: 'game-3',
        name: 'Pokémon FireRed (Wear OS)',
        category: ['games', 'software'],
        categories: ['games', 'software'],
        image: '/assets/img/apps/wearos/pkmn-round-battle-charmander.png',
        color: '#FFF0F0',
        description: 'Port & Recompilação de Pokémon FireRed para Wear OS',
        technologies: ['Lua', 'C', 'Android', 'Wear OS'],
        githubUrl: 'https://github.com/gusdslara/gen1recomp-wearos',
        isWearOS: true,
        wearosImages: [
            '/assets/img/apps/wearos/pkmn-round-controls.png',
            '/assets/img/apps/wearos/pkmn-round-pokecenter.png',
            '/assets/img/apps/wearos/pkmn-round-battle-charmander.png',
            '/assets/img/apps/wearos/pkmn-round-oak-dialog.png'
        ],
        features: [
            'Padronização de UI idêntica ao SMW: Topo (L, SELECT, R), Esquerda (B), Direita (A) e Base (START)',
            'Gesto direcional e botão B desacoplados sem conflitos ao andar',
            'Renderização e texto ajustados para leitura ergonômica em smartwatch',
            'Navegação rápida em batalhas Pokémon por gestos na tela',
            'Suporte a rotação de menus pela coroa física / aro digital',
            'Sistema de áudio e efeitos sonoros sincronizados'
        ]
    }
];
