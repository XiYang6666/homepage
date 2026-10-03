<template>
    <a
        class="text-zinc-300 text-sm px-3 py-1 rounded-full border border-zinc-700 hover:border-zinc-500 inline-flex items-center gap-1"
        :href="url"
        :target="newPage ? '_blank' : undefined"
    >
        <Icon :name="icon" class="text-xs"></Icon>
        <slot>{{ content }}</slot>
    </a>
</template>

<script lang="ts" setup>
const props = defineProps({
    url: String,
    content: {
        type: String,
        default: "",
    },
    newPage: {
        type: Boolean,
        default: true,
    },
    icon: {
        type: String,
        default: "fa6-solid:link",
    },
});
</script>

