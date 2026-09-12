export const locales = ['es', 'ca'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}

/** Rutas internas sin prefijo de idioma (como en `src/pages`). */
export const routes = {
	home: '',
	about: 'sobre-mi',
	donate: 'donaciones',
	donateThanks: 'donaciones/gracias',
} as const;

export type RouteKey = keyof typeof routes;
