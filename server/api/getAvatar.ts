import { getAvatarBuffer, getAvatarUrl } from "../util/avatar";

const config = useRuntimeConfig();

const storage = useStorage();
const key = "avatar";

export default defineEventHandler(async (event) => {
    if (!config.avatarProxy) return sendRedirect(event, getAvatarUrl().toString());

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
    if (!refreshPromise)
        refreshPromise = (async () => {
            const buffer = await getAvatarBuffer();
            await storage.setItem(key, {
                buffer: buffer.toString("base64"),
                expiresAt: Date.now() + config.avatarCacheTime * 1000,
            });
            return buffer;
        })().finally(() => (refreshPromise = undefined));

    return refreshPromise;
}

