<template>
    <footer
        class="footer fixed bottom-2 max-w-[90svw] text-sm text-zinc-400 font-thin text-center flex flex-rol flex-wrap gap-x-4 items-center justify-center"
        v-html="config.public.footer"
    ></footer>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
</script>

<style>
footer > span > img {
    @apply inline-block;
    @apply align-middle;
    @apply h-[0.875rem];
}
</style>

