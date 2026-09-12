import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLocale, routes, type Locale, type RouteKey } from './config';

const ui = {
	es: {
		brand: 'Evangelio del día',
		subtitle: 'Lecturas y comentarios litúrgicos',
		navAria: 'Principal',
		navPrivacy: 'Privacidad',
		navAbout: 'Sobre mí',
		navDonate: 'Donaciones',
		langAria: 'Idioma',
		langEs: 'ES',
		langCa: 'CA',
		footerPrivacy: 'Política de privacidad',
		footerAbout: 'Sobre mí',
		footerDonate: 'Donaciones',
	},
	ca: {
		brand: 'Evangeli del dia',
		subtitle: 'Lectures i comentaris litúrgics',
		navAria: 'Principal',
		navPrivacy: 'Privacitat',
		navAbout: 'Sobre mi',
		navDonate: 'Donacions',
		langAria: 'Idioma',
		langEs: 'ES',
		langCa: 'CA',
		footerPrivacy: 'Política de privacitat',
		footerAbout: 'Sobre mi',
		footerDonate: 'Donacions',
	},
} as const;

export type UiStrings = (typeof ui)[Locale];

export function getUi(locale: Locale): UiStrings {
	return ui[locale];
}

export function localePath(locale: Locale, route: RouteKey = 'home'): string {
	const path = routes[route];
	return getRelativeLocaleUrl(locale, path);
}

export function alternateLocale(locale: Locale): Locale {
	return locale === 'es' ? 'ca' : 'es';
}

export function detectLocaleFromUrl(pathname: string): Locale {
	const segment = pathname.split('/').filter(Boolean)[0];
	return segment === 'ca' ? 'ca' : defaultLocale;
}
