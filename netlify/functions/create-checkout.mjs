import Stripe from 'stripe';

const MIN_AMOUNT_CENTS = 50; // 0,50 €
const MAX_AMOUNT_CENTS = 1_000_000; // 10.000 €

const copy = {
	es: {
		methodNotAllowed: 'Método no permitido',
		unavailable: 'El servicio de donaciones no está disponible',
		invalidRequest: 'Solicitud inválida',
		invalidAmount: 'Introduce un importe válido',
		minAmount: 'El importe mínimo es 0,50 €',
		maxAmount: 'El importe máximo es 10.000 €',
		startFailed: 'No se pudo iniciar el pago',
		startFailedRetry: 'No se pudo iniciar el pago. Inténtalo de nuevo.',
		productName: 'Donación a Evangelium',
		productDescription:
			'Apoyo al desarrollo, mantenimiento y mejora de Evangelio del día',
		stripeLocale: 'es',
		donatePath: '/donaciones/',
		thanksPath: '/donaciones/gracias/',
	},
	ca: {
		methodNotAllowed: 'Mètode no permès',
		unavailable: 'El servei de donacions no està disponible',
		invalidRequest: 'Sol·licitud no vàlida',
		invalidAmount: 'Introdueix un import vàlid',
		minAmount: "L'import mínim és 0,50 €",
		maxAmount: "L'import màxim és 10.000 €",
		startFailed: "No s'ha pogut iniciar el pagament",
		startFailedRetry: "No s'ha pogut iniciar el pagament. Torna-ho a provar.",
		productName: 'Donació a Evangelium',
		productDescription:
			"Suport al desenvolupament, manteniment i millora d'Evangeli del dia",
		stripeLocale: 'ca',
		donatePath: '/ca/donaciones/',
		thanksPath: '/ca/donaciones/gracias/',
	},
};

/**
 * @param {import('@netlify/functions').HandlerEvent} event
 * @returns {Promise<import('@netlify/functions').HandlerResponse>}
 */
export async function handler(event) {
	if (event.httpMethod === 'OPTIONS') {
		return {
			statusCode: 204,
			headers: corsHeaders(),
			body: '',
		};
	}

	let locale = 'es';
	try {
		const preview = JSON.parse(event.body || '{}');
		if (preview.locale === 'ca') locale = 'ca';
	} catch {
		/* ignore; validated below */
	}
	const t = copy[locale];

	if (event.httpMethod !== 'POST') {
		return json(405, { error: t.methodNotAllowed });
	}

	const secretKey = process.env.STRIPE_SECRET_KEY;
	if (!secretKey) {
		console.error('STRIPE_SECRET_KEY no está configurada');
		return json(500, { error: t.unavailable });
	}

	let amountEuros;
	try {
		const body = JSON.parse(event.body || '{}');
		amountEuros = Number(body.amount);
		if (body.locale === 'ca') locale = 'ca';
	} catch {
		return json(400, { error: t.invalidRequest });
	}

	const messages = copy[locale];

	if (!Number.isFinite(amountEuros)) {
		return json(400, { error: messages.invalidAmount });
	}

	const amountCents = Math.round(amountEuros * 100);
	if (amountCents < MIN_AMOUNT_CENTS) {
		return json(400, { error: messages.minAmount });
	}
	if (amountCents > MAX_AMOUNT_CENTS) {
		return json(400, { error: messages.maxAmount });
	}

	const siteUrl = (
		process.env.URL ||
		process.env.DEPLOY_PRIME_URL ||
		'https://evangelium-web.netlify.app'
	).replace(/\/$/, '');

	const stripe = new Stripe(secretKey);

	try {
		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			submit_type: 'donate',
			managed_payments: { enabled: false },
			integration_identifier: 'evangelium_donate_xkqmrtvw',
			line_items: [
				{
					price_data: {
						currency: 'eur',
						unit_amount: amountCents,
						product_data: {
							name: messages.productName,
							description: messages.productDescription,
						},
					},
					quantity: 1,
				},
			],
			success_url: `${siteUrl}${messages.thanksPath}?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${siteUrl}${messages.donatePath}`,
			locale: messages.stripeLocale,
		});

		if (!session.url) {
			return json(500, { error: messages.startFailed });
		}

		return json(200, { url: session.url });
	} catch (error) {
		console.error('Error al crear Checkout Session:', error);
		return json(500, { error: messages.startFailedRetry });
	}
}

/**
 * @param {number} statusCode
 * @param {Record<string, unknown>} payload
 */
function json(statusCode, payload) {
	return {
		statusCode,
		headers: {
			'Content-Type': 'application/json',
			...corsHeaders(),
		},
		body: JSON.stringify(payload),
	};
}

function corsHeaders() {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
	};
}
