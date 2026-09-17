import type { Locale } from './config';

const donate = {
	es: {
		title: 'Donaciones',
		description:
			'Colabora con Evangelium para mantener y mejorar la aplicación Evangelio del día.',
		heading: 'Donaciones',
		lead: 'Un espacio para quienes quieran apoyar el mantenimiento y la mejora del proyecto.',
		p1: 'Evangelium no pretende generar beneficios económicos ni convertirse en un proyecto rentable. Es una iniciativa personal que he querido compartir para aportar mi pequeño grano de arena.',
		p2: 'Aun así, me gustaría ofrecer un espacio para que quienes quieran y puedan colaborar ayuden a mantener y mejorar el proyecto, así como a alcanzar objetivos que, sin apoyo económico, serían difíciles o imposibles de conseguir. Uno de ellos es publicar la aplicación en iOS, lo que supone un coste de aproximadamente 100 € al año.',
		p3: 'Toda ayuda será bienvenida y se destinará única y exclusivamente al desarrollo, mantenimiento y mejora de Evangelium.',
		amountLabel: 'Importe de la donación',
		placeholder: '0,00',
		submit: 'Donar',
		submitting: 'Redirigiendo…',
		hint: 'Pago único seguro procesado por Stripe. Mínimo 0,50 €.',
		errorMin: 'Introduce un importe de al menos 0,50 €.',
		errorMax: 'El importe máximo es 10.000 €.',
		errorGeneric: 'No se pudo iniciar el pago. Inténtalo de nuevo.',
		errorStart: 'No se pudo iniciar el pago.',
		thanksTitle: 'Gracias por tu donación',
		thanksDescription:
			'Gracias por apoyar Evangelium y el desarrollo de Evangelio del día.',
		thanksHeading: 'Gracias',
		thanksLead: 'Tu donación se ha recibido correctamente.',
		thanksBody:
			'Muchas gracias por tu generosidad. Tu ayuda se destinará exclusivamente al desarrollo, mantenimiento y mejora de Evangelium.',
		thanksBack: 'Volver a donaciones',
		stripeProductName: 'Donación a Evangelium',
		stripeProductDescription:
			'Apoyo al desarrollo, mantenimiento y mejora de Evangelio del día',
	},
	ca: {
		title: 'Donacions',
		description:
			"Col·labora amb Evangelium per mantenir i millorar l'aplicació Evangeli del dia.",
		heading: 'Donacions',
		lead: 'Un espai per a qui vulgui donar suport al manteniment i a la millora del projecte.',
		p1: "Evangelium no pretén generar beneficis econòmics ni convertir-se en un projecte rentable. És una iniciativa personal que he volgut compartir per aportar el meu petit gra de sorra.",
		p2: "Així i tot, m'agradaria oferir un espai perquè qui vulgui i pugui col·laborar ajudin a mantenir i millorar el projecte, així com a assolir objectius que, sense suport econòmic, serien difícils o impossibles d'aconseguir. Un d'ells és publicar l'aplicació a iOS, la qual cosa comporta un cost d'aproximadament 100 € a l'any.",
		p3: "Tota ajuda serà benvinguda i es destinarà única i exclusivament al desenvolupament, manteniment i millora d'Evangelium.",
		amountLabel: 'Import de la donació',
		placeholder: '0,00',
		submit: 'Donar',
		submitting: 'Redirigint…',
		hint: 'Pagament únic segur processat per Stripe. Mínim 0,50 €.',
		errorMin: "Introdueix un import d'almenys 0,50 €.",
		errorMax: "L'import màxim és 10.000 €.",
		errorGeneric: "No s'ha pogut iniciar el pagament. Torna-ho a provar.",
		errorStart: "No s'ha pogut iniciar el pagament.",
		thanksTitle: 'Gràcies per la teva donació',
		thanksDescription:
			"Gràcies per donar suport a Evangelium i al desenvolupament d'Evangeli del dia.",
		thanksHeading: 'Gràcies',
		thanksLead: "La teva donació s'ha rebut correctament.",
		thanksBody:
			"Moltes gràcies per la teva generositat. La teva ajuda es destinarà exclusivament al desenvolupament, manteniment i millora d'Evangelium.",
		thanksBack: 'Tornar a donacions',
		stripeProductName: 'Donació a Evangelium',
		stripeProductDescription:
			"Suport al desenvolupament, manteniment i millora d'Evangeli del dia",
	},
} as const;

export function getDonate(locale: Locale) {
	return donate[locale];
}
