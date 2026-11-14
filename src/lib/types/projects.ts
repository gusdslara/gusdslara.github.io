export interface ClientApp {
    id: string;
    name: string;
    image: string;
    link?: string;
    description: string;
    role: string;
    year: string;
    myRole?: string;
    about?: string;
    technologies: string[];
    features: string[];
    stackImages: string[];
    stackImageNames: string[];
    backgroundColor: string;
    titleColor?: string;
    type: 'desktop' | 'desktop-left' | 'mobile';
    secondaryInFront?: boolean;
    phoneImages: string[];
    additionalImages?: string[];
}

export interface MyApp {
    id: number;
    name: string;
    category?: string | string[];
    categories?: string[];
    image: string;
    caption: string;
    description: string;
    role?: string;
    year?: string;
    myRole?: string;
    about?: string;
    technologies: string[];
    features: string[];
    background: string;
    link?: string;
    githubUrl?: string;
    apkUrl?: string;
    apkSize?: string;
    isWearOS?: boolean;
    wearosImages?: string[];
    additionalImages?: string[];
    phoneImages?: string[];
}

export interface Tab {
    id: string;
    label: string;
    icon: string;
}

export interface ModelVariant {
    id: string;
    label: string;
    path: string;
}

export interface ProjectData {
    id: string;
    name: string;
    category?: string | string[];
    categories?: string[];
    image: string;
    modalImage?: string;
    color: string;
    description: string;
    role?: string;
    year?: string;
    myRole?: string;
    about?: string;
    technologies: string[];
    features?: string[];
    githubUrl?: string;
    link?: string;
    apkUrl?: string;
    apkSize?: string;
    isWearOS?: boolean;
    wearosImages?: string[];
    additionalImages?: string[];
    modelPath?: string;
    modelVariants?: ModelVariant[];
    modelCategory?: 'zombies' | 'survivors' | 'safehouse' | 'general';
}
