# Nebula Studios | Advanced Agentic Coding

Este es el baseline limpio de Nebula Studios para proyectos de Next.js con el sistema de agentes integrado.

## Características

- **Next.js 16 (App Router)**: Estructura moderna y optimizada.
- **Agent System**: Sistema modular de agentes en `.agents/` configurado y listo para operar.
- **Visual Baseline**: Configuración de Tailwind y fuentes premium pre-cargadas (Syne & Inter).
- **SEO Ready**: Estructura básica de metadatos y semántica HTML5.

## Estructura del Sistema de Agentes

El proyecto mantiene la estructura canónica de agentes en `.agents/`:

```text
.agents/
├── README.md
├── decisions-log.md
├── roles/
├── rules/
└── workflows/
```

Consulta `AGENTS.md` para más información sobre el funcionamiento del sistema de agentes.

## Desarrollo

```bash
npm install
npm run dev
```

## Diagnóstico React

Para auditorías puntuales de salud en React/Next.js, usa React Doctor bajo demanda sin instalarlo en el proyecto:

```bash
npx react-doctor@latest
```

Este comando complementa `lint`, `typecheck` y `build`; no sustituye la validación propia del repo.

## Supabase bootstrap

El repo ya incluye bootstrap repo-safe de Supabase, pero el runtime público actual no lo usa todavía. La conexión real se retomará cuando el frontend quede cerrado.

La base disponible hoy es:

- `lib/supabase/*` para SSR en Next.js
- `supabase/config.toml` para el CLI local
- `supabase/migrations/` para versionar cambios de esquema

Comandos útiles cuando toque activar backend:

```bash
npm run supabase:start
npm run supabase:status
npm run supabase:types:local
```

---

Desarrollado con ❤️ por **Nebula Studios**.
