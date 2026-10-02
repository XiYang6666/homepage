export interface BaseNavItem {
    type: NavItemTypes | undefined;
}

export interface LinkNavItem extends BaseNavItem {
    type: "link";
    name: string;
    link: string;
    target: string | undefined;
    external: boolean | undefined;
}

export interface LineNavItem extends BaseNavItem {
    type: "line";
    lines: Record<string, string>;
}

export type NavItem = LinkNavItem | LineNavItem;
export type NavItemTypes = "link" | "line";

