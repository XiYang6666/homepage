import type { BaseNavItem, NavItemTypes } from "~~/shared/types/navItem";

export default function (navItem: BaseNavItem): NavItemTypes | void {
    if (navItem.type) return navItem.type;
    if ("name" in navItem && "link" in navItem) return "link";
    if ("lines" in navItem) return "line";
    return;
}

