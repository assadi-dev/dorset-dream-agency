"use server";

import { setPublishAnnounce } from "@/database/drizzle/repositories/announcements";

export const publish = async ({ id, value }: { id: number; value: boolean }) => {
    await setPublishAnnounce(id, value);
};
