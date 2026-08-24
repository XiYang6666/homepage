<template>
    <NavItemLink v-if="type == 'link'" :nav-item="linkNavItem" />
    <NavItemLine v-else-if="type == 'line'" :nav-item="lineNavItem" />
    <span v-else>Error</span>
</template>

<script setup lang="ts">
import type { LineNavItem, LinkNavItem, NavItem } from "~~/shared/types/navItem";

const props = defineProps<{
    navItem: NavItem;
}>();

const type = getNavItemType(props.navItem);
const linkNavItem = computed(() => props.navItem as LinkNavItem);
const lineNavItem = computed(() => props.navItem as LineNavItem);
</script>

