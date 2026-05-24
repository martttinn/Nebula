"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
} from "react";

import type {
  StaggeredMenuItem,
  StaggeredMenuProps,
} from "@/components/StaggeredMenu";
import type { PublicNavLink } from "@/data/navigation";

type NavbarStaggeredMenuProps = {
  links: readonly PublicNavLink[];
  ctas: readonly PublicNavLink[];
  onOpenChange?: (open: boolean) => void;
};

const MENU_IDLE_PRELOAD_DELAY_MS = 5200;

let staggeredMenuPreloadPromise: Promise<
  ComponentType<StaggeredMenuProps>
> | null = null;

function preloadStaggeredMenu() {
  staggeredMenuPreloadPromise ??= import("@/components/StaggeredMenu").then(
    (module) => module.StaggeredMenu,
  );

  return staggeredMenuPreloadPromise;
}

const DynamicStaggeredMenu = dynamic<StaggeredMenuProps>(
  () => preloadStaggeredMenu(),
  {
    ssr: false,
    loading: () => <MenuTriggerFallback />,
  },
);

function toMenuItem(link: PublicNavLink): StaggeredMenuItem {
  return {
    label: link.label,
    ariaLabel: `Ir a ${link.label}`,
    link: link.href,
  };
}

type BrowserWindowWithIdle = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      callback: () => void,
      options?: { timeout: number },
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

type MenuTriggerFallbackProps = {
  onActivate?: () => void;
  onIntent?: () => void;
};

function MenuTriggerFallback({
  onActivate,
  onIntent,
}: MenuTriggerFallbackProps) {
  return (
    <div
      className="pointer-events-auto relative z-[1] flex items-center justify-end"
      data-position="right"
    >
      <button
        className="relative inline-flex min-h-12 min-w-12 cursor-pointer items-center justify-center rounded-full border border-transparent bg-transparent p-[0.45rem] text-nebula-silver transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-nebula-lilac/80"
        aria-label="Abrir menú"
        aria-expanded={false}
        aria-controls="staggered-menu-panel"
        onClick={onActivate}
        onFocus={onIntent}
        onPointerEnter={onIntent}
        onTouchStart={onIntent}
        type="button"
      >
        <span
          className="relative inline-flex size-5 items-center justify-center"
          aria-hidden="true"
        >
          <span className="relative size-full">
            <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-[6px] rounded-full bg-current" />
            <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-current" />
            <span className="absolute left-0 top-1/2 h-0.5 w-full translate-y-1 rounded-full bg-current" />
          </span>
        </span>
      </button>
    </div>
  );
}

export function NavbarStaggeredMenu({
  links,
  ctas,
  onOpenChange,
}: NavbarStaggeredMenuProps) {
  const [shouldLoadMenu, setShouldLoadMenu] = useState(false);
  const [openAfterLoad, setOpenAfterLoad] = useState(false);
  const items = useMemo(
    () => [
      ...links.map((link) => toMenuItem(link)),
      ...ctas.map((cta) => toMenuItem(cta)),
    ],
    [ctas, links],
  );

  const preloadMenu = useCallback(() => {
    void preloadStaggeredMenu();
  }, []);

  const activateMenu = useCallback(() => {
    setOpenAfterLoad(true);
    setShouldLoadMenu(true);
  }, []);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setOpenAfterLoad(false);
      }

      onOpenChange?.(open);
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (shouldLoadMenu) {
      return;
    }

    let idleHandle: number | null = null;
    const timer = window.setTimeout(() => {
      const browserWindow = window as BrowserWindowWithIdle;

      if (browserWindow.requestIdleCallback) {
        idleHandle = browserWindow.requestIdleCallback(preloadMenu, {
          timeout: 1200,
        });
        return;
      }

      preloadMenu();
    }, MENU_IDLE_PRELOAD_DELAY_MS);

    return () => {
      window.clearTimeout(timer);

      if (idleHandle !== null) {
        const browserWindow = window as BrowserWindowWithIdle;
        browserWindow.cancelIdleCallback?.(idleHandle);
      }
    };
  }, [preloadMenu, shouldLoadMenu]);

  return (
    <div className="ml-auto flex shrink-0 items-center xl:hidden">
      {shouldLoadMenu ? (
        <DynamicStaggeredMenu
          className="nebula-navbar-menu"
          position="right"
          displayItemNumbering
          colors={[
            "rgba(83, 74, 183, 0.88)",
            "rgba(52, 47, 96, 0.96)",
            "rgba(20, 22, 37, 0.98)",
            "rgba(9, 9, 15, 1)",
          ]}
          accentColor="#B5B1E3"
          menuButtonColor="#E8E8F0"
          closeOnClickAway
          onOpenChange={handleOpenChange}
          initialOpen={openAfterLoad}
          items={items}
        />
      ) : (
        <MenuTriggerFallback onActivate={activateMenu} onIntent={preloadMenu} />
      )}
    </div>
  );
}
