<template>
    <ul class="socials flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2 max-w-[95dvw]">
        <li v-for="{ link, icon } of socials ?? []">
            <a
                :href="link"
                target="_blank"
                class="flex items-center justify-center w-full h-full text-4xl text-white hover:text-slate-600 transition-colors duration-300 transform-gpu"
            >
                <Icon :name="icon" />
            </a>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { SocialItem } from "~~/shared/types/socialItem";

const config = useRuntimeConfig();
const socials = config.public.socials as SocialItem[];
</script>

