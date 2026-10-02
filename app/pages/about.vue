<template>
    <h2 class="text-zinc-300 text-2xl">关于</h2>
    <ContentSection>
        <div class="w-[90dvw] sm:w-[36rem] h-full overflow-y-auto">
            <ClientOnly>
                <div class="prose prose-invert text-zinc-200" v-html="$md.render(content ?? 'Error: Unknown')"></div>
            </ClientOnly>
        </div>
    </ContentSection>
</template>

<script setup lang="ts">
const { data: content } = await useAsyncData<string>(() => $fetch("/api/getAbout"));
useHead({ title: "关于" });
</script>
