export default defineEventHandler(async (event) => {
   const didHandleCors = handleCors(event, {
        origin: "*",
        methods: ["GET", "HEAD", "OPTIONS"],
        preflight: { statusCode: 204 },
    });
    if (didHandleCors) return;

    const config = useRuntimeConfig(event);
    return config.public.friends.map((x) => {
        return {
            name: x.name,
            url: x.url,
        };
    });
});

