"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { StaggeredMenuItem, StaggeredMenuProps } from "@/components/StaggeredMenu";
import type { PublicNavLink } from "@/data/navigation";

import "@/components/StaggeredMenu.css";

type NavbarStaggeredMenuProps = {
  links: readonly PublicNavLink[];
  ctas: readonly PublicNavLink[];
  onOpenChange?: (open: boolean) => void;
};

const MENU_IDLE_PRELOAD_DELAY_MS = 5200;

const DynamicStaggeredMenu = dynamic<StaggeredMenuProps>(
  () => import("@/components/StaggeredMenu").then((module) => module.StaggeredMenu),
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
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

type MenuTriggerFallbackProps = {
  onActivate?: () => void;
  onIntent?: () => void;
};

function MenuTriggerFallback({ onActivate, onIntent }: MenuTriggerFallbackProps) {
  return (
    <div className="nebula-navbar-menu staggered-menu-wrapper" data-position="right">
      <button
        className="sm-toggle"
        aria-label="Abrir menú"
        aria-expanded={false}
        aria-controls="staggered-menu-panel"
        onClick={onActivate}
        onFocus={onIntent}
        onPointerEnter={onIntent}
        onTouchStart={onIntent}
        type="button"
      >
        <span className="sm-icon" aria-hidden="true">
          <span className="sm-icon-lines">
            <span className="sm-icon-line" style={{ transform: "translateY(-5px)" }} />
            <span className="sm-icon-line" />
            <span className="sm-icon-line" style={{ transform: "translateY(5px)" }} />
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

  const loadMenu = useCallback(() => {
    setShouldLoadMenu(true);
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
        idleHandle = browserWindow.requestIdleCallback(loadMenu, { timeout: 1200 });
        return;
      }

      loadMenu();
    }, MENU_IDLE_PRELOAD_DELAY_MS);

    return () => {
      window.clearTimeout(timer);

      if (idleHandle !== null) {
        const browserWindow = window as BrowserWindowWithIdle;
        browserWindow.cancelIdleCallback?.(idleHandle);
      }
    };
  }, [loadMenu, shouldLoadMenu]);

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
        <MenuTriggerFallback onActivate={activateMenu} onIntent={loadMenu} />
      )}
    </div>
  );
}
