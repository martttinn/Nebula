# Technical Reference

Documento mínimo para describir la arquitectura técnica real de la web pública de Nebula Studios.

## 1. Resumen del sistema

- el repo construye la web pública de marketing de Nebula Studios
- el runtime principal es Next.js 16 con App Router
- hoy existe una landing pública single-page con metadata, `icon.svg`, `robots.ts` y `sitemap.ts`
- existe un canal comercial directo por email versionado en `lib/site.ts`; siguen en roadmap el formulario, el calendario y cualquier futura capa backend live

## 2. Stack verificado

Verificado el **2026-05-19** contra `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.cjs` y dependencias instaladas:

- Next.js `16.2.6`
- React `19.2.6`
- React DOM `19.2.6`
- TypeScript `6.0.3`
- Tailwind CSS `4.3.0`
- `@tailwindcss/postcss` `4.3.0`
- Motion for React `12.39.0` vía `motion/react`
- GSAP `3.15.x`
- Lenis `1.3.23`
- PostCSS `8.5.15`
- Three.js `0.184.x`
- Postprocessing `6.39.x`
- Remotion `4.0.463`
- `@remotion/cli` `4.0.463`
- `@remotion/google-fonts` `4.0.463`
- `@vercel/analytics` `2.0.1`
- `@vercel/speed-insights` `2.0.0`
- `tech-stack-icons` `3.7.1`
- React Doctor `0.2.1` verificado por ejecucion bajo demanda el `2026-05-18`; uso con `npx react-doctor@latest`, no instalado en `package.json`
- `class-variance-authority`, `@radix-ui/react-slot`, `clsx`, `tailwind-merge`
- `@supabase/ssr`, `@supabase/supabase-js`
- Supabase CLI repo-local (`supabase`) `2.100.1`
- sin tests automatizados dedicados; la validación disponible hoy es `lint`, `typecheck`, `build` y scripts de `change-log`

## 3. Estructura del repo

- `app/`: layout global, homepage, metadata derivada, `icon.svg`, `robots.ts`, `sitemap.ts` y CSS global con utilidades de compatibilidad puntuales para imports externos
- `components/home/`: secciones y piezas específicas de la landing pública
- `components/home/value-proposition-section/`: carpeta de la banda editorial de benefits; `index.tsx` compone el wrapper público, `statements.tsx` orquesta el stage sticky y el coloreado palabra a palabra, `content.ts` centraliza copy y ornamentos, y `ornaments.module.css` encapsula la deriva visual de `abstract-icons`
- `components/home/services-carousel/`: carpeta de la sección de servicios; `index.tsx` orquesta la variante desktop sticky y la variante móvil, `geometry.ts` concentra el reparto en arco y `primitives.tsx` reúne el chrome y el contenido visual de cada card
- `components/home/how-we-work/`: carpeta de la sección pública de proceso; `index.tsx` orquesta scroll, medición del path y variantes desktop/mobile, `path.ts` encapsula la geometría SVG y `primitives.tsx` reúne cards, nodos ilustrados y conector visual
- `components/home/projects-showcase/`: carpeta de la sección pública de proyectos destacados; `index.tsx` resuelve el pinning del heading y la secuencia completa de tres proyectos full-screen que se superponen por scroll sobre el mismo stage
- `components/home/testimonials/`: carpeta de la sección pública de prueba social; `index.tsx` monta una stage cliente con stack sticky desktop inspirado en `ServicesClient` de Golden Grama, `archive.ts` conserva las tres reseñas verificadas como fuente repo-safe y expone `headline/summary` para el render ligero de cada card, `cta.ts` centraliza el copy y la imagen temporal de la última card comercial y `grid-distortion-shell.tsx` encapsula la carga cliente bajo demanda del fondo interactivo
- `components/BorderGlow.tsx`: primitive cliente reutilizable inspirada en React Bits para acentos perimetrales de glow guiados por proximidad de puntero
- `components/GridDistortion.tsx` y `components/GridDistortion.css`: componente importado desde el registry de React Bits sin editar, usado hoy como fondo de la última card de `testimonials`
- `components/magicui/border-beam.tsx`: componente `BorderBeam` extraido tal cual desde el repo original de Magic UI (`apps/www/registry/magicui/border-beam.tsx`); `app/globals.css` añade las utilidades literales necesarias para que sus clases de Tailwind 4 funcionen en el stack actual con Tailwind 3.4.x
- `components/layout/brand-lockup.tsx`: primitive server-first compartida para el lockup de marca reutilizado por navbar y footer
- `components/layout/footer.tsx`: footer público de marca + navegación, con links reales compartidos y legales visibles pero desactivados
- `components/layout/`: shell primitives globales reutilizables, incluido el navbar
- `components/animate-ui/`: primitives y wrappers de UI importados desde registries externas y reencuadrados al lenguaje visual del proyecto
- `components/ui/`: primitives reutilizables
- `public/`: assets estáticos públicos como imágenes, logos, iconos y ficheros descargables
- `remotion/`: subsistema local de vídeo `dev-only`, aislado del runtime público de Next; contiene entrypoint, raíz de composiciones, piezas editoriales, tokens, fuentes y helpers de assets para render local con Remotion
- `data/`: contenido estático del sitio y configuración pública
- `lib/`: helpers de metadata, URL absoluta, contacto público y utilidades compartidas
- `lib/supabase/`: bootstrap SSR de Supabase para cliente, servidor y middleware futuro
- `components/home/hero/`: carpeta canónica del hero; `index.tsx` compone la shell pública, `lead.tsx` orquesta la secuencia tipográfica y los CTAs, `dot-field.tsx` encapsula la isla canvas del fondo y `particles.tsx` expone una primitive server-side de partículas lilas reutilizada como atmósfera de continuidad en secciones posteriores
- `components/ui/word-by-word-color-change.tsx`: primitive cliente reusable que interpola color palabra a palabra en función del progreso de scroll de un bloque local o de un progreso externo compartido, con colores configurables por consumo
- `data/services.ts`: catálogo estático de servicios públicos para la sección carrusel
- `components/layout/navbar.tsx`: navbar global reusable con una sola superficie glass y composición `logo / links / CTAs`
- `data/navigation.ts`: catálogo compartido de navegación pública y links legales; separa `PUBLIC_NAVBAR_LINKS` para el navbar visible y `PUBLIC_NAV_LINKS` para el set más amplio consumido por el footer
- `components/layout/lenis-provider.tsx`: integración global cliente de `Lenis` sobre el scroll raíz, con respeto por `prefers-reduced-motion`
- `components/layout/scroll-progress-bar.tsx`: indicador global de progreso de scroll fijado al borde superior del viewport, con suavizado cliente ligero propio y render tipo scrollbar premium
- `components/layout/navbar-staggered-menu.tsx`: isla cliente del navbar para móvil y tablet, basada en `StaggeredMenu`
- `components/StaggeredMenu.tsx`: componente importado desde React Bits y adaptado al App Router y al routing interno de Next.js
- `components/StaggeredMenu.css`: stylesheet del menú escalonado retemado al lenguaje dark-tech de Nebula
- `components/animate-ui/primitives/buttons/button.tsx`: primitive motion base para interacciones de botón con `hoverScale` y `tapScale`
- `components/animate-ui/components/buttons/button.tsx`: wrapper Nebula sobre la primitive motion compartida, usado como base de la primitive pública `components/ui/button.tsx`
- `components/ui/preloader.tsx`: overlay de entrada con branding y barra de progreso para la home pública, coordinado con el readiness del hero y con salida acotada para no bloquear innecesariamente el primer contenido
- `components/ui/split-text.tsx`: primitive reusable inspirada en `SplitText` de React Bits para reveals escalonados por caracteres o palabras
- `components/ui/nebula-logo-animated.tsx`: logotipo animado reutilizado desde `nebula-legacy` para el preloader
- `components/ui/tech-stack-icon.tsx`: wrapper server-first sobre `tech-stack-icons` para iconografía tecnológica sin contaminar bundles cliente por accidente
- `components/ui/lazy-tech-stack-icon.tsx`: fallback cliente con `next/dynamic` + `IntersectionObserver`, reservado para superficies que no puedan permanecer server-side
- `supabase/`: configuración del CLI local, seeds y migraciones versionadas
- `.agents/`: reglas, roles, workflows, skills y decisiones del sistema de agentes
- `DESIGN.md`: canon visual reutilizable, conectado con los tokens de `app/globals.css`, `tailwind.config.cjs` y primitives UI
- `doc/`: referencia técnica, dominio y `change-log`
- `scripts/`: tooling del `change-log`

## 4. Arquitectura objetivo

Dirección preferida para código nuevo:

1. ruta / layout / metadata
2. sección o componente route-level
3. primitive UI o helper reutilizable
4. catálogo estático o lógica compartida en `data/` / `lib/`
5. futura capa de datos o backend cuando exista

Política estructural activa para `components/home/`:

- cada sección pública sustancial vive en una carpeta canónica propia
- `index.tsx` es el entrypoint público de esa carpeta
- el resto de piezas se colocalizan por responsabilidad (`primitives.tsx`, `constants.ts`, `types.ts`, `content.ts`, `geometry.ts`/`path.ts`, CSS Module si aplica)
- los consumers route-level deben importar el path de directorio canónico; los wrappers en la raíz de `components/home/` no forman parte del estado objetivo

## 5. Runtime actual

- el runtime público actual ya expresa hero, propuesta de valor, servicios, proceso, proyectos, `testimonials` con cierre `#contacto` y un footer de marca + navegación; el contacto directo por email y teléfono ya está conectado mediante `mailto:` y `tel:`, pero siguen pendientes formulario, calendario y backend de captación
- el repo expone además un subsistema `dev-only` de vídeo en `remotion/`, pensado para Studio y renders locales; no crea rutas públicas en Next ni comparte directamente componentes acoplados a `next/image`, `next/font` o lógica scroll-driven del sitio
- a fecha `2026-05-07`, el subsistema de vídeo verifica ya dos composiciones locales: `NebulaShowcase` como smoke test técnico y `NebulaEditorialIntro` como intro editorial cinematográfica inicial del negocio y de la web pública
- `nebula-legacy` sigue existiendo como superficie de referencia puntual para migrar piezas visuales seleccionadas, como el preloader, el logo animado y ahora el carrusel de servicios
- `DESIGN.md` y la implementación base están alineados en palette, tipografía y components shell
- la home monta ya el navbar pill reusable como navegación visible de primer nivel
- la home monta también un `Preloader` de branding con salida coordinada con la señal `hero-grid-ready` emitida por el fondo del hero; mientras permanece visible bloquea scroll e interaccion global del contenido subyacente y detiene explícitamente la instancia root de `Lenis`. La duracion minima queda acotada en `900ms`, el timeout de seguridad en `2500ms` y la señal `hero-intro-start` se lanza antes de ocultar el overlay para que la secuencia del hero no espere a que termine todo el fade del loader
- inmediatamente después del hero, la home añade una banda editorial de propuesta de valor con dos frases activas y cambio de color palabra a palabra guiado por scroll
- el icono del sitio usa `app/icon.svg` con el símbolo oficial oscuro de Nebula
- el root layout monta ya `Analytics` desde `@vercel/analytics/next` y `SpeedInsights` desde `@vercel/speed-insights/next`, de modo que el runtime queda preparado para recoger page views, visitantes y métricas de rendimiento reales cuando exista despliegue en Vercel y Web Analytics esté habilitado en el dashboard
- las variants reutilizables de botón comparten ya una base motion importada desde `animate-ui`, mientras mantienen el styling propio de Nebula en la capa wrapper
- cualquier consumo de `tech-stack-icons` debe pasar por wrappers propios: `components/ui/tech-stack-icon.tsx` como ruta recomendada server-first y `components/ui/lazy-tech-stack-icon.tsx` solo cuando un icono deba vivir obligatoriamente dentro de un Client Component; el paquete publica un bundle monolítico y no debe importarse de forma directa en islands cliente críticas
- el scroll raíz del sitio puede suavizarse con `Lenis`, con anclas internas habilitadas y offset para el navbar fijo; cualquier superficie anidada que deba preservar interacción propia debe evaluarse con opt-out granular y nunca con bloqueo total si rompe la navegación natural del documento
- el root layout monta también un indicador global de progreso de scroll en el borde superior del viewport, tipo scrollbar fino, con línea base muy tenue, fill lilac/silver y una interpolación ligera propia para que el avance no quede duro ni dependiente del valor instantáneo del scroll
- el navbar público replica el patrón de `nebula-legacy`: se oculta al hacer scroll descendente pasado un umbral, reaparece al remontar o cerca del top y se mantiene visible mientras el menú responsive está abierto
- en móvil y tablet, el navbar colapsa a lockup + hamburguesa, y usa un overlay escalonado fullscreen basado en `StaggeredMenu`; el toggle morfea a `X` con Motion for React vía `motion/react`, y todos los destinos activos del navbar, incluido `Contactar`, se renderizan como links tipográficos del mismo sistema, con cierre por `Escape`, foco inicial dentro del panel y retorno de foco al trigger. Desktop mantiene la navegación inline y el CTA premium originales
- el navbar público deja solo el CTA `Contactar`, resuelto ahora sobre la primitive estándar `Button` como outlined transparente en reposo, con borde claro, hover blanco con texto negro, escala `1.05` y `BorderBeam` original de Magic UI montado dentro del link en desktop; con `prefers-reduced-motion`, el beam animado no se renderiza
- los links centrales del navbar usan una transición con inercia suave en `hover`, basada en microescala y curva elástica contenida, evitando desplazamiento físico para no reactivar el hover al salir
- en desktop, `Servicios` vuelve a resolverse como link inline simple dentro del navbar, sin chevron, dropdown ni expansión integrada; `Blog` queda fuera del navbar visible mientras no exista una superficie pública real de blog
- el hero actual integra un `DotField` en canvas encapsulado como isla cliente, con un gradiente de transición aplicado solo en su mitad inferior para coser el cierre con la siguiente sección sin afectar la legibilidad del campo en la mitad superior; el heading principal se renderiza de forma inmediata para no ocultar el elemento LCP y la secuencia cliente reserva `SplitText` para el subheading antes del fade-up de CTAs
- la segunda sección pública verificable es una banda de propuesta de valor sobre base `#09090F`, con solo un acento radial lila muy contenido; la sección funciona ahora como stage sticky a pantalla completa, muestra una única frase centrada cada vez, hace progresar sus palabras de blanco con baja opacidad a `#E8E8F0` durante el tramo activo de scroll de cada statement y sincroniza además dos `abstract-icons` decorativos por frase con entrada `pop-in`, deriva lenta y salida por fade al cambiar de statement. El catálogo ornamental valida ya que no existan posiciones repetidas entre frases ni en desktop ni en móvil
- la tercera sección pública verificable es una sección de servicios heredada conceptualmente de `nebula-legacy`, retemada al sistema actual: arco sticky en desktop y lista vertical de cards en móvil, con cuatro capacidades públicas alineadas con el naming comercial vigente del estudio (`Desarrollo móvil`, `Desarrollo web`, `Evolución continua` y `Consultoría y digitalización`); cada card usa ahora estructura `heading superior / icono 3D central específico del servicio desde public/3d-Icons / descripción inferior / CTA secundario "Ver más"` con footprint `lg`, añade un `BorderGlow` perimetral sutil sin alterar su geometría base y vuelve a montar `HeroParticles` como atmósfera de continuidad en desktop y móvil
- la cuarta sección pública verificable es `How we work`: una composición full-width de cards alternadas izquierda/derecha enlazadas por un path SVG que toca el viewport solo al entrar y al salir, reserva la mayor apertura de curva para los nodos intermedios, evita rebotar contra los bordes laterales en cada tramo y activa el despliegue de cada card un poco antes de alcanzar su nodo circular simple, opaco y con icono centrado; la sección vuelve a apoyarse sobre base `Void` como el resto de bloques públicos, mientras reserva la familia `Navy` `#0B0C17 -> #0D0F24 -> #0A0F2E` para las cards y el cierre tonal de los nodos, manteniendo el lila azulado de `services-carousel`, apoyado por `Haze`, para línea y halos contenidos; las cards ya no usan un segundo radial atmosférico en la esquina inferior derecha, el bloque elimina también el glow inferior derecho, todo el texto interno de las cards se resuelve en blanco y `HeroParticles` vuelve a actuar como capa atmosférica secundaria
- la quinta sección pública verificable es `Projects showcase`: una surface de portfolio después de `How we work` que usa un heading grande centrado como pausa narrativa antes de dejar entrar tres paneles de proyecto. El primero asciende desde abajo en una versión todavía compacta, se desliza por encima del heading sticky sin desplazarlo, se asienta centrado y luego crece de forma progresiva hasta ocupar toda la pantalla; después, el segundo cruza de derecha a izquierda empujando el primer panel fuera de escena y el tercero también de derecha a izquierda empujando el segundo. El último takeover no añade ya un gesto de salida dedicado: el stage cede al siguiente bloque por scroll normal, sin encogido adicional ni sección posterior montada por detrás. Desktop mantiene esa coreografía full-screen; móvil y tablet degradan ya a una lista vertical de cards simplificadas con visual superior, título, descripción y CTA visible por proyecto
- la sexta sección pública verificable es `Testimonials`: una capa de prueba social inmediatamente posterior a `Projects showcase`, resuelta en `lg+` como una stage pinned real con `header + primera card` fijados en pantalla y las siguientes cards entrando desde abajo para deslizarse por encima de la anterior y apilarse progresivamente. El pinning desktop se controla con una fase `before/active/after` y un wrapper `fixed/absolute`, no con `position: sticky` puro dentro del shell; el fondo atmosférico queda anclado al mismo stage, vuelve a incluir `HeroParticles` detrás del contenido y el stack deja visible un pequeño labio superior de la card previa cuando entra la siguiente. Ese flujo toma como referencia el comportamiento sticky de `ServicesClient` en Golden Grama, pero sigue retemado al sistema visual de Nebula. Móvil y tablet degradan a una lista vertical simple con `HeroParticles` como apoyo atmosférico. El contenido sale de `components/home/testimonials/archive.ts`, que reúne tres reseñas públicas verificadas: `Raúl Rodríguez / Canal3Networks`, `Javier Martinez / Golden Grama` y `Eduardo Martinez / Future Nova`, y la última card del stack funciona ya como cierre comercial `#contacto` con `GridDistortion` importado tal cual desde React Bits, apoyado sobre el asset local `public/backgrounds/cta-background.png`, cargado por proximidad al viewport desde `grid-distortion-shell.tsx`, y un botón `mailto:` hacia `hola@somosnebula.com`
- después de `Testimonials`, la home cierra con `Footer`: una surface sobria de marca + navegación que reutiliza el mismo lockup del navbar, organiza el cierre desktop en cuatro columnas superiores (`marca/contacto + navegación + estudio + legal`) y una barra inferior con copyright y legales, muestra email, teléfono y botones sociales en la columna de contacto, consume la navegación pública desde un catálogo compartido y mantiene `Términos y condiciones` y `Política de privacidad` como links visibles pero desactivados mientras esas páginas no existan
- no existe hoy ningún `proxy` o `middleware` montado para Supabase en el runtime público
- siguen pendientes formulario, calendario, CRM y cualquier capa backend live; los canales directos actuales son email por `mailto:` y teléfono por `tel:`

## 6. Datos, auth e integraciones

- la capa de datos pública actual sigue siendo estática y hoy vive de forma distribuida entre catálogos locales como `data/services.ts` y copy embebido en las secciones de la home
- `lib/site.ts` centraliza el email público `hola@somosnebula.com`, el teléfono `+34 622 028 550`, sus hrefs `mailto:` / `tel:` asociados y las URLs sociales visibles del footer para evitar duplicación de contacto
- existe bootstrap de Supabase para SSR y CLI local, pero no un backend live verificado ni una conexión activa en el runtime público
- no existe auth activa, RBAC aplicado ni permisos runtime validados de extremo a extremo
- la base incluye observabilidad pública de Vercel mediante Web Analytics y Speed Insights; la recogida real depende de despliegue en Vercel, configuración activa del proyecto y tráfico real suficiente para estabilizar percentiles de campo
- variables reservadas para la futura reactivación de Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` y `SUPABASE_PROJECT_REF`
- la única variable pública realmente necesaria hoy para la web es `NEXT_PUBLIC_SITE_URL`

## 7. Validación y release

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npx react-doctor@latest` para diagnósticos puntuales de React/Next.js sobre seguridad, rendimiento, corrección, accesibilidad, bundle y arquitectura
- `npm run changes:validate`
- `npm run changes:index`
- `npm run changes:sync`
- `npm run video:still -- NebulaShowcase renders/nebula-poster.png --frame 0`
- `npm run video:render -- NebulaShowcase renders/nebula-showcase.mp4`
- `npm run video:still -- NebulaEditorialIntro renders/nebula-editorial-intro-close.png --frame 314`
- `npm run video:render -- NebulaEditorialIntro renders/nebula-editorial-intro.mp4`
- el `change-log` se mantiene repo-local y ya expone `changes:entry:new`, `changes:group:new`, `changes:validate`, `changes:index` y `changes:sync`; `design:lint` sigue sin existir hoy en `package.json`

Condiciones de release a vigilar:

- definir `NEXT_PUBLIC_SITE_URL` en producción
- revisar cualquier futura conexión de captación o integración externa
- mantener alineados `DESIGN.md`, `.agents/` y runtime cuando cambie la identidad o la narrativa pública

## 8. Riesgos abiertos

- dominio de producción pendiente de confirmación final
- formulario, calendario o CRM de captación pendiente de integrar; email directo ya conectado por `mailto:`
- sin test suite automatizada más allá de checks estáticos y build
- futura evolución a case studies profundos, formulario o backend live exigirá ampliar reglas, docs y validación proporcional
