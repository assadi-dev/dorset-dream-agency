"use server";

import { uploadAnnounceFile, uploadSaveFile } from "@/database/drizzle/repositories/announcementsFiles";
import { AnnouncementFormType } from "../schema";
import { insertAnnounce } from "@/database/drizzle/repositories/announcements";
import { auth, UserSession } from "@/auth";

export const saveAnnonceCreation = async (formData: FormData, values: AnnouncementFormType) => {
    const session = (await auth()) as UserSession;
    if (!session) throw new Error("Session null");
    let annonceFile = null;
    let settingsFile = null;

    //  annonceFile = await uploadAnnounceFile(formData);
    settingsFile = await uploadSaveFile(formData);

    console.log("save AnnonceCreation", settingsFile);

    /*     await insertAnnounce({
        ...values,
        path: annonceFile?.path || null,
        settings: settingsFile?.path || null,
        author: Number(session.user.employeeID),
    }); */
};
