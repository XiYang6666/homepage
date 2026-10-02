<template>
    <hr class="w-80 border-gray-600 m-6" style="view-transition-name: section-line-up" />

    <slot />

    <hr class="w-80 border-gray-600 m-6" style="view-transition-name: section-line-button" />
</template>

<style>
::view-transition-old(section-line-up),
::view-transition-new(section-line-up),
::view-transition-old(section-line-button),
::view-transition-new(section-line-button) {
    @apply duration-300 transform-gpu;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

