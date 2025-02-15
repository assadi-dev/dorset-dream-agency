import { db } from "@/database";
import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { AnnounceCreateInputDto, announceValidator } from "./dto/announcementDTO";
import { announcements } from "../schema/announcements";
import { BindParameters, FilterPaginationType } from "@/database/types";
import { employees } from "../schema/employees";
import { generateDescription, selectWithSoftDelete, setDeletedAt, withPagination } from "./utils/entity";
import { extractKey, removeAnnounceFiles } from "./announcementsFiles";
import { deleteFileByID, findFileByPath } from "./files";
import { insertUserAction } from "../sqlite/repositories/usersAction";
import { ACTION_NAMES, ENTITIES_ENUM } from "../utils";

/**
 * Filtre par la colonne deletedAt
 */
const softDeleteCondition = selectWithSoftDelete(announcements);

export const insertAnnounce = async (values: AnnounceCreateInputDto) => {
    const validateInput = announceValidator(values);

    if (validateInput.error) throw validateInput.error;

    const query = await db.insert(announcements).values({ ...validateInput.data, isPublish: false });
    const id = query[0].insertId;
    const newAnnouncement = await findOneByID(id);

    const description = await generateDescription(`Création de l'annonce ${newAnnouncement?.title}`);
    if (description) {
        await insertUserAction({
            user: description.user as string,
            action: "create",
            name: ACTION_NAMES.announcements.create,
            description: JSON.stringify(description),
            grade: description.grade as string,
            entity: ENTITIES_ENUM.ANNOUNCEMENTS,
        });
    }
};

export const updateAnnounce = async (id: number, values: Partial<AnnounceCreateInputDto>) => {
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

    const announcement = await findOneByID(result[0].insertId);
    const description = await generateDescription(`Modification de l'annonce ${announcement?.title}`);
    if (description) {
        await insertUserAction({
            user: description.user as string,
            action: "update",
            name: ACTION_NAMES.announcements.update,
            description: JSON.stringify(description),
            grade: description.grade as string,
            entity: ENTITIES_ENUM.ANNOUNCEMENTS,
        });
    }
    return announcement;
};
export const setPublishAnnounce = async (id: number, values: boolean) => {
    await db.update(announcements).set({ isPublish: false }).where(eq(announcements.isPublish, true));
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

    const announcement = await findOneByID(id);
    const description = await generateDescription(`Publication de l'annonce ${announcement?.title}`);
    if (description) {
        await insertUserAction({
            user: description.user as string,
            action: "update",
            name: ACTION_NAMES.announcements.publish,
            description: JSON.stringify(description),
            grade: description.grade as string,
            entity: ENTITIES_ENUM.ANNOUNCEMENTS,
        });
    }
    return announcement;
};

export const getPublishedAnnouncements = async () => {
    const query = db
        .select()
        .from(announcements)
        .where(eq(announcements.isPublish, true))
        .orderBy(desc(announcements.publishedAt))
        .prepare();
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
    if (!result[0]) return null;
    return result[0];
};

export const getAnnounceCollections = async (filter: FilterPaginationType) => {
    try {
        const { page, limit, search } = filter;

        const query = db
            .select({
                id: announcements.id,
                title: announcements.title,
                description: announcements.description,
                path: announcements.path,
                settings: announcements.settings,
                author: sql<string>`CONCAT(${employees.firstName}," ",${employees.lastName})`.as("author"),
                publishedAt: announcements.publishedAt,
                isPublish: announcements.isPublish,
                createdAt: announcements.createdAt,
            })
            .from(announcements)
            .leftJoin(employees, eq(employees.id, announcements.author));

        const searchCondition = search
            ? or(
                  like(announcements.title, sql.placeholder("search")),
                  like(employees.lastName, sql.placeholder("search")),
                  like(employees.firstName, sql.placeholder("search")),
                  like(employees.post, sql.placeholder("search")),
                  like(employees.phone, sql.placeholder("search")),
              )
            : undefined;

        const parameters: BindParameters = {
            search: `%${search}%`,
        };

        query.where(and(softDeleteCondition, searchCondition));

        const rowsCount = await query.execute({
            ...parameters,
        });

        const orderbyColumn = desc(announcements.publishedAt);

        const totalItems = rowsCount.length || 0;
        const data = await withPagination(query.$dynamic(), orderbyColumn, page, limit, parameters);

        return {
            page,
            totalItems,
            limit,
            data,
        };
    } catch (error) {
        if (error instanceof Error) throw error;
    }
};

export const deleteAnnouncements = async (ids: number[]) => {
    for (const id of ids) {
        const announce = await findOneByID(id);
        if (announce) {
            /*       await removeAnnounceFiles(announce.id);
            const query = db
                .delete(announcements)
                .where(eq(announcements.id, sql.placeholder("id")))
                .prepare();
            await query.execute({ id }); */
            const req = setDeletedAt(announcements)
                ?.where(eq(announcements.id, sql.placeholder("id")))
                .prepare();
            await req?.execute({ id });

            const extras = { id: announce.id };
            const description = await generateDescription(`Suppression de l'annonce ${announce.title}`, extras);

            if (description) {
                await insertUserAction({
                    user: description.user as string,
                    action: "delete",
                    name: ACTION_NAMES.announcements.delete,
                    description: JSON.stringify(description),
                    grade: description.grade as string,
                    entity: ENTITIES_ENUM.ANNOUNCEMENTS,
                });
            }
        }
    }
};

export const restoreAnnouncement = async (id: number) => {
    try {
        const query = db
            .update(announcements)
            .set({ deletedAt: null })
            .where(eq(announcements.id, sql.placeholder("id")))
            .prepare();
        const result = await query.execute({
            id,
        });
        const announce = await findOneByID(id);
        const description = await generateDescription(`Restauration de l'annonce de ${announce?.title}`);
        if (description) {
            await insertUserAction({
                user: description.user as string,
                action: "restore",
                name: ACTION_NAMES.announcements.restore,
                description: JSON.stringify(description),
                grade: description.grade as string,
                entity: ENTITIES_ENUM.ANNOUNCEMENTS,
            });
        }
    } catch (error) {
        throw error;
    }
};

export const restoreAnnouncements = async (ids: number[]) => {
    for (const id of ids) {
        await restoreAnnouncement(id);
    }
};
