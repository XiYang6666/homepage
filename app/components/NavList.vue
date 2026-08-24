<template>
    <ul class="links flex flex-wrap justify-center gap-x-4 gap-y-4 max-w-[95dvw] text-base text-zinc-400 font-thin">
        <li v-for="navItem of navItems ?? []">
            <NavItem :nav-item="navItem" />
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { NavItem } from "~~/shared/types/navItem";

const config = useRuntimeConfig();
const navItems = config.public.links as NavItem[];
</script>

