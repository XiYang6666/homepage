import { createHash } from "crypto";

const config = useRuntimeConfig();

export function getGravatarUrl(email: string, size: number = 256, time?: number) {
    const trimmedEmail = email.trim().toLowerCase();
    const hash = createHash("sha256").update(trimmedEmail).digest("hex");
    return new URL(`/avatar/${hash}?s=${size}&d=identicon${(time && `&t=${time}`) || ""}`, config.gravatarUrl);
}

export function getAvatarUrl() {
    return getGravatarUrl(config.public.ownerEmail);
}

export async function getAvatarBuffer(): Promise<Buffer> {
    const avatarUrl = getAvatarUrl();
    return Buffer.from(await $fetch(avatarUrl.toString(), { responseType: "arrayBuffer" }));
}

