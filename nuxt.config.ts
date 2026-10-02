// https://nuxt.com/docs/api/configuration/nuxt-config
import type { Meta } from "@unhead/vue";
import type { FriendItem } from "./shared/types/friendItem";
import type { NavItem } from "./shared/types/navItem";
import type { SocialItem } from "./shared/types/socialItem";

// untyped 无法从空数组推断出元素类型，这里用类型断言显式指定；
// 文件末尾的 module augmentation 会通过 typeof 自动继承这些类型。
const publicRuntimeConfig = {
    title: "Example's Homepage",
    ownerName: "ExampleName",
    ownerFormerName: "ExampleFormer",
    ownerEmail: "example@example.com",
    welcome: "Welcome to Example's homepage",
    description: "Example's homepage",
    links: [] as NavItem[],
    socials: [] as SocialItem[],
    friends: [] as FriendItem[],
    footer: "an example footer",
    meta: [] as Meta[],
    lang: "zh-CN",
};

const privateRuntimeConfig = {
    hitokotoUrl: "https://v1.hitokoto.cn",
    hitokotoCacheTime: 10,
    gravatarUrl: "https://gravatar.com",
    avatarCacheTime: 60 * 60, // 1 hour
    avatarProxy: false,
    imageHosting: false,
    imageLinks: [] as string[],
    aboutMarkdownUrl: "https://raw.githubusercontent.com/_Example/_Example/refs/heads/master/README.md",
    aboutCacheTime: 60 * 60, // 1 hour
    apiTimeout: 5000, // 外部 API 超时（毫秒）
};

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
    css: ["assets/style.css"],
    app: {
        head: {
            link: [
                {
                    rel: "icon",
                    href: "/favicon.ico",
                },
            ],
        },
    },
    routeRules: {
        "/": { swr: true },
        "/about": { swr: true },
        "/friends": { swr: true },
    },
    runtimeConfig: {
        ...privateRuntimeConfig,
        public: publicRuntimeConfig,
    },
    experimental: {
        writeEarlyHints: true,
        viewTransition: true,
    },
    compatibilityDate: "2025-08-11",
});

// 让 useRuntimeConfig() 返回强类型：untyped 只会把空数组推断成 any[]，
// 这里用 typeof 从上方常量自动继承数组字段的真实类型，避免两处维护。
declare module "nuxt/schema" {
    interface PublicRuntimeConfig {
        links: (typeof publicRuntimeConfig)["links"];
        socials: (typeof publicRuntimeConfig)["socials"];
        friends: (typeof publicRuntimeConfig)["friends"];
        meta: (typeof publicRuntimeConfig)["meta"];
    }

    interface RuntimeConfig {
        imageLinks: (typeof privateRuntimeConfig)["imageLinks"];
    }
}
