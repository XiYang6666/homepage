<template>
    <img
        :src="'/api/getAvatar'"
        class="avatar w-28 h-28 bg-slate-800 rounded-full border-4 border-white hover:rotate-[1turn] transition-transform duration-500"
        title="avatar"
    />
    <span v-if="!hasFormerName" class="text-4xl text-zinc-300 font-sans font-thin text-center mt-6 mb-2">
        {{ config.public.ownerName }}
    </span>
    <div
        v-else
        class="content flex items-center flex-col mt-6 mb-1 overflow-hidden transition-all h-[2.5rem] hover:h-[5rem]"
    >
        <span class="text-4xl text-zinc-300 font-sans font-thin text-center">{{ config.public.ownerName }}</span>
        <span class="text-3xl text-zinc-500 font-sans font-thin text-center" title="a.k.a">
            {{ config.public.ownerFormerName }}
        </span>
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const hasFormerName = !!config.public.ownerFormerName;
</script>

