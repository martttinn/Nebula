"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

import "@/components/StaggeredMenu.css";

function subscribeToHydration() {
  return () => {};
}

function getFirstMenuItem(panel: HTMLElement | null) {
  return panel?.querySelector<HTMLElement>(".sm-panel-item") ?? panel;
}

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  accentColor?: string;
  closeOnClickAway?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialOpen?: boolean;
}

export function StaggeredMenu({
  position = "right",
  colors = ["#B497CF", "#5227FF"],
  items = [],
  displayItemNumbering = true,
  className,
  menuButtonColor = "#fff",
  accentColor = "#5227FF",
  closeOnClickAway = true,
  onOpenChange,
  initialOpen = false,
}: StaggeredMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [isOverlayMounted, setIsOverlayMounted] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const pendingOpenRef = useRef(false);
  const initialOpenHandledRef = useRef(false);
  const canUsePortal = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  useLayoutEffect(() => {
    if (!canUsePortal || !isOverlayMounted) {
      return;
    }

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel) {
        return;
      }

      const preLayers = preContainer
        ? (Array.from(
            preContainer.querySelectorAll(".sm-prelayer"),
          ) as HTMLElement[])
        : [];
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }
      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    });

    return () => ctx.revert();
  }, [canUsePortal, isOverlayMounted, menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) {
      return null;
    }

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel"),
    ) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    ) as HTMLElement[];

    const offscreen = position === "left" ? -100 : 100;
    const layerStates = layers.map((element) => ({
      element,
      start: offscreen,
    }));

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { "--sm-num-opacity": 0 });
    }

    const timeline = gsap.timeline({ paused: true });

    layerStates.forEach((layerState, index) => {
      timeline.fromTo(
        layerState.element,
        { xPercent: layerState.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        index * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    timeline.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      timeline.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );

      if (numberEls.length) {
        timeline.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    openTlRef.current = timeline;
    return timeline;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) {
      return;
    }

    busyRef.current = true;
    const timeline = buildOpenTimeline();
    if (!timeline) {
      busyRef.current = false;
      return;
    }

    timeline.eventCallback("onComplete", () => {
      busyRef.current = false;
    });
    timeline.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback(
    (onComplete?: () => void) => {
      openTlRef.current?.kill();
      openTlRef.current = null;

      const panel = panelRef.current;
      const layers = preLayerElsRef.current;
      if (!panel) {
        onComplete?.();
        return;
      }

      closeTweenRef.current?.kill();
      const offscreen = position === "left" ? -100 : 100;
      closeTweenRef.current = gsap.to([...layers, panel], {
        xPercent: offscreen,
        duration: 0.32,
        ease: "power3.in",
        overwrite: "auto",
        onComplete: () => {
          const itemEls = Array.from(
            panel.querySelectorAll(".sm-panel-itemLabel"),
          ) as HTMLElement[];
          if (itemEls.length) {
            gsap.set(itemEls, { yPercent: 140, rotate: 10 });
          }

          const numberEls = Array.from(
            panel.querySelectorAll(
              ".sm-panel-list[data-numbering] .sm-panel-item",
            ),
          ) as HTMLElement[];
          if (numberEls.length) {
            gsap.set(numberEls, { "--sm-num-opacity": 0 });
          }

          busyRef.current = false;
          onComplete?.();
        },
      });
    },
    [position],
  );

  const restoreFocusToTrigger = useCallback(() => {
    const focusTarget = lastFocusedRef.current ?? toggleBtnRef.current;
    if (!focusTarget) {
      return;
    }

    requestAnimationFrame(() => {
      focusTarget.focus({ preventScroll: true });
    });
  }, []);

  const openMenu = useCallback(() => {
    if (openRef.current || busyRef.current) {
      return;
    }

    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : toggleBtnRef.current;
    openRef.current = true;
    pendingOpenRef.current = true;
    setIsOverlayMounted(true);
    setOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) {
      return;
    }

    openRef.current = false;
    setOpen(false);
    onOpenChange?.(false);
    restoreFocusToTrigger();
    playClose(() => {
      setIsOverlayMounted(false);
    });
  }, [onOpenChange, playClose, restoreFocusToTrigger]);

  const toggleMenu = useCallback(() => {
    if (openRef.current) {
      closeMenu();
      return;
    }

    openMenu();
  }, [closeMenu, openMenu]);

  useEffect(() => {
    if (!initialOpen || initialOpenHandledRef.current) {
      return;
    }

    initialOpenHandledRef.current = true;
    const frame = requestAnimationFrame(openMenu);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [initialOpen, openMenu]);

  useEffect(() => {
    if (!open || !isOverlayMounted || !pendingOpenRef.current) {
      return;
    }

    pendingOpenRef.current = false;
    playOpen();
  }, [isOverlayMounted, open, playOpen]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    const focusTarget = getFirstMenuItem(panel);
    if (!focusTarget) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      focusTarget.focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeMenu]);

  useEffect(() => {
    if (!closeOnClickAway || !open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  const handleItemSelection = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  const rootClassName =
    (className ? `${className} ` : "") + "staggered-menu-wrapper";
  const overlayClassName =
    (className ? `${className} ` : "") + "staggered-menu-overlay";
  const sharedStyle = accentColor
    ? ({ "--sm-accent": accentColor } as React.CSSProperties)
    : undefined;
  const iconTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1] as const,
      };

  const overlayContent = (
    <div
      className={overlayClassName}
      style={sharedStyle}
      data-position={position}
      data-open={open || undefined}
      aria-hidden={!open}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors.length
            ? colors.slice(0, 4)
            : ["#1e1e22", "#35353c"];
          const palette = [...raw];
          if (palette.length >= 3) {
            palette.splice(Math.floor(palette.length / 2), 1);
          }

          return palette.map((color, index) => (
            <div
              key={index}
              className="sm-prelayer"
              style={{ background: color }}
            />
          ));
        })()}
      </div>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
        aria-label="Menú principal"
        data-lenis-prevent
        tabIndex={-1}
      >
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items.length ? (
              items.map((item, index) => {
                const itemKey = `${item.label}-${index}`;
                const itemLabel = (
                  <span className="sm-panel-itemLabel">{item.label}</span>
                );
                const commonProps = {
                  className: "sm-panel-item",
                  "aria-label": item.ariaLabel,
                  "data-index": index + 1,
                  onClick: handleItemSelection,
                  tabIndex: open ? undefined : -1,
                } as const;

                if (/^(https?:)?\/\//.test(item.link)) {
                  return (
                    <li className="sm-panel-itemWrap" key={itemKey}>
                      <a
                        {...commonProps}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {itemLabel}
                      </a>
                    </li>
                  );
                }

                return (
                  <li className="sm-panel-itemWrap" key={itemKey}>
                    <Link {...commonProps} href={item.link}>
                      {itemLabel}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );

  return (
    <>
      <div
        className={rootClassName}
        style={sharedStyle}
        data-position={position}
      >
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
          data-open={open || undefined}
        >
          <span className="sm-icon" aria-hidden="true">
            <span className="sm-icon-lines">
              <motion.span
                className="sm-icon-line"
                initial={false}
                animate={{
                  rotate: open ? 45 : 0,
                  y: open ? 0 : -5,
                }}
                transition={iconTransition}
              />
              <motion.span
                className="sm-icon-line"
                initial={false}
                animate={{
                  opacity: open ? 0 : 1,
                  scaleX: open ? 0.56 : 1,
                }}
                transition={iconTransition}
              />
              <motion.span
                className="sm-icon-line"
                initial={false}
                animate={{
                  rotate: open ? -45 : 0,
                  y: open ? 0 : 5,
                }}
                transition={iconTransition}
              />
            </span>
          </span>
        </button>
      </div>
      {canUsePortal && isOverlayMounted
        ? createPortal(overlayContent, document.body)
        : null}
    </>
  );
}
