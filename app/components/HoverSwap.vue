<template>
    <!-- group 让子元素共享 hover 状态 -->
    <div class="group relative inline-flex items-center justify-center cursor-pointer">
        <!-- 默认文字 -->
        <span class="transition-opacity ease-in-out group-hover:opacity-0 duration-300">
            <slot name="default">{{ defaultText ?? "default" }}</slot>
        </span>

        <!-- 悬浮文字 (绝对定位，默认隐藏) -->
        <span
            class="absolute whitespace-nowrap opacity-0 transition-opacity ease-in-out group-hover:opacity-100 duration-300"
        >
            <slot name="hover">{{ hoverText ?? "hover" }}</slot>
        </span>
    </div>
</template>

<script lang="ts" setup>
// 定义属性
const props = defineProps<{
    defaultText?: string;
    hoverText?: string;
}>();
</script>

