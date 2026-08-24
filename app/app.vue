<script setup lang="ts">
import Footer from "./components/Footer.vue";
</script>

<template>
    <div class="bg h-dvh w-dvw overflow-hidden bg-black bg-opacity-80 flex items-center justify-center flex-col">
        <div class="flex items-center justify-center flex-col">
            <NuxtPage />

            <nav class="flex items-center flex-col mt-6 gap-8" style="view-transition-name: nav">
                <NavList />
                <SocialList />
            </nav>

            <Footer />
        </div>
    </div>
</template>

<style>
::view-transition-old(nav),
::view-transition-new(nav) {
    @apply duration-300 transform-gpu;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

