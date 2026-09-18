import sharp from "sharp";
import pngToIco from "png-to-ico";
import { getAvatarBuffer } from "./avatar";

export async function getIconBuffer(size?: number, time?: number): Promise<Buffer> {
    const avatarBuffer = await getAvatarBuffer(size, time);

    const sharpImage = sharp(avatarBuffer);
    const imgMeta = await sharpImage.metadata();
    const radius = imgMeta.width / 4;
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

