<template>
    <div class="relative" ref="containerRef">
        <NavButton>
            <button class="flex items-center justify-center w-full h-full" @click="isOpen = !isOpen">
                <span class="block w-full ml-2 text-nowrap">线路: {{ currentLineName ?? "未知" }}</span>
                <span class="flex items-center justify-center mr-2 h-full">
                    <Icon
                        name="material-symbols:keyboard-arrow-up"
                        class="transition-transform duration-300"
                        :class="isOpen ? 'rotate-180' : 'rotate-0'"
                    />
                </span>
            </button>
        </NavButton>

        <Transition name="line-selector">
            <div
                v-if="isOpen"
                class="absolute inset-x-0 rounded-xl bottom-full mb-2 border-2 border-zinc-600 backdrop-blur-sm overflow-hidden transition-all duration-300"
            >
                <ul class="w-full h-full">
                    <li
                        v-for="[name, url] in Object.entries(lines)"
                        :key="name"
                        class="relative w-full h-8 hover:bg-slate-600 transition-colors duration-500 transform-gpu text-nowrap border-t border-zinc-600"
                    >
                        <span
                            v-if="name == currentLineName"
                            class="absolute h-full left-0 top-0 ml-2 flex items-center justify-center"
                        >
                            <Icon name="material-symbols:arrow-forward-ios-rounded" />
                        </span>
                        <a :href="url" class="flex items-center justify-center w-full h-full" :title="url">
                            {{ name }}
                        </a>
                    </li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import type { LineNavItem } from "~~/shared/types/navItem";

const props = defineProps<{
    navItem: LineNavItem;
}>();

const lines = props.navItem.lines;
const currentUrl = useRequestURL();
const currentHost = currentUrl.hostname;
const [currentLineName] = Object.entries(lines).findLast(([, url]) => URL.parse(url)?.hostname == currentHost) ?? [];

const isOpen = ref(false);

const containerRef = ref<HTMLElement | null>(null);
const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<style>
.line-selector-enter-from,
.line-selector-leave-to {
    @apply opacity-0;
    @apply translate-y-[10px];
}

.line-selector-enter-to,
.line-selector-leave-from {
    @apply opacity-100;
    @apply translate-y-0;
}
</style>

