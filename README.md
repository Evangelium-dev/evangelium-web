# evangelium-web

Sitio web con [Astro](https://astro.build) para la política de privacidad, la historia del proyecto y las donaciones de **Evangelio del día** / **Evangeli del dia**.

## Idiomas

- Español (por defecto): `/`, `/sobre-mi`, `/donaciones`
- Catalán: `/ca/`, `/ca/sobre-mi`, `/ca/donaciones`

## Despliegue

Publicado en Netlify: [https://evangelium-web.netlify.app/](https://evangelium-web.netlify.app/)

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321).

Requiere **Node.js >= 22.12.0** (Astro 7). Si usas [fnm](https://github.com/Schniz/fnm), `fnm use` leerá la versión de `.nvmrc`.

Para probar donaciones en local (función de Stripe):

```bash
# Copia .env.example a .env y define STRIPE_SECRET_KEY
npx netlify dev
```

## Donaciones (Stripe)

La página `/donaciones` crea una [Checkout Session](https://docs.stripe.com/payments/checkout) de pago único con importe libre.

En Netlify → Site configuration → Environment variables, añade:

| Variable | Valor |
|----------|--------|
| `STRIPE_SECRET_KEY` | Restricted API Key (`rk_live_…`) o Secret Key (`sk_live_…`) |

Tras cambiar variables, vuelve a desplegar el sitio.

## Producción

```bash
npm run build
npm run preview
```

Los archivos estáticos se generan en `dist/`. La función de checkout vive en `netlify/functions/`.

## Contenido

- Política de privacidad — deducida de `evangelium-frontend` y `evangelium-backend`
- Sobre mí — origen del proyecto
- Donaciones — apoyo voluntario vía Stripe
