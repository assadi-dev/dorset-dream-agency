"use server";

import { uploadAnnounceFile, uploadSaveFile } from "@/database/drizzle/repositories/announcementsFiles";
import { AnnouncementFormType } from "../schema";
import { deleteAnnouncements, insertAnnounce, updateAnnounce } from "@/database/drizzle/repositories/announcements";
import { auth, UserSession } from "@/auth";
import { revalidatePath } from "next/cache";

const PATH_ANNOUNCEMENT = "/tableau-de-board/gestion-des-annonces";

export const saveAnnonceCreation = async (formData: FormData, values: AnnouncementFormType) => {
    if (values.id) {
        return await updateSaveAnnonce(formData, values);
    }

    const result = await createSaveAnnounce(formData, values);
    revalidatePath(PATH_ANNOUNCEMENT);
    return result;
};

export const removeAnnounce = async (id: number) => {
    await deleteAnnouncements([id]);
    revalidatePath(PATH_ANNOUNCEMENT);
};

export const createSaveAnnounce = async (formData: FormData, values: AnnouncementFormType) => {
    const session = (await auth()) as UserSession;
    if (!session) throw new Error("Session null");
    let annonceFile = null;
    let settingsFile = null;
    annonceFile = await uploadAnnounceFile(formData);
    settingsFile = await uploadSaveFile(formData);

    const result = await insertAnnounce({
        ...values,
        path: annonceFile?.path || null,
        settings: settingsFile?.path || null,
        author: Number(session.user.employeeID),
    });
    revalidatePath(PATH_ANNOUNCEMENT);
    return result;
};

export const updateSaveAnnonce = async (formData: FormData, values: AnnouncementFormType) => {
    const session = (await auth()) as UserSession;
    if (!session) throw new Error("Session null");

    let annonceFile = null;
    let settingsFile = null;

    if (values.id) {
        annonceFile = await uploadAnnounceFile(formData);
        settingsFile = await uploadSaveFile(formData);
  
        const result = await updateAnnounce(values.id, {
            ...values,
            path: annonceFile?.path,
            settings: settingsFile?.path,
            author: Number(session.user.employeeID),
        });
        revalidatePath(PATH_ANNOUNCEMENT);
        return result;
    }
 
};
