export interface BaseNavItem {
    type?: NavItemTypes;
}

export interface LinkNavItem extends BaseNavItem {
    type?: "link";
    name: string;
    link: string;
    target?: string;
    external?: boolean;
}

export interface LineNavItem extends BaseNavItem {
    type?: "line";
    lines: Record<string, string>;
}

export type NavItem = LinkNavItem | LineNavItem;
export type NavItemTypes = "link" | "line";
