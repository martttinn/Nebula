# Project Context

## Qué es este proyecto

Nebula Studios es la web pública de marketing del estudio de software personal de Martín. La superficie actual del repo está enfocada en:

- posicionamiento premium
- explicación clara de la propuesta de valor
- diferenciación frente a agencias genéricas
- captación cualificada como siguiente fase operativa

No existe a fecha `2026-05-03` una capa backend live verificada, una zona autenticada ni un flujo de lead capture conectado a runtime real.
Sí existe un bootstrap repo-safe de Supabase en `lib/supabase/**` y `supabase/**`, pero hoy no equivale a un backend funcional ya conectado y queda además desacoplado del runtime público mientras se cierra el frontend.

## Stack verificado en el repo

Verificado localmente el **9 de mayo de 2026** contra `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts` y el árbol real del repo.

- Next.js `16.2.4`
- React `18.3.1`
- React DOM `18.3.1`
- TypeScript estricto
- Tailwind CSS `3.4.19`
- Framer Motion `11.18.2`
- Three.js `0.180.x`
- Postprocessing `6.39.x`
- `tech-stack-icons` `3.7.1`
- React Doctor `0.1.6` como diagnóstico bajo demanda vía `npx react-doctor@latest`; no está instalado ni fijado en `package.json`
- App Router
- primitives tipo shadcn/ui con `class-variance-authority`, `@radix-ui/react-slot`, `clsx` y `tailwind-merge`

Esta lista es una foto del repositorio, no una garantía permanente. Si una tarea depende de compatibilidad exacta, revalida el archivo afectado antes de decidir.

## Estructura real del repo

- `app/`: rutas públicas, layout global, metadata, `robots.ts` y `sitemap.ts`
- `components/home/`: secciones y piezas de la landing pública
- `components/ui/`: primitives reutilizables
- `data/`: contenido estático del sitio
- `lib/`: helpers de metadata y utilidades compartidas
- `.agents/`: sistema modular de agentes vigente
- `DESIGN.md`: sistema visual canónico del repo
- `doc/`: documentación repo-local y change-log
- `scripts/`: tooling repo-local del change-log

## Estado actual del repo

- la homepage vive en `app/page.tsx`
- el runtime público actual es una landing single-page con narrativa, servicios, proceso, prueba social, un cierre comercial integrado como última card de `testimonials`, recogido por el ancla `#contacto`, y un footer de marca + navegación al final
- el hero actual usa una isla cliente visual basada en un `DotField` en canvas para el fondo del viewport
- existen metadata global, `robots.ts` y `sitemap.ts`
- existe `lib/supabase/**` como bootstrap SSR futuro para Next.js, hoy no montado en el runtime público
- existe `supabase/` con `config.toml`, `seed.sql` y `migrations/` para trabajo local y versionado de esquema
- no existe hoy ningún `proxy` o `middleware` montado para conectar Supabase en runtime público
- no existe `app/api/**` ni una capa backend live operativa verificada
- no existe todavía un formulario conectado, calendario, email operativo versionado ni otra integración real de captación; el cierre actual de contacto vive dentro de `testimonials` y usa un CTA visual habilitado sin ruta de redirección mientras esa página y ese canal no existan
- la validación automatizada disponible hoy es `lint`, `typecheck`, `build`, React Doctor bajo demanda (`npx react-doctor@latest`) y el tooling repo-local de `change-log` (`changes:validate`, `changes:index`, `changes:sync`)
- el subsistema `doc/change-log/` ya expone tooling repo-local en `package.json` y `scripts/`

## Contexto visual y de producto

- estética dark-tech sobria con base `Void`, profundidad `Navy`, acento `Lilac` y texto `Silver`
- firma visual basada en cubo isométrico de seis facetas con gradientes radiales
- tipografía `Syne` para titulares e `Inter` para cuerpo
- prioridad actual: generar confianza inmediata y explicar en segundos que aquí hay criterio técnico real
- `DESIGN.md` define el canon visual reutilizable; el código debe tender a ese contrato

## Arquitectura objetivo

Dirección preferida para código nuevo:

1. ruta / layout / metadata
2. sección o componente de página
3. primitive UI o utility compartida
4. catálogo estático o helper en `data/` / `lib/`
5. futura capa de datos o backend cuando exista

## Realidad actual del repo

No asumas una complejidad mayor que la que existe:

- el repo es hoy una superficie pública sin backend live real
- la narrativa comercial vive en `data/site.ts`, no en CMS ni fuente remota
- todavía no hay portfolio, formulario live ni integraciones externas operativas
- no debe expandirse documentación o código como si ya existiera un stack fullstack completo

## Documentos fuente importantes

Antes de tocar áreas sensibles, revisa lo mínimo necesario:

- `README.md`
- `AGENTS.md`
- `DESIGN.md` si la tarea toca UI, branding, motion o componentes
- `.agents/decisions-log.md`
- `doc/README.md`
- `doc/reference/technical-reference.md`
- `doc/reference/domain-reference.md`
- reglas específicas del área que vayas a tocar

## Regla de interpretación

Si el código, la documentación y el contexto estratégico no encajan al 100%:

- da prioridad a lo que realmente ejecuta el repo
- documenta la discrepancia en vez de maquillarla
- no conviertas roadmap o intención visual/comercial en hecho implementado sin verificarlo
