import fs from "node:fs/promises";
import { randomInt } from "node:crypto";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);

    const images = await getBackgroundImages(config);
    if (images.length === 0) {
        throw createError({
            statusCode: 500,
            statusMessage: "No background image available. Configure imageLinks or provide files in public/backgrounds.",
        });
    }

    return sendRedirect(event, images[randomInt(images.length)]!);
});

async function getBackgroundImages(config: { imageHosting: boolean; imageLinks: string[] }): Promise<string[]> {
    if (config.imageHosting) {
        return config.imageLinks.filter((link) => link.length > 0);
    }

    const files = await listLocalBackgrounds();
    return files.map((name) => `/backgrounds/${name}`);
}

async function listLocalBackgrounds(): Promise<string[]> {
    // 生产构建时 public/ 会被复制到 <output>/public/，与 server 入口同级；
    // 开发时 public/ 位于项目根目录（CWD）。依次尝试，避免依赖进程 CWD。
    const candidates = [
        fileURLToPath(new URL("../public/backgrounds", import.meta.url)),
        resolve(process.cwd(), "public/backgrounds"),
    ];

    for (const dir of candidates) {
        if (!(await isDirectory(dir))) continue;
        const files = await fs.readdir(dir);
        if (files.length > 0) return files;
    }

    return [];
}

async function isDirectory(dir: string): Promise<boolean> {
    return fs.stat(dir).then((stat) => stat.isDirectory()).catch(() => false);
}
