"use server";

import { setPublishAnnounce } from "@/database/drizzle/repositories/announcements";
import { revalidatePath } from "next/cache";

const PATH_ANNOUNCEMENT = "/tableau-de-board/gestion-des-annonces";

export const publish = async ({ id, value }: { id: number; value: boolean }) => {
    await setPublishAnnounce(id, value);
    revalidatePath(PATH_ANNOUNCEMENT);
};
