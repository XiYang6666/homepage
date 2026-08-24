export declare interface BaseNavItem {
    type: NavItemTypes | undefined;
}

export declare interface LinkNavItem extends BaseNavItem {
    type: "link";
    name: string;
    link: string;
    target: string | undefined;
    external: boolean | undefined;
}

export declare interface LineNavItem extends BaseNavItem {
    type: "line";
    lines: Record<string, string>;
}

export declare type NavItem = LinkNavItem | LineNavItem;
export declare type NavItemTypes = "link" | "line";

