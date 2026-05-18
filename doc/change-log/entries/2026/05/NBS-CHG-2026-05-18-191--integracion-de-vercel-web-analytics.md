---
change_id: NBS-CHG-2026-05-18-191
date: 2026-05-18
title: Integracion de Vercel Web Analytics
group_id: NBS-TSK-2026-167
category: frontend
subcategories:
  - diagnostics
  - runtime
  - developer-experience
origin: client-request
complexity: low
scope: cross-cutting
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - app
  - components
  - docs
backend_sensitive: false
files_touched:
  - app/layout.tsx
  - package.json
  - package-lock.json
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-18-191--integracion-de-vercel-web-analytics.md
  - doc/change-log/groups/2026/NBS-TSK-2026-167.md
verification:
  - documentación oficial Vercel Web Analytics consultada 2026-05-18
  - npm view @vercel/analytics version description --json
  - npm run lint
  - npm run typecheck
  - npm run build
  - npm audit --omit=dev
  - npm run changes:sync
related_decisions:
  - El runtime público integra Vercel Web Analytics
---

# Resumen corto

Se integró Vercel Web Analytics en el root layout de Next.js para recoger page views y visitantes en Vercel.

## Contexto / problema

Martín mostró el panel de Analytics de Vercel para `somosnebula.com`, que pedía instalar `@vercel/analytics`, añadir el componente React oficial y desplegar para empezar a recibir tráfico.

## Cambio realizado

- se instala `@vercel/analytics` (`2.0.1` verificado vía npm)
- `app/layout.tsx` importa `Analytics` desde `@vercel/analytics/next`
- el root layout monta `<Analytics />` junto a `<SpeedInsights />`
- se actualiza la referencia técnica y el decisions log para dejar trazada la capa de observabilidad pública

## Objetivo

Habilitar medición básica de tráfico real sin construir analítica propia ni alterar la experiencia visual de la home.

## Impacto arquitectonico

El cambio vive en el root layout, por lo que aplica a toda la app pública. No introduce backend, endpoints, middleware, auth ni almacenamiento propio; delega la recogida de métricas en la integración oficial de Vercel para Next.js.

## Desglose denso

La documentación oficial de Vercel Web Analytics consultada el `2026-05-18` indica para Next.js App Router añadir `@vercel/analytics` y colocar `<Analytics />` en `app/layout.tsx`. La misma documentación advierte que Web Analytics debe estar habilitado en el dashboard y que la recogida real empieza tras desplegar y visitar el sitio.

## Validacion

- documentación oficial Vercel Web Analytics consultada el `2026-05-18`
- `npm view @vercel/analytics version description --json` → `2.0.1`
- `npm run lint`
- `npm run typecheck`
- `npm run build` → build estático correcto con Next `16.2.4`
- `npm audit --omit=dev` → falla por vulnerabilidades reportadas en `next` y `postcss`; no se aplica `npm audit fix` porque implica un upgrade de framework separado del objetivo de Analytics
- `npm run changes:sync`

## Pendientes / limites

Hay que desplegar y visitar la web para que el panel empiece a recibir page views. Aunque Vercel documenta Web Analytics como analítica sin cookies y con datos anonimizados, la política legal pública del sitio deberá reflejar el uso de analítica/observabilidad cuando se cierre la capa legal. Además, queda pendiente decidir un upgrade de Next/PostCSS para cerrar el audit productivo.

## Notas para presupuesto

Integración ligera de medición de tráfico con valor operativo directo para marketing y evolución del producto. No incluye dashboard propio, eventos custom ni tagging avanzado.
