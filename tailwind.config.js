/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
				display: ['Outfit', 'sans-serif']
			},
			colors: {
				primary: {
					DEFAULT: '#dd206b',
					50: '#fef2f7',
					100: '#fee5f0',
					200: '#fccce3',
					300: '#faa3cd',
					400: '#f66bab',
					500: '#dd206b',
					600: '#c01252',
					700: '#9f1244',
					800: '#85143c',
					900: '#6d1232'
				}
			}
		}
	},
	plugins: []
};
