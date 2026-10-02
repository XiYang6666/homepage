const config = useRuntimeConfig();
const cacheOpts = {
    maxAge: config.aboutCacheTime,
    swr: true,
};

export default defineCachedEventHandler(async (event) => {
    const mdUrl = config.aboutMarkdownUrl;
    const raw = await $fetch<string>(mdUrl, { timeout: config.apiTimeout });
    return send(event, raw, "text/markdown; charset=utf-8");
}, cacheOpts);

