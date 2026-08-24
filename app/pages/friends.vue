<template>
    <ContentCard>
        <div class="h-10"></div>
        <!--  placeholder -->
        <div class="flex flex-col justify-center items-center w-full">
            <div class="prose prose-invert">
                <h2 class="text-zinc-300">友链</h2>
                <ul class="grid grid-cols-1 sm:grid-cols-2 list-none pl-0">
                    <li v-for="item in friends" class="my-1">
                        <a class="text-zinc-300" :href="item.url" target="_blank">
                            <Icon name="fa6-solid:link"></Icon>
                            {{ item.name }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </ContentCard>
</template>

<script setup lang="ts">
import type { FriendLinkItem } from "~~/shared/types/friendLinkItem";

const config = useRuntimeConfig();
const friends = config.public.friendLinks as FriendLinkItem[];
</script>

