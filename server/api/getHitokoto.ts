import { HitokotoResult } from "~~/shared/types/hitokoto";

const config = useRuntimeConfig();
const cacheOpts = { maxAge: config.hitokotoCacheTime, swr: true };

export default defineCachedEventHandler(async (event) => {
    return await $fetch<HitokotoResult>(config.hitokotoUrl);
}, cacheOpts);

