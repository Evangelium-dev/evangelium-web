# evangelium-web

Sitio web con [Astro](https://astro.build) para publicar la política de privacidad de **Evangelio del día**.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321).

## Producción

```bash
npm run build
npm run preview
```

Los archivos estáticos se generan en `dist/`.

## Contenido

La política de privacidad se deduce del comportamiento real de:

- `evangelium-frontend` — aplicación Flutter (preferencias locales, peticiones anónimas a la API)
- `evangelium-backend` — API de contenido litúrgico (sin cuentas de usuario, caché, Azure Translator)
