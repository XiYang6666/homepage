<template>
    <main class="content flex items-center flex-col w-[40rem]">
        <img
            :src="'/api/getAvatar'"
            class="avatar w-28 h-28 bg-slate-800 rounded-full border-4 border-white hover:rotate-[1turn] transition-transform duration-500"
            title="avatar"
        />
        <span
            v-if="!config.public.hasFormerName"
            class="text-4xl text-zinc-300 font-sans font-thin text-center mt-6 mb-2"
            >{{ config.public.ownerName }}
        </span>
        <div
            v-if="config.public.hasFormerName"
            class="content flex items-center flex-col mt-6 mb-1 overflow-hidden transition-all h-[2.5rem] hover:h-[5rem]"
        >
            <span class="text-4xl text-zinc-300 font-sans font-thin text-center">{{ config.public.ownerName }}</span>
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
            {{ hitokoto?.hitokoto }}
        </span>

        <hr class="w-1/2 border-gray-600 m-6" />

        <span class="description text-lg text-zinc-400 font-thin text-center">{{ config.public.welcome }}</span>
    </main>
</template>

<script setup lang="tsx">
import type { HitokotoResult } from "~~/shared/types/hitokoto";

const config = useRuntimeConfig();

const hitokotoResult = useState<HitokotoResult | null>("hitokoto", () => null);

if (import.meta.server && !hitokotoResult.value) {
    hitokotoResult.value = await $fetch<HitokotoResult>(config.hitokotoUrl);
}

const hitokoto = computed(() => hitokotoResult.value);
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
footer > span > img {
    @apply inline-block;
    @apply align-middle;
    @apply h-[1rem];
}
</style>

