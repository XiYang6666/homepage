<template>
    <ul class="flex flex-wrap justify-center gap-2 list-none pl-0 max-w-96">
        <li v-for="item in friends" :key="item.url">
            <a
                class="text-zinc-300 text-sm px-3 py-1 rounded-full border border-zinc-700 hover:border-zinc-500 inline-flex items-center gap-1"
                :href="item.url"
                target="_blank"
            >
                <Icon name="fa6-solid:link" class="text-xs"></Icon>
                {{ item.name }}
            </a>
        </li>
    </ul>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const friends = config.public.friends;
</script>

