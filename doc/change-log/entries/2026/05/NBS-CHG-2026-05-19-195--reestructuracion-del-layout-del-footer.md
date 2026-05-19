---
change_id: NBS-CHG-2026-05-19-195
date: 2026-05-19
title: Reestructuracion del layout del footer
group_id: NBS-TSK-2026-171
category: frontend
subcategories:
  - layout
  - responsive
  - docs
origin: client-request
complexity: low
scope: component-level
user_visible: true
release_impacts:
  - frontend-runtime
  - docs
architecture_layers:
  - components
  - docs
  - web
backend_sensitive: false
files_touched:
  - components/layout/footer.tsx
  - DESIGN.md
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

Se reestructura el footer para seguir solo el layout de la referencia: columnas superiores, separador y barra inferior.

## Contexto / problema

Martín pidió que el footer siguiera el layout estructural de la imagen aportada, pero sin copiar estética, colores ni contenido de esa referencia. Después precisó que el link `Contactar` debía estar dentro de la sección `Navegación`.

## Cambio realizado

- `components/layout/footer.tsx` reorganiza la parte superior en cuatro columnas: marca/contacto, `Navegación`, `Estudio` y `Legal`.
- `Contactar` se mueve a `Navegación`.
- El footer añade un separador horizontal y una barra inferior con copyright a la izquierda y legales a la derecha.
- Se mantiene el estilo Nebula existente: fondo, grid, tipografía, colores y estado desactivado de legales.
- `DESIGN.md` y `doc/reference/technical-reference.md` se actualizan para reflejar la estructura canónica.

## Objetivo

Adoptar la estructura visual de referencia sin convertir el footer en una copia estética de Canal 3 ni introducir contenido o integraciones no confirmadas.

## Impacto arquitectonico

El cambio permanece en `components/layout/footer.tsx` y sigue consumiendo `data/navigation.ts` y `siteConfig` como fuentes compartidas. No introduce client component, estado, efectos, rutas nuevas ni backend.

## Desglose denso

- layout desktop: `marca/contacto + navegación + estudio + legal`
- layout móvil: columnas apiladas manteniendo orden lógico
- barra inferior: copyright a izquierda, legales a derecha en desktop y apilados en móvil
- `Contactar`: queda bajo `Navegación`
- legales: visibles pero desactivados, igual que antes

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- smoke visual desktop en `http://localhost:3001`
- smoke visual móvil en `http://localhost:3001`
- `npm run changes:sync`

## Pendientes / limites

No se activan páginas legales ni se añade una página de contacto. El cambio es exclusivamente estructural y mantiene los límites funcionales actuales.

## Notas para presupuesto

Entrega pequeña de UI pública y responsive con valor de coherencia visual, más actualización documental y validación estática/visual proporcional.
