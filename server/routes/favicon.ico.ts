import { getIconBuffer } from "../util/icon";

export default defineEventHandler(async (event) => {
    return await getIconBuffer();
});

