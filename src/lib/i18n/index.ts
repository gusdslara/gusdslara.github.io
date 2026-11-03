import { writable, derived } from 'svelte/store';
import { translations, type Language } from './dictionaries';

function getInitialLanguage(): Language {
    if (typeof window === 'undefined') return 'en'; // SSR fallback
    
    // Check localStorage first (manual override)
    const stored = localStorage.getItem('user_language') as Language;
    if (stored && ['en', 'pt', 'es'].includes(stored)) {
        return stored;
    }

    // Auto-detect from browser
    const browserLang = navigator.language.toLowerCase();
    
    if (browserLang.startsWith('pt')) return 'pt'; // Brasil, Portugal, Macau, Angola, etc
    if (browserLang.startsWith('es')) return 'es'; // Spanish speakers
    
    return 'en'; // Default
}

// Create the active locale store
export const locale = writable<Language>('en'); // Will be updated on client mount

// Update locale on mount
if (typeof window !== 'undefined') {
    locale.set(getInitialLanguage());
    
    // Persist changes
    locale.subscribe(value => {
        localStorage.setItem('user_language', value);
        // Optional: you can update document.documentElement.lang here
        document.documentElement.lang = value;
    });
}

// Function to resolve nested keys like "home.about.title"
function resolvePath(obj: any, path: string): any {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
        if (current === undefined || current === null) return null;
        current = current[key];
    }
    return current;
}

// Derived store to get the translation function
export const t = derived(locale, ($locale) => {
    return (key: string, vars?: Record<string, any> & { default?: any }) => {
        const dict = translations[$locale] || translations['en'];
        let value = resolvePath(dict, key);
        
        if (value === null || value === undefined) {
            // Fallback to English if translation is missing
            value = resolvePath(translations['en'], key);
        }

        if (value === null || value === undefined) {
            return vars?.default !== undefined ? vars.default : key;
        }

        // Handle simple variable interpolation (e.g., {name})
        if (typeof value === 'string' && vars) {
            let text = value;
            for (const [k, v] of Object.entries(vars)) {
                if (k !== 'default') {
                    text = text.replace(new RegExp(`{${k}}`, 'g'), String(v));
                }
            }
            return text;
        }
        
        return value;
    };
});
