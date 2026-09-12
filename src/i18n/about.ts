import type { Locale } from './config';

const about = {
	es: {
		title: 'Sobre mí',
		description:
			'Cómo nació Evangelio del día: una aplicación para facilitar la lectura diaria del Evangelio y sus comentarios.',
		heading: 'Sobre mí',
		lead: 'El origen de Evangelio del día y por qué existe esta aplicación.',
		p1: 'La lectura diaria del Evangelio es una práctica que me ha ayudado a mantener presente al Señor en mi día a día y a profundizar en mi fe. Sin embargo, no siempre me ha resultado fácil ser constante. Por eso empecé a recurrir a comentarios sobre las lecturas publicados por distintas organizaciones.',
		p2: 'De ahí nació la idea de crear una aplicación que facilitara el acceso a las lecturas diarias junto con sus respectivos comentarios. A partir de ese momento fueron surgiendo nuevas ideas y recomendaciones de personas de mi entorno, que han contribuido a que la aplicación llegue hasta donde está hoy.',
	},
	ca: {
		title: 'Sobre mi',
		description:
			"Com va néixer Evangeli del dia: una aplicació per facilitar la lectura diària de l'Evangeli i els seus comentaris.",
		heading: 'Sobre mi',
		lead: "L'origen d'Evangeli del dia i per què existeix aquesta aplicació.",
		p1: "La lectura diària de l'Evangeli és una pràctica que m'ha ajudat a mantenir present el Senyor en el meu dia a dia i a aprofundir en la meva fe. Tanmateix, no sempre m'ha resultat fàcil ser constant. Per això vaig començar a recórrer a comentaris sobre les lectures publicats per diferents organitzacions.",
		p2: "D'aquí va néixer la idea de crear una aplicació que facilités l'accés a les lectures diàries juntament amb els seus respectius comentaris. A partir d'aquell moment van anar sorgint noves idees i recomanacions de persones del meu entorn, que han contribuït que l'aplicació arribi fins on és avui.",
	},
} as const;

export function getAbout(locale: Locale) {
	return about[locale];
}
