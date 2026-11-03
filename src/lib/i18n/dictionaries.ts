import { en } from './locales/en';
import { pt } from './locales/pt';
import { es } from './locales/es';

export type Language = 'en' | 'pt' | 'es';

export const translations: Record<Language, any> = {
    en,
    pt,
    es
};
