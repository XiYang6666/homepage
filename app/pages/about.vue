<template>
    <ContentCard>
        <div class="w-full h-full overflow-y-auto">
            <div class="h-10"></div>
            <!--  placeholder -->
            <ClientOnly>
                <div class="prose prose-invert text-zinc-200" v-html="$md.render(content ?? 'Error: Unknown')"></div>
            </ClientOnly>
        </div>
    </ContentCard>
</template>

<script setup lang="ts">
const { data: content } = await useAsyncData<string>(() => $fetch("/api/getAbout"));
</script>

