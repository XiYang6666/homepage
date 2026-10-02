import { createHash } from "crypto";

const config = useRuntimeConfig();

export function getGravatarUrl(email: string, size: number = 256, time?: number) {
    const trimmedEmail = email.trim().toLowerCase();
    const hash = createHash("sha256").update(trimmedEmail).digest("hex");

    const url = new URL(config.gravatarUrl);
    url.pathname = `${url.pathname.replace(/\/+$/, "")}/avatar/${hash}`;
    url.searchParams.set("s", String(size));
    url.searchParams.set("d", "identicon");
    if (time) url.searchParams.set("t", String(time));
    return url;
}

export function getAvatarUrl(size?: number, time?: number) {
    return getGravatarUrl(config.public.ownerEmail, size, time);
}

export async function getAvatarBuffer(size?: number, time?: number): Promise<Buffer> {
    const avatarUrl = getAvatarUrl(size, time);
    return Buffer.from(await $fetch(avatarUrl.toString(), { responseType: "arrayBuffer" }));
}

