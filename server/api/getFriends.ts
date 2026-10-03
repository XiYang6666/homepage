export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    return config.public.friends.map((x) => {
        return {
            name: x.name,
            url: x.url,
        };
    });
});

