"use server";

import { db } from "@/database";
import { clients } from "@/database/drizzle/schema/client";
import { FilterPaginationType } from "@/database/types";
import { and, between, desc, eq, inArray, like, or, sql } from "drizzle-orm";
import { rowCount, selectWithSoftDelete, setDeletedAt, withPagination } from "./utils/entity";

/* 
class Client {
    getAll() {}
    getOne() {}
    create() {}
    update() {}
    delete() {}
    getTransactions() { }
    
} */

/**
 * Filtre par la colonne deletedAt
 */
const softDeleteCondition = selectWithSoftDelete(clients);

type NewClient = typeof clients.$inferInsert;
export const insertClient = async (values: any) => {
    try {
        const newClient: NewClient = {
            lastName: values.lastName,
            firstName: values.firstName,
            gender: values.gender,
            phone: values.phone,
            isDead: false,
        };

        await db.insert(clients).values(newClient);
        return newClient;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const getClientsCollections = async (filter: FilterPaginationType) => {
    try {
        const { page, limit, search } = filter;
        const searchCondition = search
            ? or(
                  like(clients.lastName, sql.placeholder("search")),
                  like(clients.firstName, sql.placeholder("search")),
                  like(clients.phone, sql.placeholder("search")),
              )
            : undefined;

        const query = db
            .select({
                id: clients.id,
                fullName: sql<string>`CONCAT(${clients.lastName}," ",${clients.firstName})`.as("fullName"),
                phone: clients.phone,
                gender: clients.gender,
                isDead: clients.isDead,
                createdAt: clients.createdAt,
            })
            .from(clients)
            .where(and(softDeleteCondition, searchCondition));

        const order = desc(clients.createdAt);
        const parameters = search
            ? {
                  search: `%${search}%`,
              }
            : undefined;

        const rowsCount = await query.execute({
            ...parameters,
        });

        const totalItems = rowsCount.length || 0;
        const data = await withPagination(query.$dynamic(), order, page, limit, parameters);
        return {
            totalItems,
            limit,
            order,
            data,
        };
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};
export const getClientsOptions = async () => {
    try {
        const response = await db
            .select({
                id: clients.id,
                label: sql<string>`CONCAT(${clients.lastName}," ",${clients.firstName})`,
                value: clients.id,
                phone: clients.phone,
            })
            .from(clients)
            .orderBy(desc(clients.createdAt))
            .where(softDeleteCondition);

        return response;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

const getOneClient = async (id: number) => {
    try {
        const query = db
            .select({
                id: clients.id,
                fullName: sql<string>`CONCAT(${clients.lastName}," ",${clients.firstName})`.as("fullName"),
                phone: clients.phone,
                gender: clients.gender,
                isDead: clients.isDead,
                createdAt: clients.createdAt,
            })
            .from(clients)
            .orderBy(desc(clients.createdAt))
            .where(and(softDeleteCondition, eq(clients.id, sql.placeholder("id"))));

        const result = await query.execute({
            id,
        });

        return result[0];
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const updateClient = async (id: string | number, values: any) => {
    try {
        const client: NewClient = {
            lastName: values.lastName,
            firstName: values.firstName,
            gender: values.gender,
            phone: values.phone,
            isDead: values.isDead,
        };

        const prepare = db
            .update(clients)
            .set(client)
            .where(and(softDeleteCondition, eq(clients.id, sql.placeholder("id"))))
            .prepare();
        const result = await prepare.execute({ id });
        return result[0];
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const deleteClients = async (ids: Array<number>) => {
    try {
        for (const id of ids) {
            /*      const req = db
                .delete(clients)
                .where(eq(clients.id, sql.placeholder("id")))
                .prepare();
            await req.execute({ id }); */
            const client = await getOneClient(id);
            if (!client) throw new Error("Ce client n'existe plus");
            const req = setDeletedAt(clients)
                ?.where(eq(clients.id, sql.placeholder("id")))
                .prepare();
            await req?.execute({ id });
        }
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

type statClientViews = {
    startDate: string;
    endDate: string;
};

export const statClientViews = async ({ startDate, endDate }: statClientViews) => {
    const total = await rowCount(clients);
    const where = between(clients.createdAt, new Date(startDate), new Date(endDate));
    const countFromDate = await rowCount(clients, where);
    const percent = Number((countFromDate / total) * 100).toFixed(2);

    return {
        count: total,
        difference: {
            count: countFromDate,
            percentage: Number(percent),
        },
    };
};

export const declareDeceased = async (ids: number[], value: boolean) => {
    if (ids.length === 0) throw new Error("ids array missing");
    const whereCondition = inArray(clients.id, ids);
    await db
        .update(clients)
        .set({
            isDead: value,
        })
        .where(whereCondition);
};
