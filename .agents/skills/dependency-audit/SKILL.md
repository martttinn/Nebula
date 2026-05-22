---
name: dependency-audit
description: Audit package and dependency health in Nebula Studios, including Next.js, React, Tailwind, Motion for React, lucide-react, class-variance-authority, Radix primitives, eslint, TypeScript, lockfile drift, vulnerabilities and release implications. Use when Codex needs to review package.json/package-lock.json, Next.js upgrades, React compatibility, dependency security, or package/tooling drift in this repo.
---

# Dependency Audit

## Overview

Audita dependencias de Nebula Studios con mentalidad read-only por defecto. El objetivo es separar hechos verificados, riesgo real y plan de actualización, sin ejecutar fixes automáticos ni convertir una auditoría en upgrade salvo petición explícita.

## Principios

- verifica siempre contra el repo local y fuentes actuales; versiones y advisories cambian
- no ejecutes `npm audit fix` ni upgrades globales sin alcance explícito
- trata `package-lock.json` como contrato operativo: si cambia, debe estar justificado y validado
- distingue dependencias runtime, dev-only y transitorias
- usa fuentes oficiales o primarias al interpretar compatibilidad: documentación oficial de Next.js, React, Tailwind o del paquete afectado

## Preflight

1. lee `package.json`, `package-lock.json`, `next.config.mjs`, `tailwind.config.cjs` y `tsconfig.json`
2. ejecuta `git status --short` y separa cambios previos ajenos de los hallazgos de auditoría
3. extrae las dependencias, paquetes y herramientas concretas mencionadas por el usuario, la documentación o el scope de la tarea
4. comprueba en `package.json` y `package-lock.json` cuáles están instaladas realmente y cuáles solo están mencionadas
5. identifica si la tarea pide solo informe o también implementación; si no está claro, asume auditoría read-only
6. anota fecha exacta de consulta y si hubo red disponible para comandos contra registry/advisories

## Comandos base

Ejecuta solo los que aporten señal al scope:

```bash
npm ls --depth=0
npm ls <package>
npm outdated --json || true
npm audit --json || true
npm audit --omit=dev --json || true
```

Para diagnósticos de salud en React/Next.js, usa React Doctor bajo demanda sin añadirlo al manifiesto:

```bash
npx react-doctor@latest
```

Si necesitas investigar un paquete concreto:

```bash
npm view <package> version dist-tags peerDependencies engines deprecated time --json
npm explain <package>
npm ls <package>
```

## Ejes de auditoría

### Dependencias mencionadas vs instaladas

- comprueba toda dependencia citada contra el manifiesto y lockfile reales antes de tratarla como parte del stack
- si falta una dependencia mencionada, clasifícala como `mencionada/no instalada`
- pregunta a Martín cuáles quiere instalar antes de modificar manifiestos, lockfiles o código que dependa de ella
- si el uso previsto es bajo demanda con `npx <paquete>@...`, documéntalo como tooling no instalado y evita forzar instalación

### Compatibilidad del stack

- comprueba coherencia entre `next`, `react`, `react-dom`, TypeScript, ESLint y librerías críticas del runtime
- separa `wanted`, `latest` y compatibilidad real con el stack instalado
- presta atención especial a librerías visuales o con peso en bundle como `motion`, `lucide-react`, Radix o primitives tipo shadcn/ui

### Vulnerabilidades

- lee `npm audit` y valida si la vulnerabilidad alcanza runtime real, tooling local, build o solo dev tooling
- para vulnerabilidades transitorias, identifica el padre con `npm explain <package>`
- clasifica severidad y acción: `bloqueante`, `alta`, `media`, `baja`, `ruido`

### Outdated y drift

- detecta rangos incoherentes, paquetes deprecated o dependencias sin mantenimiento
- si sospechas dependencia no usada, verifica con búsquedas reales antes de recomendar retirada
- si un cambio afecta runtime público, metadata o tooling de build, marca el riesgo de release
- usa `react-doctor` como señal adicional para problemas de seguridad, rendimiento, corrección, accesibilidad, bundle y arquitectura; no conviertas sus sugerencias en cambios sin verificar impacto real en el repo

## Plan de actualización

Cuando el usuario pida corregir además de auditar:

1. agrupa cambios por oleadas pequeñas
2. deja majors o cambios de runtime/build como tarea separada salvo petición explícita
3. tras cualquier cambio, valida como mínimo:

```bash
npm run lint
npm run build
```

## Formato de informe

Entrega la auditoría con esta estructura:

1. estado actual del stack y del worktree
2. vulnerabilidades relevantes
3. actualizaciones recomendables
4. drift y problemas de configuración
5. recomendación por oleadas
6. validación realizada y límites
7. fuentes consultadas con fecha

## Documentación y cierre

- si solo auditas, no modifiques docs salvo que Martín pida registrar el informe
- si cambias dependencias, actualiza `package.json`, `package-lock.json` y la documentación afectada
- si cambia la foto del stack, actualiza `rules/01-project-context.md`
- registra la entrega en `doc/change-log/`
