<template>
    <div class="relative w-28 h-10 button">
        <slot :class="isSelected ? 'pointer-events-none' : ''" />
        <span v-if="isSelected" class="absolute bottom-8 w-full inset-x-0 flex items-center justify-center">
            <Icon name="material-symbols:arrow-drop-up" class="text-3xl" />
        </span>
    </div>
</template>

<script setup lang="ts">
defineProps({
    isSelected: {
        type: Boolean,
        default: false,
    },
});
</script>

