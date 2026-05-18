---
change_id: NBS-CHG-2026-05-18-190
date: 2026-05-18
title: Retirada del glare del logo del preloader
group_id: NBS-TSK-2026-166
category: frontend
subcategories:
  - branding
  - loader
  - motion
origin: client-request
complexity: low
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - docs
backend_sensitive: false
files_touched:
  - components/ui/nebula-logo-animated.tsx
  - components/ui/preloader.tsx
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-18-190--retirada-del-glare-del-logo-del-preloader.md
  - doc/change-log/groups/2026/NBS-TSK-2026-166.md
verification:
  - npx eslint components/ui/nebula-logo-animated.tsx components/ui/preloader.tsx --max-warnings=0
  - npm run typecheck
  - smoke local con Playwright en http://localhost:3100
related_decisions:
---

# Resumen corto

Se retiró el brillo tipo glare que barría el símbolo del logo durante el preloader de entrada.

## Contexto / problema

Martín pidió quitar el glare del logo del loader. El efecto no estaba en el halo exterior del preloader, sino en el sweep blanco interno renderizado por `NebulaLogoAnimated` tras completar su fade inicial.

## Cambio realizado

- `NebulaLogoAnimated` añade una prop `glossy` con valor por defecto `true` para mantener compatibilidad visual si el componente se reutiliza.
- `Preloader` renderiza el logo con `glossy={false}` para no montar el rectángulo de sheen dentro del SVG.
- No se alteran el tamaño del logo, el timing de entrada, la barra de progreso ni el bloqueo de scroll.

## Objetivo

Rebajar ruido ornamental en la primera impresión de marca manteniendo el loader reconocible y la secuencia de entrada actual.

## Impacto arquitectonico

Cambio component-level. La API del logo gana un control explícito para activar o desactivar el acabado glossy sin bifurcar el componente ni duplicar SVG.

## Desglose denso

El glare se eliminó solo de la instancia del loader. El componente sigue pudiendo renderizar el efecto por defecto en futuras superficies, pero el preloader ya no dispara ni monta la capa `mixBlendMode: "screen"` asociada al sweep.

## Validacion

- `npx eslint components/ui/nebula-logo-animated.tsx components/ui/preloader.tsx --max-warnings=0`
- `npm run typecheck`
- smoke local con Playwright sobre `http://localhost:3100`: `hasLogo: true`, `visiblePreloader: true`, `sheenRectCount: 0`

## Pendientes / limites

No se tocó el halo radial exterior del preloader porque la petición apuntaba al glare del logo. El worktree contiene cambios previos amplios no relacionados que no forman parte de esta entrada.

## Notas para presupuesto

Ajuste visual local solicitado por cliente, de baja complejidad y efecto visible directo en branding. Incluye validación estática y smoke runtime por tratarse de una microinteracción visual de entrada.
