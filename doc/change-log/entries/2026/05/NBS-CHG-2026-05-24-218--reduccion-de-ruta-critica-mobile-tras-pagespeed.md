---
change_id: NBS-CHG-2026-05-24-218
date: 2026-05-24
title: Reduccion de ruta critica mobile tras PageSpeed
group_id: NBS-TSK-2026-194
category: frontend
subcategories:
  - performance
  - mobile
  - hydration
  - motion
origin: client-request
complexity: medium
scope: cross-cutting
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
  - app/globals.css
  - components/StaggeredMenu.tsx
  - components/animate-ui/primitives/buttons/button.tsx
  - components/home/hero/lead.tsx
  - components/layout/navbar-staggered-menu.tsx
  - components/layout/navbar.tsx
  - components/magicui/border-beam.tsx
  - components/ui/nebula-logo-animated.tsx
  - components/ui/preloader.tsx
  - components/ui/split-text.module.css
  - components/ui/split-text.tsx
  - lib/use-prefers-reduced-motion.ts
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-24-218--reduccion-de-ruta-critica-mobile-tras-pagespeed.md
  - doc/change-log/groups/2026/NBS-TSK-2026-194.md
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
  - git diff --check
  - inspeccion de CSS critico en .next/server/app/index.html
  - smoke visual local con Playwright
related_decisions:
  - Microanimaciones above-the-fold no deben arrastrar Motion si CSS preserva el resultado
---

# Resumen corto

Se reduce la ruta critica mobile de la home moviendo CSS del menu responsive fuera del render inicial y sustituyendo microanimaciones above-the-fold por CSS, sin cambiar la composicion visual.

## Contexto / problema

Martín compartio una auditoria PageSpeed Insights mobile con avisos de CSS bloqueante, JavaScript antiguo, reflows forzados, JavaScript no usado y trabajo de main thread. Tras verificar la build local y el HTML publico, el objetivo accionable sin rediseño era sacar del primer tramo el CSS del menu responsive y evitar que primitives ligeras del primer viewport importasen `motion/react`.

## Cambio realizado

- `StaggeredMenu.css` pasa de importarse en el wrapper del navbar a importarse dentro del componente dinamico `StaggeredMenu`
- el trigger fallback del menu movil usa clases Tailwind propias, por lo que se ve igual aunque el stylesheet real del overlay aun no haya cargado
- el wrapper del menu precarga el modulo por intencion/idle sin sustituir el boton antes de la activacion; en click monta el menu real con `initialOpen`
- `Button`, `BorderBeam`, `NebulaLogoAnimated`, `Preloader` y `SplitText` dejan de depender de Motion para sus microanimaciones equivalentes
- `HeroLead` y el header del navbar usan clases CSS para fades, transforms y hide-on-scroll
- `Preloader` conserva duracion minima, hold de salida y fade equivalente, pero su barra progresa con una transicion CSS y no con re-render continuo
- se crea `usePrefersReducedMotion` como hook local ligero para no importar `useReducedMotion` desde Motion en componentes above-the-fold

## Objetivo

Bajar coste de CSS bloqueante, parse/evaluacion de JavaScript y dependencias iniciales sin tocar copy, layout ni direccion visual.

## Impacto arquitectonico

El cambio reduce el acoplamiento entre primitives de primer viewport y el runtime pesado de Motion. Las secciones scroll-driven below-the-fold que realmente necesitan Motion quedan intactas para no introducir una migracion visual amplia en un pase de performance.

## Desglose denso

La mejora mas medible en CSS es que el stylesheet del menu escalonado deja de aparecer entre los links criticos del HTML inicial y queda emitido como chunk CSS separado asociado al componente dinamico. La hamburguesa inicial no depende de ese CSS porque su fallback se pinta con Tailwind.

En microanimaciones, el criterio fue sustituir Motion solo cuando la animacion es declarativa y equivalente en CSS: escala de botones, fade/translate del logo, desplazamiento de caracteres, progreso del loader, beam perimetral y show/hide del navbar. No se toca la logica de scroll compleja de servicios, proceso, proyectos o testimonios en este pase.

Se verifico tambien el aviso de `JavaScript antiguo`: el bloque de polyfills marcado por PageSpeed sigue procediendo del runtime cliente de Next/Turbopack. Se probo una aliasizacion interna para omitirlo, pero no redujo el chunk emitido, asi que se retiro para no dejar configuracion fragil sin beneficio real.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `git diff --check`
- inspeccion post-build de `.next/server/app/index.html`: se mantienen `2` stylesheets criticos y el CSS del menu responsive queda como chunk diferido
- smoke local con Playwright en `next start` para verificar hero, preloader unico, menu mobile y desktop

## Pendientes / limites

La mejora real en PageSpeed del dominio oficial solo se confirma tras desplegar y repetir la medicion mobile. Mientras el preloader siga activo, el desglose de LCP puede seguir mostrando retraso de renderizado porque el H1 esta SSR pero cubierto por el overlay inicial.

Eliminar el chunk inicial de Motion por completo exigiria refactorizar o partir con fallbacks estaticos las secciones scroll-driven below-the-fold; no se hace aqui porque el riesgo visual y de mantenimiento es mayor que el retorno de este pase.

## Rollback

El trabajo vive aislado en la rama `codex/mobile-critical-path-perf`, creada desde `main` en `5182b07`. Antes de mergear, el rollback es cambiar a `main` o borrar la rama. Despues de mergear, el rollback recomendado es revertir el commit de este change-log.

## Notas para presupuesto

Optimizacion de ruta critica mobile con foco en mantener marca y composicion: reduce dependencias de arranque y CSS bloqueante sin rediseñar ni retirar piezas visuales.
