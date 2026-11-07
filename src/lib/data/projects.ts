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
        name: 'ng-tropicaliacraft-landingpage',
        category: 'software',
        image: '/assets/img/apps/tropicalia.webp',
        caption:
            'Landing Page para o TropicaliaCraft em Angular (SSG) com hidratação zoneless + Serviços em Go/Fiber',
        description:
            'Landing page de alta performance construída com Angular moderno utilizando hidratação zoneless e Server-Side Generation (SSG). Inclui integração com serviços backend em Go usando Fiber para gerenciar os dados dinâmicos do servidor de Minecraft.',
        technologies: ['Angular', 'Go', 'TailwindCSS'],
        features: [
            'Hidratação Zoneless para máxima performance',
            'Server-Side Generation (SSG)',
            'Integração com API RESTful em Go',
            'Design responsivo e acessível'
        ],
        background: '#F5F5F0',
        link: 'https://tropicaliacraft.online/',
        githubUrl: 'https://github.com/gusdslara/ng-tropicaliacraft-landing-page',
        additionalImages: []
    },
    {
        id: 2,
        name: 'svelte-threejs-tech-store',
        category: 'software',
        image: '/assets/img/apps/techstore.webp',
        caption: 'Landing Page em SvelteKit e TailwindCSS + Animações com GSAP e Three.js',
        description:
            'Loja virtual tecnológica e interativa desenvolvida com SvelteKit. Combina a fluidez do TailwindCSS com animações complexas controladas pelo GSAP e visualizações 3D imersivas renderizadas via Three.js.',
        technologies: ['Svelte', 'TailwindCSS', 'ThreeJS', 'Vite'],
        features: [
            'Visualização de produtos em 3D interativo',
            'Animações suaves baseadas em scroll (GSAP ScrollTrigger)',
            'Arquitetura SvelteKit com transições rápidas',
            'Layout moderno e responsivo'
        ],
        background: '#FFF0E0',
        link: 'https://techstore.gustavolara.pro/',
        githubUrl: 'https://github.com/gusdslara/svelte-threejs-tech-store',
        additionalImages: []
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
        id: '3d-3',
        name: 'Bird Orange',
        category: '3d',
        image: '/assets/3dmodels/bird_orange.png',
        color: '#FFF0E0',
        description: 'Modelo estilizado de pássaro laranja com texturização artística',
        technologies: ['Blender', 'ThreeJS'],
        modelPath: '/assets/3dmodels/bird_orange.glb'
    },
    {
        id: '3d-4',
        name: 'Destiny 2 Character Bust',
        category: '3d',
        image: '/assets/3dmodels/destiny_2_character_bust.png',
        color: '#EBE4FF',
        description: 'Busto de personagem inspirado no universo Destiny 2 com detalhes de armadura',
        technologies: ['Blender', 'ThreeJS'],
        modelPath: '/assets/3dmodels/destiny_2_character_bust.glb'
    },
    {
        id: '3d-5',
        name: 'iPhone 17 Pro Max',
        category: '3d',
        image: '/assets/3dmodels/iphone_17_pro_max.png',
        color: '#E8EBF0',
        description: 'Conceito 3D do iPhone 17 Pro Max com materiais metálicos e vidro realistas',
        technologies: ['Blender', 'ThreeJS'],
        modelPath: '/assets/3dmodels/iphone_17_pro_max.glb'
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
        id: '3d-7',
        name: 'Medieval Fantasy Book',
        category: '3d',
        image: '/assets/3dmodels/medieval_fantasy_book.png',
        color: '#F5F5F0',
        description: 'Livro de fantasia medieval com texturização detalhada de couro e páginas envelhecidas',
        technologies: ['Blender', 'ThreeJS'],
        modelPath: '/assets/3dmodels/medieval_fantasy_book.glb'
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
        id: '3d-9',
        name: 'Samsung Galaxy S25 Ultra',
        category: '3d',
        image: '/assets/3dmodels/s_amsung_galaxy_s25_ultra_galaxy.png',
        color: '#E8EBF0',
        description: 'Modelo 3D do Samsung Galaxy S25 Ultra com câmeras e acabamentos premium',
        technologies: ['Blender', 'ThreeJS'],
        modelPath: '/assets/3dmodels/s_amsung_galaxy_s25_ultra_galaxy.glb'
    },
    {
        id: '3d-10',
        name: 'Steam Deck',
        category: '3d',
        image: '/assets/3dmodels/steam_deck_console.png',
        color: '#E8EBF0',
        description: 'Console portátil Steam Deck com botões, thumbsticks e tela detalhados',
        technologies: ['Blender', 'ThreeJS'],
        modelPath: '/assets/3dmodels/steam_deck_console.glb'
    },
    {
        id: 'game-1',
        name: 'Cyber Run',
        category: 'games',
        image: '/assets/img/apps/techstore.webp',
        color: '#FFE2E2',
        description: 'Jogo de corrida infinita com tema cyberpunk',
        technologies: ['Unity', 'C#'],
        link: 'https://itch.io/jam/example-game'
    },
    {
        id: 'game-2',
        name: 'Space Explorer',
        category: 'games',
        image: '/assets/img/apps/techstore.webp',
        color: '#E1F0FF',
        description: 'Exploração espacial em 2D com elementos de survival',
        technologies: ['PixiJS', 'TypeScript'],
        link: 'https://store.steampowered.com/'
    }
];
