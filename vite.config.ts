import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__SVELTEKIT_APP_VERSION__: JSON.stringify('1.0.0')
	},
	server: {
		watch: {
			ignored: ['**/docs/**']
		}
	},
	build: {
		target: 'es2022',
		cssMinify: true,
		minify: 'esbuild',
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules/three') || id.includes('three/examples')) {
						return 'three-vendor';
					}
					if (id.includes('node_modules/gsap')) {
						return 'gsap-vendor';
					}
				}
			}
		}
	}
});
