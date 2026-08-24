const config = useRuntimeConfig();
const cacheOpts = {
    maxAge: config.avatarCacheTime,
    swr: true,
};

export default defineCachedEventHandler(async (event) => {
    const mdUrl = config.aboutMarkdownUrl;
    const raw = await $fetch<string>(mdUrl);
    return send(event, raw, "text/markdown; charset=utf-8");
}, cacheOpts);

