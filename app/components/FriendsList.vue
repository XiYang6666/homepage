<template>
    <ul class="flex flex-wrap justify-center gap-2 list-none pl-0 max-w-[30rem]">
        <slot name="head" />
        <li v-for="item in friends" :key="item.url">
            <FriendsTag :url="item.url">
                {{ item.name }}
            </FriendsTag>
        </li>
        <slot name="tail" />
    </ul>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const friends = config.public.friends;
</script>

