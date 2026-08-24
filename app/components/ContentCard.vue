<template>
    <main
        class="relative w-[50rem] max-w-[85svw] h-[60svh] sm:h-[75svh] p-3 border-2 border-zinc-500 rounded-2xl backdrop-blur-sm"
        style="view-transition-name: content-card"
    >
        <div class="absolute top-3 left-3 w-20 button">
            <NuxtLink to="/" class="flex flex-rol items-center justify-center gap-1 p-1">
                <Icon name="material-symbols:arrow-back" class="text-lg text-zinc-400" />
                <span class="text-sm text-zinc-400 font-normal mr-1">返回</span>
            </NuxtLink>
        </div>

        <slot />
    </main>
</template>

<style>
/* ::view-transition-old(content-card) {
    animation: fade-out 0.3s ease-out both;
}
::view-transition-new(content-card) {
    animation: fade-in 0.3s ease-in both;
} */
</style>

