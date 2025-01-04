import { db } from "@/database";
import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { AnnounceCreateInputDto, announceValidator } from "./dto/announcementDTO";
import { announcements } from "../schema/announcements";
import { BindParameters, FilterPaginationType } from "@/database/types";
import { employees } from "../schema/employees";
import { withPagination } from "./utils/entity";
import { extractKey, removeAnnounceFiles } from "./announcementsFiles";

export const insertAnnounce = async (values: AnnounceCreateInputDto) => {
    const validateInput = announceValidator(values);

    if (validateInput.error) throw validateInput.error;

    const query = await db.insert(announcements).values({ ...validateInput.data, isPublish: false });
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

    return findOneByID(result[0].insertId);
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

        query.where(and(searchCondition));

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
            if (announce.path) {
                const keyFile = extractKey(announce.path);
                await removeAnnounceFiles(keyFile);
            }

            const query = db
                .delete(announcements)
                .where(eq(announcements.id, sql.placeholder("id")))
                .prepare();
            await query.execute({ id });
        }
    }
};
