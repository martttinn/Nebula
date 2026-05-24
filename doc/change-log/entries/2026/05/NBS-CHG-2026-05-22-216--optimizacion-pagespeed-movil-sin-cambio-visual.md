---
change_id: NBS-CHG-2026-05-22-216
date: 2026-05-22
title: Optimizacion PageSpeed movil sin cambio visual
group_id: NBS-TSK-2026-192
category: frontend
subcategories:
  - performance
  - hydration
  - loader
  - navbar
  - assets
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
  - components/ui/preloader.tsx
  - components/StaggeredMenu.tsx
  - components/layout/navbar-staggered-menu.tsx
  - components/ui/local-tech-stack-icons.tsx
  - components/ui/lazy-tech-stack-icon.tsx
  - components/ui/tech-stack-icon.tsx
  - components/ui/tech-stack-icon.types.ts
  - .agents/decisions-log.md
  - .agents/rules/01-project-context.md
  - doc/reference/technical-reference.md
  - doc/change-log/entries/2026/05/NBS-CHG-2026-05-22-216--optimizacion-pagespeed-movil-sin-cambio-visual.md
  - doc/change-log/groups/2026/NBS-TSK-2026-192.md
verification:
  - PageSpeed Insights mobile oficial consultado 2026-05-22
  - npm run lint
  - npm run typecheck
  - npm run build
  - npx react-doctor@latest --offline --full --no-lint --json --json-compact
  - inspeccion de chunks .next/static/chunks tras build
  - Playwright CLI smoke visual en next start local
related_decisions:
  - PageSpeed mobile se optimiza sin cambiar la direccion visual
---

# Resumen corto

Se aplica una optimizacion conservadora de PageSpeed mobile sobre la home publica sin cambiar la composicion visual ni la direccion de marca.

## Contexto / problema

Martín compartio una auditoria PageSpeed Insights mobile de `https://somosnebula.com/` con `Performance 85`. La lectura del informe indicaba que servidor, imagenes, SEO, cache y terceros no eran el problema principal. Los sintomas accionables estaban en `Speed Index 6.9s`, `TBT 280ms`, `JS execution 1.6s` y `main thread work 4.2s`.

La restriccion explicita del cambio era mantener el resultado visual actual.

## Cambio realizado

- el `Preloader` conserva timing y apariencia, pero la barra de progreso deja de depender de un intervalo de estado React cada `20ms`; ahora progresa mediante una animacion de Motion y solo cambia estado al salir
- el set de teclas bloqueadas durante el scroll lock del preloader se hoista fuera del efecto para evitar recrearlo en cada keydown
- el `StaggeredMenu` responsive deja de cargarse como parte inmediata del navbar; el trigger inicial conserva la misma hamburguesa y el overlay/GSAP se cargan por intencion del usuario o por idle tardio
- `StaggeredMenu` acepta `initialOpen` para que un tap inmediato sobre el fallback abra el menu real tras cargar el chunk diferido
- los wrappers de iconografia tecnologica pasan a usar un subconjunto SVG local de los cinco iconos realmente usados por `Projects showcase`
- se elimina el import cliente a `tech-stack-icons`, manteniendo la API publica de `LazyTechStackIcon` y `TechStackIcon`
- se actualizan decisions log, referencia tecnica y change-log

## Objetivo

Reducir coste de hidratacion, parseo/evaluacion de JavaScript y trabajo del main thread sin redisenar la experiencia visual.

## Impacto arquitectonico

Impacto acotado a componentes cliente de la home, navbar responsive, wrappers de iconos y documentacion. No toca rutas, metadata SEO, backend, Supabase, auth, datos, copy comercial ni dependencias.

La decision de fondo es que piezas visualmente identicas pueden renderizarse con menor coste si el trabajo pesado se mueve fuera del primer tramo de carga.

## Desglose denso

La auditoria PageSpeed marcaba como prioridad reducir ejecucion de JavaScript y trabajo de main thread. El `Preloader` no se elimina porque forma parte del lenguaje de marca, pero se reduce su coste interno: el usuario ve la misma barra, con el mismo overlay y mismo logo, mientras React deja de renderizar el componente decenas de veces durante el primer segundo.

El menu responsive mantiene el mismo trigger y el mismo overlay final. La diferencia es de carga: el HTML inicial muestra una hamburguesa equivalente y el chunk con `StaggeredMenu` + GSAP queda fuera del primer render. Si el usuario interactua inmediatamente, el wrapper marca `initialOpen` para abrir el menu al montar el componente real.

El hallazgo mas claro de bundle era `tech-stack-icons`: el paquete estaba encapsulado, pero seguia generando un chunk lazy muy grande por publicar un catalogo monolitico. Como la home solo usa `nextjs`, `typescript`, `supabase`, `expo` y `reactnative`, se sustituye por SVGs locales equivalentes. Tras build, no queda ninguna referencia a `tech-stack-icons` ni a su mensaje interno en chunks de Next.

## Validacion

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npx react-doctor@latest --offline --full --no-lint --json --json-compact`; devuelve `0` errores y `0` warnings, con `dead-code` omitido por binding nativo opcional de `oxc-parser` no disponible en el cache de `npx`
- inspeccion post-build de `.next/static/chunks`: el arbol de chunks baja a aproximadamente `1.6M` en disco y desaparece el chunk lazy de varios MB asociado al catalogo de `tech-stack-icons`
- busqueda post-build sin referencias a `tech-stack-icons` ni `Icon with name`
- `StaggeredMenu` queda en chunk diferido separado de aproximadamente `76K` raw / `29K` gzip
- `next start --port 3100` con Playwright CLI verifica hero desktop, apertura/cierre del menu mobile y render de badges tecnologicos en proyectos
- los unicos errores de consola observados en local son los `404` esperados de Vercel Analytics/Speed Insights bajo `next start`; no proceden de este cambio

## Pendientes / limites

La mejora real en PageSpeed del dominio oficial solo se confirma tras desplegar y repetir la auditoria mobile. El cambio no persigue CSS render-blocking ni legacy JS porque el retorno esperado era menor que reducir trabajo de JS/hidratacion.

Queda como limpieza opcional futura evaluar si `tech-stack-icons` debe retirarse tambien de `package.json` y `package-lock.json`, ya que el runtime publico deja de importarlo.

## Notas para presupuesto

Optimizacion de rendimiento con foco en calidad percibida: conserva la identidad visual de Nebula, reduce coste de arranque y deja trazada la regla para no reintroducir paquetes monoliticos en islands cliente con pocos iconos.
