# Technical Reference

Documento mínimo para describir la arquitectura técnica real de la web pública de Nebula Studios.

## 1. Resumen del sistema

- el repo construye la web pública de marketing de Nebula Studios
- el runtime principal es Next.js 16 con App Router
- hoy existe una landing pública single-page con metadata, `icon.svg`, `robots.ts` y `sitemap.ts`
- sigue en roadmap la conexión de un canal comercial real y cualquier futura capa backend live

## 2. Stack verificado

Verificado el **2026-05-04** contra `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts` y dependencias instaladas:

- Next.js `16.2.4`
- React `18.3.1`
- React DOM `18.3.1`
- TypeScript `^5`
- Tailwind CSS `3.4.19`
- Framer Motion `11.18.2`
- GSAP `3.15.x`
- Lenis `1.3.23`
- Motion `12.38.x`
- Three.js `0.180.x`
- Postprocessing `6.39.x`
- `@vercel/speed-insights` `2.0.0`
- `class-variance-authority`, `@radix-ui/react-slot`, `clsx`, `tailwind-merge`
- `@supabase/ssr`, `@supabase/supabase-js`
- Supabase CLI repo-local (`supabase`)
- sin tests automatizados dedicados; la validación disponible hoy es `lint`, `typecheck`, `build` y scripts de `change-log`

## 3. Estructura del repo

- `app/`: layout global, homepage, metadata derivada, `icon.svg`, `robots.ts` y `sitemap.ts`
- `components/home/`: secciones y piezas específicas de la landing pública
- `components/home/value-proposition-section.tsx`: sección editorial de propuesta de valor colocada tras el hero
- `components/home/value-proposition-ornaments.module.css`: capa ornamental específica de `benefits`, con deriva lenta de `abstract-icons` y sin ciclos autónomos de fade
- `components/home/services-carousel.tsx`: sección de servicios con carrusel en arco sticky para desktop y lista vertical de cards para móvil
- `components/home/how-we-work.tsx`: sección pública de proceso con path SVG serpenteante, nodos circulares simples y opacos con icono y cards reveladas por scroll
- `components/BorderGlow.tsx`: primitive cliente reutilizable inspirada en React Bits para acentos perimetrales de glow guiados por proximidad de puntero
- `components/layout/`: shell primitives globales reutilizables, incluido el navbar
- `components/animate-ui/`: primitives y wrappers de UI importados desde registries externas y reencuadrados al lenguaje visual del proyecto
- `components/ui/`: primitives reutilizables
- `public/`: assets estáticos públicos como imágenes, logos, iconos y ficheros descargables
- `data/`: contenido estático del sitio y configuración pública
- `lib/`: helpers de metadata y utilidades compartidas
- `lib/supabase/`: bootstrap SSR de Supabase para cliente, servidor y middleware futuro
- `components/home/grid-scan.tsx`: isla cliente visual con WebGL para el hero público
- `components/home/hero-particles.tsx`: capa decorativa server-side de partículas lilas circulares, legibles y sin blur para el hero, con ciclo largo de aparición, deriva y desvanecimiento
- `components/home/hero-lead.tsx`: isla cliente que orquesta la entrada secuencial del copy y de los CTAs del hero
- `components/ui/word-by-word-color-change.tsx`: primitive cliente reusable que interpola color palabra a palabra en función del progreso de scroll de un bloque local o de un progreso externo compartido, con colores configurables por consumo
- `components/home/value-proposition-statements.tsx`: isla cliente que convierte la banda de propuesta de valor en un stage sticky de viewport completo, con una sola frase activa cada vez y coloreado palabra a palabra guiado por scroll
- `data/services.ts`: catálogo estático de servicios públicos para la sección carrusel
- `components/layout/navbar.tsx`: navbar global reusable con una sola superficie glass y composición `logo / links / CTAs`
- `components/layout/lenis-provider.tsx`: integración global cliente de `Lenis` sobre el scroll raíz, con respeto por `prefers-reduced-motion`
- `components/layout/navbar-staggered-menu.tsx`: isla cliente del navbar para móvil y tablet, basada en `StaggeredMenu`
- `components/StaggeredMenu.tsx`: componente importado desde React Bits y adaptado al App Router y al routing interno de Next.js
- `components/StaggeredMenu.css`: stylesheet del menú escalonado retemado al lenguaje dark-tech de Nebula
- `components/animate-ui/primitives/buttons/button.tsx`: primitive motion base para interacciones de botón con `hoverScale` y `tapScale`
- `components/animate-ui/components/buttons/button.tsx`: wrapper Nebula sobre la primitive motion compartida, usado como base de la primitive pública `components/ui/button.tsx`
- `components/ui/preloader.tsx`: overlay de entrada con branding y barra de progreso para la home pública
- `components/ui/split-text.tsx`: primitive reusable inspirada en `SplitText` de React Bits para reveals escalonados por caracteres o palabras
- `components/ui/nebula-logo-animated.tsx`: logotipo animado reutilizado desde `nebula-legacy` para el preloader
- `supabase/`: configuración del CLI local, seeds y migraciones versionadas
- `.agents/`: reglas, roles, workflows, skills y decisiones del sistema de agentes
- `DESIGN.md`: canon visual reutilizable, conectado con los tokens de `app/globals.css`, `tailwind.config.ts` y primitives UI
- `doc/`: referencia técnica, dominio y `change-log`
- `scripts/`: tooling del `change-log`

## 4. Arquitectura objetivo

Dirección preferida para código nuevo:

1. ruta / layout / metadata
2. sección o componente route-level
3. primitive UI o helper reutilizable
4. catálogo estático o lógica compartida en `data/` / `lib/`
5. futura capa de datos o backend cuando exista

## 5. Runtime actual

- el runtime público actual ya expresa hero, propuesta de valor, servicios y proceso; el siguiente paso comercial conectado sigue pendiente
- `nebula-legacy` sigue existiendo como superficie de referencia puntual para migrar piezas visuales seleccionadas, como el preloader, el logo animado y ahora el carrusel de servicios
- `DESIGN.md` y la implementación base están alineados en palette, tipografía y components shell
- la home monta ya el navbar pill reusable como navegación visible de primer nivel
- la home monta también un `Preloader` de branding con salida coordinada con `GridScan`; mientras permanece visible bloquea scroll e interaccion global del contenido subyacente y detiene explícitamente la instancia root de `Lenis`
- inmediatamente después del hero, la home añade una banda editorial de propuesta de valor con tres frases y cambio de color palabra a palabra guiado por scroll
- el icono del sitio usa `app/icon.svg` con el símbolo oficial oscuro de Nebula
- el root layout monta ya `SpeedInsights` desde `@vercel/speed-insights/next`, de modo que el runtime queda preparado para recoger métricas de rendimiento cuando exista despliegue en Vercel
- las variants reutilizables de botón comparten ya una base motion importada desde `animate-ui`, mientras mantienen el styling propio de Nebula en la capa wrapper
- el scroll raíz del sitio puede suavizarse con `Lenis`, con anclas internas habilitadas y offset para el navbar fijo; cualquier superficie anidada que deba preservar interacción propia debe evaluarse con opt-out granular y nunca con bloqueo total si rompe la navegación natural del documento
- el navbar público replica el patrón de `nebula-legacy`: se oculta al hacer scroll descendente pasado un umbral, reaparece al remontar o cerca del top y se mantiene visible mientras el menú responsive está abierto
- en móvil y tablet, el navbar colapsa a lockup + hamburguesa, y usa un overlay escalonado fullscreen basado en `StaggeredMenu`; el toggle morfea a `X` con `framer-motion`, y todos los destinos, incluido `Contactar`, se renderizan como links tipográficos del mismo sistema, con cierre por `Escape`, foco inicial dentro del panel y retorno de foco al trigger. Desktop mantiene la navegación inline y el CTA premium originales
- el navbar público deja solo el CTA `Contactar`, resuelto ahora sobre la primitive estándar `Button` como outlined transparente en reposo, con borde claro y hover blanco con texto negro y escala `1.05`
- los links centrales del navbar usan una transición con inercia suave en `hover`, basada en microescala y curva elástica contenida, evitando desplazamiento físico para no reactivar el hover al salir
- en desktop, `Servicios` vuelve a resolverse como link inline simple dentro del navbar, sin chevron, dropdown ni expansión integrada
- el hero actual integra un efecto `GridScan` con `three` + `postprocessing` encapsulado como isla cliente, una capa de partículas lilas server-side circulares y sin blur con ciclos largos de aparición, deriva y desvanecimiento suave, y una secuencia tipográfica cliente con `SplitText` tanto para heading como para subheading antes del fade-up de CTAs
- la segunda sección pública verificable es una banda de propuesta de valor sobre base `#09090F`, con solo un acento radial lila muy contenido; la sección funciona ahora como stage sticky a pantalla completa, muestra una única frase centrada cada vez, hace progresar sus palabras de blanco con baja opacidad a `#E8E8F0` durante el tramo activo de scroll de cada statement y sincroniza además dos `abstract-icons` decorativos por frase con entrada `pop-in`, deriva lenta y salida por fade al cambiar de statement
- la tercera sección pública verificable es una sección de servicios heredada conceptualmente de `nebula-legacy`, retemada al sistema actual: arco sticky en desktop y lista vertical de cards en móvil, con cuatro capacidades públicas alineadas con el naming comercial vigente del estudio (`Desarrollo móvil`, `Desarrollo web`, `Evolución continua` y `Consultoría y digitalización`); cada card usa ahora estructura `heading superior / icono 3D central específico del servicio desde public/3d-Icons / descripción inferior / CTA secundario "Ver más"` con footprint `lg`, y añade un `BorderGlow` perimetral sutil sin alterar su geometría base; la sección reutiliza además la misma capa `HeroParticles` del hero como atmósfera de continuidad
- la cuarta sección pública verificable es `How we work`: una composición full-width de cards alternadas izquierda/derecha enlazadas por un path SVG que toca el viewport solo al entrar y al salir, reserva la mayor apertura de curva para los nodos intermedios, evita rebotar contra los bordes laterales en cada tramo y activa el despliegue de cada card un poco antes de alcanzar su nodo circular simple, opaco y con icono centrado; la sección vuelve a apoyarse sobre base `Void` como el resto de bloques públicos, mientras reserva la familia `Navy` `#0B0C17 -> #0D0F24 -> #0A0F2E` para las cards y el cierre tonal de los nodos, manteniendo el lila azulado de `services-carousel`, apoyado por `Haze`, para línea y halos contenidos; las cards ya no usan un segundo radial atmosférico en la esquina inferior derecha, el bloque elimina también el glow inferior derecho y todo el texto interno de las cards se resuelve en blanco
- no existe hoy ningún `proxy` o `middleware` montado para Supabase en el runtime público
- sigue pendiente la conexión del canal comercial real y cualquier capa backend live

## 6. Datos, auth e integraciones

- la capa de datos pública actual sigue siendo estática y hoy vive de forma distribuida entre catálogos locales como `data/services.ts` y copy embebido en las secciones de la home
- existe bootstrap de Supabase para SSR y CLI local, pero no un backend live verificado ni una conexión activa en el runtime público
- no existe auth activa, RBAC aplicado ni permisos runtime validados de extremo a extremo
- no hay integraciones externas activas en esta base
- variables reservadas para la futura reactivación de Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` y `SUPABASE_PROJECT_REF`
- la única variable pública realmente necesaria hoy para la web es `NEXT_PUBLIC_SITE_URL`

## 7. Validación y release

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- el `change-log` se mantiene repo-local, pero los scripts `changes:*` y `design:lint` no están expuestos hoy en `package.json`

Condiciones de release a vigilar:

- definir `NEXT_PUBLIC_SITE_URL` en producción
- revisar cualquier futura conexión de captación o integración externa
- mantener alineados `DESIGN.md`, `.agents/` y runtime cuando cambie la identidad o la narrativa pública

## 8. Riesgos abiertos

- dominio de producción pendiente de confirmación final
- canal de captación real pendiente de integrar
- sin test suite automatizada más allá de checks estáticos y build
- futura evolución a portfolio, formulario o backend live exigirá ampliar reglas, docs y validación proporcional
