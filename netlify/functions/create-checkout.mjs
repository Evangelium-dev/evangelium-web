import Stripe from 'stripe';

const MIN_AMOUNT_CENTS = 50; // 0,50 €
const MAX_AMOUNT_CENTS = 1_000_000; // 10.000 €

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

	if (event.httpMethod !== 'POST') {
		return json(405, { error: 'Método no permitido' });
	}

	const secretKey = process.env.STRIPE_SECRET_KEY;
	if (!secretKey) {
		console.error('STRIPE_SECRET_KEY no está configurada');
		return json(500, { error: 'El servicio de donaciones no está disponible' });
	}

	let amountEuros;
	try {
		const body = JSON.parse(event.body || '{}');
		amountEuros = Number(body.amount);
	} catch {
		return json(400, { error: 'Solicitud inválida' });
	}

	if (!Number.isFinite(amountEuros)) {
		return json(400, { error: 'Introduce un importe válido' });
	}

	const amountCents = Math.round(amountEuros * 100);
	if (amountCents < MIN_AMOUNT_CENTS) {
		return json(400, { error: 'El importe mínimo es 0,50 €' });
	}
	if (amountCents > MAX_AMOUNT_CENTS) {
		return json(400, { error: 'El importe máximo es 10.000 €' });
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
			integration_identifier: 'evangelium_donate_xkqmrtvw',
			line_items: [
				{
					price_data: {
						currency: 'eur',
						unit_amount: amountCents,
						product_data: {
							name: 'Donación a Evangelium',
							description:
								'Apoyo al desarrollo, mantenimiento y mejora de Evangelio del día',
						},
					},
					quantity: 1,
				},
			],
			success_url: `${siteUrl}/donaciones/gracias/?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${siteUrl}/donaciones/`,
			locale: 'es',
		});

		if (!session.url) {
			return json(500, { error: 'No se pudo iniciar el pago' });
		}

		return json(200, { url: session.url });
	} catch (error) {
		console.error('Error al crear Checkout Session:', error);
		return json(500, { error: 'No se pudo iniciar el pago. Inténtalo de nuevo.' });
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
