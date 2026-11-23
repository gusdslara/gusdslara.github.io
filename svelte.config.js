import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		prerender: {
			// Local-only tolerance: the tropicaliacraft APK is gitignored and lives on the VPS.
			// Missing APKs are warned about instead of failing the prerender. Other errors still fail.
			handleHttpError: ({ status, path, message }) => {
				if (path.endsWith('.apk')) {
					console.warn(`[prerender] ignoring ${status} for ${path} (APK not available locally)`);
					return;
				}
				throw new Error(message);
			}
		},
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: '404.html',
			precompress: false,
			strict: true
		})
	}
};

export default config;
