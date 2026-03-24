<template>
    <div class="bg h-dvh w-dvw overflow-hidden bg-black bg-opacity-80 flex items-center justify-center flex-col">
        <main class="content flex items-center flex-col w-[40rem]">
            <img
                :src="'/api/getAvatar'"
                class="avatar w-28 h-28 bg-slate-800 rounded-full border-4 border-white hover:rotate-[1turn] transition-transform duration-500"
                title="avatar"
            />
            <span
                v-if="!config.public.hasFormerName"
                class="text-4xl text-zinc-300 font-sans font-thin text-center mt-6 mb-2"
                >{{ config.public.ownerName }}</span
            >
            <div
                v-if="config.public.hasFormerName"
                class="content flex items-center flex-col mt-6 mb-1 overflow-hidden transition-all h-[2.5rem] hover:h-[5rem]"
            >
                <span class="text-4xl text-zinc-300 font-sans font-thin text-center">{{
                    config.public.ownerName
                }}</span>
                <span class="text-3xl text-zinc-500 font-sans font-thin text-center">{{
                    config.public.ownerFormerName
                }}</span>
            </div>

            <hr class="w-1/2 border-gray-600 m-5" />

            <span
                id="hitokoto"
                class="text-lg text-zinc-400 font-thin text-center break-after-auto max-w-[95dvw]"
                :title="hitokotoTitle"
            >
                {{ isClient ? hitokoto?.hitokoto : "&nbsp;" }}
            </span>

            <hr class="w-1/2 border-gray-600 m-6" />

            <span class="description text-lg text-zinc-400 font-thin text-center">{{ config.public.welcome }}</span>

            <nav class="flex items-center flex-col mt-6 gap-8">
                <ul class="links flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-[95dvw]">
                    <li
                        v-for="[name, link] of Object.entries(links ?? {})"
                        class="border-2 p-1 border-zinc-600 w-24 text-center rounded-full hover:bg-slate-600 transition-colors duration-500 transform-gpu"
                    >
                        <a :href="link" class="text-base text-zinc-400 font-thin">{{ name }}</a>
                    </li>
                </ul>
                <ul class="socials flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-[95dvw]">
                    <li v-for="{ link, icon } of Object.values(socials ?? {})">
                        <a
                            :href="link"
                            class="text-3xl text-white hover:text-slate-600 transition-colors duration-300 transform-gpu"
                            ><i :class="`${icon}`"></i
                        ></a>
                    </li>
                </ul>
            </nav>
        </main>

        <footer
            class="footer fixed bottom-4 text-base text-zinc-400 font-thin text-center flex flex-rol gap-x-4 items-center justify-center"
            v-html="config.public.footer"
        ></footer>
    </div>
</template>

<script lang="ts" setup>
import "@fortawesome/fontawesome-free/css/all.min.css";
import type { HitokotoResult } from "~~/shared/types/hitokoto";

const isClient = import.meta.client;
const config = useRuntimeConfig();
const links = config.public.links as Record<string, string>;
const socials = config.public.socials as Record<string, { link: string; icon: string }>;
const { data: hitokotoResult } = await useFetch<HitokotoResult>(config.hitokotoUrl, { server: true });
const hitokoto = useState(() => hitokotoResult.value);
const hitokotoTitle = computed(() => {
    if (!hitokoto.value) return "";
    const BOOK_TYPES = new Set(["a", "b", "c", "d", "h", "i", "j"]);
    const from = BOOK_TYPES.has(hitokoto.value.type) ? `《${hitokoto.value.from}》` : hitokoto.value.from;
    const fromWho = hitokoto.value.from_who ? " —— " + hitokoto.value.from_who : "";
    return `来源: ${from}${fromWho}`;
});

onMounted(() => {
    document.getElementById("hitokoto")?.style.setProperty("opacity", "1");
});

useSeoMeta({
    title: config.public.title,
    description: config.public.description,
    keywords: config.public.keywords.join(", "),
});
useHead({
    meta: config.public.meta,
    link: [
        {
            rel: "shortcut icon",
            href: "/favicon.ico",
        },
        {
            rel: "preload",
            href: "/api/getAvatar",
            as: "image",
        },
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
#hitokoto {
    @apply transition-opacity duration-500 transform-gpu;
    opacity: 0;
}
footer > span > img {
    @apply inline-block;
    @apply align-middle;
    @apply h-[1rem];
}
</style>
