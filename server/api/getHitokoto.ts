import { HitokotoResult } from "~~/shared/types/hitokoto";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    return await $fetch<HitokotoResult>(config.hitokotoUrl);
});

