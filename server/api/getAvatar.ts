import { getAvatarBuffer, getAvatarUrl } from "../util/avatar";

const config = useRuntimeConfig();
const storage = useStorage();

const CACHE_KEY = "avatar";
const DEFAULT_SIZE = 128;

type AvatarCache = { buffer: string; expiresAt: number };

let refreshPromise: Promise<Buffer> | undefined;

function refreshAvatar(): Promise<Buffer> {
    if (refreshPromise) return refreshPromise;

    refreshPromise = (async () => {
        const now = Date.now();
        const buffer = await getAvatarBuffer(DEFAULT_SIZE, now);
        await storage.setItem<AvatarCache>(CACHE_KEY, {
            buffer: buffer.toString("base64"),
            expiresAt: now + config.avatarCacheTime * 1000,
        });
        return buffer;
    })().finally(() => {
        refreshPromise = undefined;
    });

    return refreshPromise;
}

function getRedirTime() {
    const interval = config.avatarCacheTime * 1000;
    const now = Date.now();

    if (interval <= 0) return now;
    return Math.floor(now / interval) * interval;
}

export default defineEventHandler(async (event) => {
    const { s, r } = getQuery(event);

    if (s !== undefined && typeof s !== "string") throw createError({ statusCode: 400 });

    const size = s ? parseInt(s, 10) : undefined;
    const forceRedirect = r === "true";

    if (forceRedirect) {
        const corsResult = handleCors(event, {
            origin: "*",
            methods: ["GET", "HEAD", "OPTIONS"],
            maxAge: "86400",
            preflight: { statusCode: 204 },
        });
        if (corsResult) return;
    }

    // 开启 redirect 或未启用代理时,一律重定向
    if (forceRedirect || !config.avatarProxy) return sendRedirect(event, getAvatarUrl(size, getRedirTime()).toString());
    // 指定尺寸:不走缓存,直接获取
    if (size) return send(event, await getAvatarBuffer(size, Date.now()), "image/png");

    const cached = await storage.getItem<AvatarCache>(CACHE_KEY);
    if (!cached) return send(event, await refreshAvatar(), "image/png");
    // stale-while-revalidate:过期则后台刷新,本次仍返回旧缓存
    if (cached.expiresAt <= Date.now()) refreshAvatar().catch((err) => console.error("refresh avatar failed:", err));

    return send(event, Buffer.from(cached.buffer, "base64"), "image/png");
});

