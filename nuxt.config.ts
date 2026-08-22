// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss"],
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
        "/": {
            swr: true,
        },
    },
    runtimeConfig: {
        public: {
            title: "Example's Homepage",
            ownerEmail: "example@example.com",
            ownerName: "ExampleName",
            ownerFormerName: "ExampleFormer",
            welcome: "Welcome to Example's homepage",
            description: "Example's homepage",
            links: {},
            socials: {},
            footer: "an example footer",
            meta: [],
            lang: "zh-CN",
        },

        hitokotoUrl: "https://v1.hitokoto.cn",
        gravatarUrl: "https://gravatar.com",
        avatarCacheTime: 60 * 60 * 1000, // 1 hour
        avatarProxy: false,
        imageHosting: false,
        imageLinks: [],
    },

    experimental: {
        writeEarlyHints: true,
    },

    compatibilityDate: "2025-08-11",
});
