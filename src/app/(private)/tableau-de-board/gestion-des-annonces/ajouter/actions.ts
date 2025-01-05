"use server";

import { uploadAnnounceFile, uploadSaveFile } from "@/database/drizzle/repositories/announcementsFiles";
import { AnnouncementFormType } from "../schema";
import { deleteAnnouncements, insertAnnounce, updateAnnounce } from "@/database/drizzle/repositories/announcements";
import { auth, UserSession } from "@/auth";

export const saveAnnonceCreation = async (formData: FormData, values: AnnouncementFormType) => {
    if (values.id) {
        return await updateSaveAnnonce(formData, values);
    }
    return await createSaveAnnounce(formData, values);
};

export const removeAnnounce = async (id: number) => {
    await deleteAnnouncements([id]);
};

export const createSaveAnnounce = async (formData: FormData, values: AnnouncementFormType) => {
    const session = (await auth()) as UserSession;
    if (!session) throw new Error("Session null");
    let annonceFile = null;
    let settingsFile = null;
    annonceFile = await uploadAnnounceFile(formData);
    settingsFile = await uploadSaveFile(formData);

    return await insertAnnounce({
        ...values,
        path: annonceFile?.path || null,
        settings: settingsFile?.path || null,
        author: Number(session.user.employeeID),
    });
};

export const updateSaveAnnonce = async (formData: FormData, values: AnnouncementFormType) => {
    const session = (await auth()) as UserSession;
    if (!session) throw new Error("Session null");

    let annonceFile = null;
    let settingsFile = null;

    if (values.id) {
        annonceFile = await uploadAnnounceFile(formData);
        settingsFile = await uploadSaveFile(formData);
        return await updateAnnounce(values.id, {
            ...values,
            path: annonceFile?.path,
            settings: settingsFile?.path,
            author: Number(session.user.employeeID),
        });
    }
};
