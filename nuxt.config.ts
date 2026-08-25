// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
    css: ["assets/style.css", "assets/animations.css"],
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
        public: {
            title: "Example's Homepage",
            ownerName: "ExampleName",
            ownerFormerName: "ExampleFormer",
            ownerEmail: "example@example.com",
            welcome: "Welcome to Example's homepage",
            description: "Example's homepage",
            links: [],
            socials: [],
            friendLinks: [],
            footer: "an example footer",
            meta: [],
            lang: "zh-CN",
        },

        hitokotoUrl: "https://v1.hitokoto.cn",
        hitokotoCacheTime: 10,
        gravatarUrl: "https://gravatar.com",
        avatarCacheTime: 60 * 60, // 1 hour
        avatarProxy: false,
        imageHosting: false,
        imageLinks: [],

        aboutMarkdownUrl: "https://raw.githubusercontent.com/_Example/_Example/refs/heads/master/README.md",
        aboutCacheTime: 60 * 60, //1 hour
    },

    experimental: {
        writeEarlyHints: true,
        viewTransition: true,
    },

    compatibilityDate: "2025-08-11",
});

