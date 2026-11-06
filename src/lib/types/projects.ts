export interface ClientApp {
    id: string;
    name: string;
    image: string;
    link: string;
    description: string;
    role: string;
    year: string;
    technologies: string[];
    features: string[];
    stackImages: string[];
    stackImageNames: string[];
    backgroundColor: string;
    titleColor?: string;
    type: 'desktop' | 'desktop-left' | 'mobile';
    phoneImages: string[];
    additionalImages?: string[];
}

export interface MyApp {
    id: number;
    name: string;
    category?: string;
    image: string;
    caption: string;
    description: string;
    technologies: string[];
    features: string[];
    background: string;
    link?: string;
    githubUrl?: string;
    additionalImages?: string[];
}

export interface Tab {
    id: string;
    label: string;
    icon: string;
}

export interface ProjectData {
    id: string;
    name: string;
    category: string;
    image: string;
    color: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    link?: string;
    modelPath?: string;
}
