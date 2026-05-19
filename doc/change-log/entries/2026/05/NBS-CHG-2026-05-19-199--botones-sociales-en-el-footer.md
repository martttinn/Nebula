---
change_id: NBS-CHG-2026-05-19-199
date: 2026-05-19
title: Botones sociales en el footer
group_id: NBS-TSK-2026-175
category: frontend
subcategories:
  - navigation
  - interaction
  - ui
origin: client-request
complexity: low
scope: component-level
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - data
  - docs
  - web
backend_sensitive: false
files_touched:
  - lib/site.ts
  - components/layout/footer.tsx
  - DESIGN.md
  - doc/reference/domain-reference.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - smoke visual desktop en http://localhost:3001
  - smoke visual móvil en http://localhost:3001
  - npm run changes:sync
related_decisions:
---

# Resumen corto

Se añaden botones sociales al footer de Nebula Studios siguiendo el patrón visual usado en el footer de Canal3.

## Contexto / problema

Martín pidió incluir botones de redes sociales como los del proyecto Canal3. El footer de Nebula ya tenía marca, contacto, navegación y legales, pero no exponía salidas sociales compactas.

## Cambio realizado

- `lib/site.ts` añade URLs sociales para Instagram, LinkedIn y GitHub.
- `components/layout/footer.tsx` renderiza una fila de botones sociales debajo del bloque de contacto.
- Cada botón abre en nueva pestaña con `target="_blank"` y `rel="noopener noreferrer"`.
- Los botones replican el patrón estructural de Canal3: tamaño cuadrado, borde fino, fondo glass, icono centrado, hover por red y elevación corta.
- `DESIGN.md`, `technical-reference` y `domain-reference` documentan el nuevo comportamiento.

## Objetivo

Reforzar la presencia pública de marca en el cierre de la home sin convertir los botones sociales en un canal de captación ficticio.

## Impacto arquitectonico

El cambio queda acotado a configuración compartida, footer y documentación. No introduce estado cliente, rutas, APIs, Supabase, middleware, tracking ni tratamiento de datos.

## Desglose denso

- canales visibles: Instagram, LinkedIn y GitHub
- ubicación: primera columna del footer, bajo email y teléfono
- patrón visual: inspirado en Canal3, retemado a Nebula
- navegación: salidas externas seguras
- layout: sin cambio de columnas ni barra inferior

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- smoke visual desktop en `http://localhost:3001`
- smoke visual móvil en `http://localhost:3001`
- `npm run changes:sync`

## Pendientes / limites

Los botones sociales no implican soporte, formulario, CRM, calendario ni automatización de captación. LinkedIn puede bloquear comprobaciones HTTP automatizadas con respuesta anti-bot aunque el enlace público esté versionado.

## Notas para presupuesto

Pulido visible de footer y presencia social, con centralización de URLs y documentación proporcional.
