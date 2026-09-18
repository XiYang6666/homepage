import { getIconBuffer } from "../util/icon";

export default defineEventHandler(async (event) => {
    const time = Date.now();
    return await getIconBuffer(time);
});

