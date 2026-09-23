import { createHash } from "crypto";

const config = useRuntimeConfig();

export function getGravatarUrl(email: string, size: number = 256, time?: number) {
    const trimmedEmail = email.trim().toLowerCase();
    const hash = createHash("sha256").update(trimmedEmail).digest("hex");
    console.log(
        new URL(`/avatar/${hash}?s=${size}&d=identicon${(time && `&t=${time}`) || ""}`, config.gravatarUrl).toString(),
    );
    return new URL(`/avatar/${hash}?s=${size}&d=identicon${(time && `&t=${time}`) || ""}`, config.gravatarUrl);
}

export function getAvatarUrl(size?: number, time?: number) {
    return getGravatarUrl(config.public.ownerEmail, size, time);
}

export async function getAvatarBuffer(size?: number, time?: number): Promise<Buffer> {
    const avatarUrl = getAvatarUrl(size, time);
    return Buffer.from(await $fetch(avatarUrl.toString(), { responseType: "arrayBuffer" }));
}

