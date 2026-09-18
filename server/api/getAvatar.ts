import { getAvatarBuffer, getAvatarUrl } from "../util/avatar";

const config = useRuntimeConfig();

const storage = useStorage();
const key = "avatar";

const defaultSize = 128;

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const sizeRaw = query.s;

    if (typeof sizeRaw !== "string") throw createError({ statusCode: 400 });
    const size = parseInt(sizeRaw, 10);

    if (!config.avatarProxy) return sendRedirect(event, getAvatarUrl(size).toString());

    if (size != defaultSize) return await getAvatarBuffer(size, Date.now());

    const cached = await storage.getItem<{ buffer: string; expiresAt: number }>(key);
    if (!cached) {
        const buffer = await refreshAvatar();
        return send(event, buffer, "image/png");
    }

    // swr
    if (cached.expiresAt <= Date.now()) refreshAvatar();
    const buffer = Buffer.from(cached.buffer, "base64");
    return send(event, buffer, "image/png");
});

let refreshPromise: Promise<Buffer> | undefined;

function refreshAvatar() {
    if (refreshPromise) return refreshPromise;
    refreshPromise = (async () => {
        const time = Date.now();
        const buffer = await getAvatarBuffer(128, time);
        await storage.setItem(key, {
            buffer: buffer.toString("base64"),
            expiresAt: time + config.avatarCacheTime * 1000,
        });
        return buffer;
    })().finally(() => (refreshPromise = undefined));
}

