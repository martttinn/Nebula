"use client";

import { StaggeredMenu, type StaggeredMenuItem } from "@/components/StaggeredMenu";

type NavbarLink = {
  label: string;
  href: string;
};

type NavbarStaggeredMenuProps = {
  links: NavbarLink[];
  ctas: NavbarLink[];
  onOpenChange?: (open: boolean) => void;
};

function toMenuItem(link: NavbarLink): StaggeredMenuItem {
  return {
    label: link.label,
    ariaLabel: `Ir a ${link.label}`,
    link: link.href,
  };
}

export function NavbarStaggeredMenu({
  links,
  ctas,
  onOpenChange,
}: NavbarStaggeredMenuProps) {
  const items = [
    ...links.map((link) => toMenuItem(link)),
    ...ctas.map((cta) => toMenuItem(cta)),
  ];

  return (
    <div className="ml-auto flex shrink-0 items-center xl:hidden">
      <StaggeredMenu
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
        onOpenChange={onOpenChange}
        items={items}
      />
    </div>
  );
}
