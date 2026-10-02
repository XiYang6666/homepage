<template>
    <Profile />

    <ContentSection>
        <span
            id="hitokoto"
            class="text-lg text-zinc-400 font-thin text-center break-after-auto max-w-[95dvw]"
            :title="hitokotoTitle"
        >
            {{ hitokoto?.hitokoto }}
        </span>
    </ContentSection>
</template>

<script setup lang="tsx">
import type { HitokotoResult } from "~~/shared/types/hitokoto";

const config = useRuntimeConfig();

const defaultHitokoto: HitokotoResult = {
    id: 104,
    uuid: "10b2e013-ff7b-4934-9979-ffdc3e847886",
    hitokoto: "我们所过的每个平凡的日常，也许就是连续发生的奇迹。",
    type: "a",
    from: "日常",
    from_who: null,
    creator: "桜花幻影",
    creator_uid: 0,
    reviewer: 0,
    commit_from: "web",
    created_at: "1468605909",
    length: 25,
};
const hitokotoResult = useState<HitokotoResult | null>("hitokoto", () => null);
hitokotoResult.value ??= await $fetch<HitokotoResult>("/api/getHitokoto", { timeout: 5000 }).catch(
    () => defaultHitokoto,
);

const hitokoto = computed(() => hitokotoResult.value);
const hitokotoTitle = computed(() => {
    if (!hitokoto.value) return "";
    const BOOK_TYPES = new Set(["a", "b", "c", "d", "h", "i", "j"]);
    const from = BOOK_TYPES.has(hitokoto.value.type) ? `《${hitokoto.value.from}》` : hitokoto.value.from;
    const fromWho = hitokoto.value.from_who ? " —— " + hitokoto.value.from_who : "";
    return `来源: ${from}${fromWho}`;
});

useHead({
    link: [
        {
            rel: "preload",
            href: "/api/getAvatar",
            as: "image",
        },
    ],
});
</script>

