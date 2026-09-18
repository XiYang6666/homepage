import { getIconBuffer } from "../util/icon";

const config = useRuntimeConfig();

const storage = useStorage();
const key = "favicon";

export default defineEventHandler(async (event) => {
    const cached = await storage.getItem<{ buffer: string; expiresAt: number }>(key);
    if (!cached) {
        const buffer = await refreshFavicon();
        return send(event, buffer, "image/png");
    }

    if (cached.expiresAt <= Date.now()) refreshFavicon();
    const buffer = Buffer.from(cached.buffer, "base64");
    return send(event, buffer, "image/vnd.microsoft.icon");
});

let refreshPromise: Promise<Buffer> | undefined;

function refreshFavicon() {
    if (refreshPromise) return refreshPromise;
    refreshPromise = (async () => {
        const time = Date.now();
        const buffer = await getIconBuffer(time);
        await storage.setItem(key, {
            buffer: buffer.toString("base64"),
            expiresAt: time + config.avatarCacheTime * 1000,
        });
        return buffer;
    })().finally(() => (refreshPromise = undefined));
}

