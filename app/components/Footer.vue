<template>
    <footer
        class="footer fixed bottom-4 text-base text-zinc-400 font-thin text-center flex flex-rol flex-wrap gap-x-4 items-center justify-center"
        v-html="config.public.footer"
    ></footer>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
</script>

