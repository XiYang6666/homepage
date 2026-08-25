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
                v-show="isOpen"
                class="absolute inset-x-0 bottom-full mb-2 border-2 border-zinc-600 rounded-xl overflow-hidden bg-zinc-900/50 transform-gpu transition-all duration-300"
            >
                <ul class="w-full h-full">
                    <li
                        v-for="[index, [name, url]] in Object.entries(lines).entries()"
                        :key="name"
                        class="relative w-full h-8 hover:bg-slate-600 transition-colors duration-500 transform-gpu text-nowrap border-zinc-600"
                        :class="index != 0 ? 'border-t' : ''"
                    >
                        <span
                            v-if="name == currentLineName"
                            class="absolute h-full left-0 top-0 ml-2 flex items-center justify-center"
                        >
                            <Icon name="material-symbols:arrow-forward-ios-rounded" />
                        </span>
                        <a
                            :href="makeLineLink(url)"
                            class="flex items-center justify-center w-full h-full"
                            :class="name == currentLineName ? ' pointer-events-none ' : ''"
                        >
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
const currentHost = currentUrl.host;
const [currentLineName] = Object.entries(lines).findLast(([, url]) => URL.parse(url)?.host == currentHost) ?? [];

function makeLineLink(rawLink: string): string {
    console.log(rawLink);
    const resultUrl = new URL(currentUrl);
    const newUrl = URL.parse(rawLink)!;
    resultUrl.hostname = newUrl.hostname;
    resultUrl.port = newUrl.port;
    return resultUrl.toJSON();
}

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

