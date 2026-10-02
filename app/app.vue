<template>
    <div class="bg h-dvh w-dvw overflow-hidden bg-black bg-opacity-80 flex items-center justify-center flex-col">
        <main class="content flex items-center flex-col max-h-[calc(100dvh-20rem)] sm:max-h-[calc(100dvh-16rem)]">
            <NuxtPage />

            <span class="description text-lg text-zinc-400 font-thin text-center">{{ config.public.welcome }}</span>
        </main>

        <nav class="flex items-center flex-col mt-6 gap-8" style="view-transition-name: nav">
            <NavList />
            <SocialList />
        </nav>

        <Footer />
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

useSeoMeta({
    titleTemplate: (title) => (title ? `${config.public.title} | %s` : config.public.title),
    description: config.public.description,
});
useHead({
    meta: config.public.meta,
    link: [
        {
            rel: "preload",
            href: "/api/getRandomBackground",
            as: "image",
        },
    ],
    htmlAttrs: {
        lang: config.public.lang,
    },
});
</script>

<style>
::view-transition-old(nav),
::view-transition-new(nav) {
    @apply duration-300 transform-gpu;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

