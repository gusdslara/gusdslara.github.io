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
        id: 2,
        name: 'Meu Tempero! — Cuiabá',
        category: ['games', 'software', '3d'],
        categories: ['games', 'software', '3d'],
        image: '/assets/img/apps/meutempero-gameplay.webp',
        caption:
            'Simulador 3D Culinário & Gestão em Svelte 5, Three.js (WebGPU) e Tauri v2',
        description:
            'Jogo 3D aconchegante que combina a intensidade de Overcooked com o ritmo acolhedor de Stardew Valley e a personalização de Café Mania. Ambientado no coração de Cuiabá (Mato Grosso), o jogador assume a histórica Cantina da Vó Adelaide: cuida da horta no quintal, colhe mangas, prepara ingredientes na despensa com limite físico de peso/volume, atende clientes no salão, despacha entregas via iFome para motoboys e viaja de ônibus urbano (Linha 605) até o Mercado do Porto.',
        technologies: ['Svelte', 'Three.js', 'TypeScript', 'TailwindCSS', 'Tauri', 'Rust'],
        features: [
            'Preparo Físico & Despensa Realista: Ingredientes com peso (kg) e volume (L), sem caixotes mágicos em geladeiras e prateleiras',
            'Minigame de Corte em 1ª Pessoa: Faca controlada por mouse/toque fatiando legumes e carnes com espessura dinâmica',
            'Estações Culinárias Diversificadas: Tábua de corte, frigideira com sacudimento, panela de pressão, pilão socável e forno de barro',
            'Cardápio Tradicional Cuiabano: Arroz Maria Isabel em lote, mujica de pintado, ventrecha de pacu, bolo de arroz e refresco de caju',
            'Ciclo Dia/Noite & Clima Determinístico: Amanhecer às 5h40, calor cuiabano, temporais de verão com poças reflexivas e anoitecer dinâmico',
            'Rua Beira-Rio Viva & Ônibus Urbano: Passantes com rotina própria, Seu Lourival e seu carrinho de picolé, vira-lata Caramelo e ônibus Marcopolo Torino',
            'Motor Gráfico Three.js + WebGPU: Curvatura esférica de mundo estilo Animal Crossing com fallback automático para WebGL',
            'Interface Liquid Glass & Multiplataforma: Design translúcido responsivo com suporte a toque/joystick e build nativo em Tauri v2 (Rust)'
        ],
        background: '#FFF7EA',
        link: 'https://meutempero.gustavolara.pro/',
        githubUrl: 'https://github.com/gusdslara/svelte-threejs-overcooked-cuiaba',
        additionalImages: [
            '/assets/img/apps/meutempero-kitchen.webp',
            '/assets/img/apps/meutempero-catedral.webp',
            '/assets/img/apps/meutempero-minigame.webp',
            '/assets/img/apps/meutempero-mercado.webp'
        ]
    },
    {
        id: 6,
        name: 'Deadly Bite (Bitez)',
        category: ['games', 'software'],
        categories: ['games', 'software'],
        image: '/assets/img/apps/bitez-gameplay.webp',
        caption:
            'Hardcore Multiplayer Zombie Survival Roguelike em Svelte, Three.js & Mapa Real OpenStreetMap',
        description:
            'Hardcore survival roguelike multiplayer 3D em tempo real construído com Svelte e Three.js. Inspirado em clássicos de sobrevivência como DayZ e Left 4 Dead, o jogo apresenta um mundo persistente onde seu sobrevivente permanece no mapa mesmo após o logout (o sono é a maior vulnerabilidade). Conta com integração inovadora de mapas reais via OpenStreetMap e Overture Maps, cobrindo todo o Brasil e América Latina em escala 1:1 com geração procedural em estilo retrô low-poly/PSX.',
        technologies: ['Svelte', 'Three.js', 'TypeScript', 'Go', 'WebSocket', 'WebRTC'],
        features: [
            'Mundo Real em Escala 1:1 (Brasil e América Latina): Spawn em qualquer coordenada real via OpenStreetMap com ruas e prédios exploráveis',
            'Mundo Persistente & Sobrevivência Real-Time: Seu personagem permanece no local ao deslogar; ciclo contínuo de fome, sede, infecção e cura',
            'Múltiplos Modos de Jogo: Campanha Singleplayer com história, Sobrevivência Zumbi MMO, Desarme de Bomba competitivo e Roguelike Top-Down',
            'Modo Split-Screen Local (2 Jogadores): Suporte a tela dividida no mesmo computador com suporte nativo a múltiplos gamepads',
            'Sistema Tático de Armas & Balística: Arsenal completo com recuo, dispersão, slots de inventário físico, granadas e estações de fabricação',
            'Construção & Fortificação de Bases: Barricadas, portas com permissões de acesso e proteção de refúgios contra hordas noturnas',
            'Customização 3D de Sobrevivente: Estúdio completo de personalização de personagens em Three.js (roupas, chapéus, acessórios e tons de pele)',
            'Rede Híbrida de Alta Concorrência: Backend em Go com WebSockets e conexões P2P WebRTC via PeerJS para latência ultrabaixa'
        ],
        background: '#F4ECEC',
        link: 'https://bitez.gustavolara.pro/',
        githubUrl: 'https://github.com/gusdslara/pixelz-svelte-threejs-game',
        additionalImages: [
            '/assets/img/apps/bitez-gameplay.webp',
            '/assets/img/apps/bitez-house-inside.webp',
            '/assets/img/apps/bitez-tank.webp',
            '/assets/img/apps/bitez-arsenal.webp',
            '/assets/img/apps/bitez-customizer.webp'
        ]
    },
    {
        id: 1,
        name: 'Tropicalia Launcher',
        category: ['software', 'games'],
        categories: ['software', 'games'],
        image: '/assets/img/apps/tropicalia-launcher-app.webp',
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
        link: 'https://tropicaliacraft.gustavolara.pro/downloads',
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
            'Port nativo de alto desempenho para smartwatches Wear OS (Galaxy Watch / One UI Watch), baseado no projeto open-source <a href="https://github.com/Simon358/ctr-native-android" target="_blank" rel="noopener noreferrer" class="text-emerald-600 underline font-medium hover:text-emerald-500">ctr-native-android</a>. Desenvolvido em C com aceleração SDL3 e OpenGL ES 60 FPS, adaptado especificamente para telas circulares de 432x432 px com controles PlayStation em arco e D-pad central.',
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
        link: 'https://tropicaliacraft.gustavolara.pro/'
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
        id: 'm10',
        name: 'Tropicalia Server',
        category: 'hardware',
        image: '/assets/img/apps/server.webp',
        color: '#E0FFF4',
        description: 'Infraestrutura de Minecraft',
        technologies: ['Go', 'Docker', 'Azure'],
        link: 'https://tropicaliacraft.gustavolara.pro/'
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
        id: '3d-cuiaba-catedral',
        name: 'Catedral Basílica de Cuiabá',
        category: '3d',
        image: '/assets/3dmodels/cuiaba-catedral-bom-jesus.png',
        color: '#FFF5EB',
        description: 'Catedral completa: torres com relógios e cruzes, paredes com cobogós e vitrais coloridos, telhado hip roof e interior com mosaico e altar',
        technologies: ['ThreeJS', 'TypeScript'],
        modelPath: '/assets/3dmodels/cuiaba-catedral-bom-jesus.glb'
    },
    {
        id: '3d-cuiaba-palacio',
        name: 'Palácio da Instrução',
        category: '3d',
        image: '/assets/3dmodels/cuiaba-palacio-da-instrucao.png',
        color: '#E8F4F8',
        description: 'Palácio com todas as venezianas louvre brancas, arcos neoclássicos, portões trabalhados, balaustradas e bandeiras',
        technologies: ['ThreeJS', 'TypeScript'],
        modelPath: '/assets/3dmodels/cuiaba-palacio-da-instrucao.glb'
    },
    {
        id: '3d-cuiaba-onibus',
        name: 'Ônibus Urbano de Cuiabá',
        category: '3d',
        image: '/assets/3dmodels/cuiaba-onibus-urbano.png',
        color: '#E8F8EE',
        description: 'Ônibus urbano oficial de Cuiabá (Linha 605) com pintura verde/amarela, letreiro LED, interior com catraca e assentos',
        technologies: ['ThreeJS', 'TypeScript'],
        modelPath: '/assets/3dmodels/cuiaba-onibus-urbano.glb'
    },
    {
        id: '3d-cuiaba-casario',
        name: 'Casario Histórico Cuiabano',
        category: '3d',
        image: '/assets/3dmodels/cuiaba-casario-historico-row.png',
        color: '#FEF9C3',
        description: 'Conjunto completo dos 3 casarões tradicionais cuiabanos geminados com platibanda decorada e beiral com telhas capa-e-canal',
        technologies: ['ThreeJS', 'TypeScript'],
        modelPath: '/assets/3dmodels/cuiaba-casario-historico-row.glb'
    },
    {
        id: '3d-bitez-zombies',
        name: 'Deadly Bite: Inimigos & Zumbis',
        category: '3d',
        categories: ['3d', 'games'],
        image: '/assets/3dmodels/bitez/thumb-zombies.webp',
        color: '#FFE4E6',
        description: 'Variantes de mortos-vivos (Walker, Tank, Boomer, Hunter, Crawler) com animações esqueléticas e rig procedural',
        technologies: ['ThreeJS', 'GLSL', 'TypeScript', 'Blender'],
        features: [
            '5 variantes com mecânicas e animações exclusivas (Walker, Tank colossal, Boomer tóxico, Hunter ágil e Crawler rastejante)',
            'Filtro retrô com Depth-Priority Supersampling shader com priorização de silhueta',
            'Combate interativo: clique direto no modelo 3D para disparar ataques e reações',
            'Seletor manual de animações com interpolação suave (cross-fade)'
        ],
        modelPath: '/assets/3dmodels/bitez/zombie-walker.glb',
        modelCategory: 'zombies',
        modelVariants: [
            { id: 'walker', label: 'Walker (Clássico)', path: '/assets/3dmodels/bitez/zombie-walker.glb' },
            { id: 'tank', label: 'Tank (Bruto)', path: '/assets/3dmodels/bitez/zombie-tank.glb' },
            { id: 'boomer', label: 'Boomer (Tóxico)', path: '/assets/3dmodels/bitez/zombie-boomer.glb' },
            { id: 'hunter', label: 'Hunter (Caçador)', path: '/assets/3dmodels/bitez/zombie-hunter.glb' },
            { id: 'crawler', label: 'Crawler (Rastejante)', path: '/assets/3dmodels/bitez/zombie-crawler.glb' }
        ],
        link: 'https://bitez.gustavolara.pro/',
        githubUrl: 'https://github.com/gusdslara/pixelz-svelte-threejs-game'
    },
    {
        id: '3d-bitez-survivors',
        name: 'Deadly Bite: Sobreviventes',
        category: '3d',
        categories: ['3d', 'games'],
        image: '/assets/3dmodels/bitez/thumb-survivors.webp',
        color: '#E0F2FE',
        description: 'Sobreviventes masculinos e femininos com equipamento militar tático, rigging completo e animações de ação',
        technologies: ['ThreeJS', 'GLSL', 'TypeScript', 'Blender'],
        features: [
            'Sobrevivente Masculino com farda tática e Feminina com camisa xadrez e mochila militar',
            'Pipeline visual Pixel Art com amostragem 2× e controle de profundidade',
            'Conjunto completo de animações: Walk, Run, Jump, Melee Punch, Melee Axe e Reload',
            'Clique interativo para desferir socos e golpes de machado'
        ],
        modelPath: '/assets/3dmodels/bitez/character-survivor-male.glb',
        modelCategory: 'survivors',
        modelVariants: [
            { id: 'male', label: 'Sobrevivente Masculino', path: '/assets/3dmodels/bitez/character-survivor-male.glb' },
            { id: 'female', label: 'Sobrevivente Feminina', path: '/assets/3dmodels/bitez/character-survivor-female.glb' }
        ],
        link: 'https://bitez.gustavolara.pro/',
        githubUrl: 'https://github.com/gusdslara/pixelz-svelte-threejs-game'
    },
    {
        id: '3d-bitez-safehouse',
        name: 'Deadly Bite: Construção & Safehouse',
        category: '3d',
        categories: ['3d', 'games'],
        image: '/assets/3dmodels/bitez/thumb-safehouse.webp',
        color: '#FEF3C7',
        description: 'Safehouse mobiliada completa com ciclo animado contínuo com teto e interior mobiliado, portas articuladas e showroom de móveis',
        technologies: ['ThreeJS', 'GLSL', 'TypeScript', 'Blender'],
        features: [
            'Safehouse com 3 cômodos mobiliados: Sala, Cozinha, Quarto e Banheiro detalhados',
            'Ciclo contínuo automático: abre e fecha portas com o teto, eleva o teto e abre todo o interior mobiliado',
            'Opções de controle manual: Ciclo Automático, Manter Aberto (visão interna) ou Manter Fechado',
            'Showroom com os 8 móveis funcionais e expositor do arsenal com 16 armas militares'
        ],
        modelPath: '/assets/3dmodels/bitez/building-safehouse-interior.glb',
        modelCategory: 'safehouse',
        modelVariants: [
            { id: 'safehouse', label: '🏠 Safehouse Completa', path: '/assets/3dmodels/bitez/building-safehouse-interior.glb' },
            { id: 'showroom', label: '🪑 Showroom de Móveis', path: '/assets/3dmodels/bitez/furniture-showroom.glb' },
            { id: 'arsenal', label: '🔫 Rack de Armas', path: '/assets/3dmodels/bitez/guns-arsenal-rack.glb' }
        ],
        link: 'https://bitez.gustavolara.pro/',
        githubUrl: 'https://github.com/gusdslara/pixelz-svelte-threejs-game'
    }
];
