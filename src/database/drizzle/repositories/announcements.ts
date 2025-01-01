import { db } from "@/database";
import { desc, eq, sql } from "drizzle-orm";
import { AnnounceCreateInputDto, announceValidator } from "./dto/announcementDTO";
import { announcements } from "../schema/announcements";

export const insertAnnounce = async (values: AnnounceCreateInputDto) => {
    const validateInput = announceValidator(values);

    if (validateInput.error) throw validateInput.error;

    const query = await db.insert(announcements).values(validateInput.data);
    const id = query[0].insertId;
    return findOneByID(id);
};
export const updateAnnounce = async (id: number, values: AnnounceCreateInputDto) => {
    const validateInput = announceValidator(values);
    if (validateInput.error) throw validateInput.error;

    const query = db
        .update(announcements)
        .set(validateInput.data)
        .where(eq(announcements.id, sql.placeholder("id")))
        .prepare();
    const result = await query.execute({
        id,
    });

    return findOneByID(result[0].insertId);
};
export const setPublishAnnounce = async (id: number, values: boolean) => {
    const query = db
        .update(announcements)
        .set({
            isPublish: values,
            publishedAt: new Date(),
        })
        .where(eq(announcements.id, sql.placeholder("id")))
        .prepare();
    const result = await query.execute({
        id,
    });

    return findOneByID(result[0].insertId);
};

export const getPublishedAnnouncements = async () => {
    const query = db.select().from(announcements).where(eq(announcements.isPublish, true)).prepare();
    const result = await query.execute();
    return result;
};

export const findOneByID = async (id: number) => {
    const query = db
        .select()
        .from(announcements)
        .where(eq(announcements.id, sql.placeholder("id")))
        .prepare();
    const result = await query.execute({ id });
    return result[0];
};

export const deleteAnnounce = async (ids: number[]) => {};
