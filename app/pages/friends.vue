<template>
    <h2 class="text-zinc-300 text-2xl" style="view-transition-name: title">友链</h2>
    <ContentSection>
        <FriendsList>
            <template #tail v-if="linkExchange.showButton">
                <li>
                    <FriendsTag :url="linkExchange.url" icon="fa6-solid:plus"> 添加友链 </FriendsTag>
                </li>
            </template>
        </FriendsList>
    </ContentSection>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const linkExchange = config.public.linkExchange;
useHead({ title: "友链" });
</script>

