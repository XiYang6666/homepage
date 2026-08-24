import sharp from "sharp";
import pngToIco from "png-to-ico";
import { getAvatarBuffer } from "./avatar";

export async function getIconBuffer(): Promise<Buffer> {
    const avatarBuffer = await getAvatarBuffer();

    const sharpImage = sharp(avatarBuffer);
    const imgMeta = await sharpImage.metadata();
    const radius = 64;
    const pngBuffer = await sharpImage
        .composite([
            {
                input: Buffer.from(
                    `<svg><rect x='0' y='0' width='${imgMeta.width}' height='${imgMeta.height}' rx='${radius}' ry='${radius}' fill='white'/></svg>`,
                ),
                blend: "dest-in",
            },
        ])
        .png()
        .toBuffer();
    return await pngToIco(pngBuffer);
}

