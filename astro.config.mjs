// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://evangelium-web.netlify.app',
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'ca'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
