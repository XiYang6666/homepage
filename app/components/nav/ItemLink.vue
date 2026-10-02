<template>
    <NavButton class="group" :showArrow="isSelected()">
        <NuxtLink v-if="isSelected()" to="/" class="flex items-center justify-center w-full h-full">
            <HoverSwap>
                <template #default>{{ navItem.name }}</template>
                <template #hover>返回主页</template>
            </HoverSwap>
        </NuxtLink>
        <NuxtLink
            v-else
            :href="navItem.link"
            :target="navItem.target"
            :external="navItem.external"
            class="flex items-center justify-center w-full h-full"
        >
            {{ navItem.name }}
        </NuxtLink>
    </NavButton>
</template>

<script setup lang="ts">
import type { LinkNavItem } from "~~/shared/types/navItem";

const props = defineProps<{
    navItem: LinkNavItem;
}>();

const route = useRoute();

function isSelected() {
    if (props.navItem.external) return false;
    if (props.navItem.target) return false;
    if (props.navItem.link != route.path) return false;
    return true;
}
</script>

