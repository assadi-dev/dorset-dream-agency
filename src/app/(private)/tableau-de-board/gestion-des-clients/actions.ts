"use server";

import { db } from "@/database";
import { ClientFormType } from "./_components/forms/schema";
import { clients } from "@/database/drizzle/schema/client";
import { desc, eq, sql } from "drizzle-orm";
import { declareDeceased, deleteClients } from "@/database/drizzle/repositories/clients";
import { FilterPaginationType } from "@/database/types";
import { withPagination } from "@/database/drizzle/repositories/utils/entity";

type NewClient = typeof clients.$inferInsert;
export const insertClient = async (values: ClientFormType) => {
    try {
        const newClient: NewClient = {
            lastName: values.lastName,
            firstName: values.firstName,
            gender: values.gender,
            phone: values.phone,
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

        const query = db
            .select({
                id: clients.id,
                fullName: sql<string>`CONCAT(${clients.firstName}," ",${clients.lastName})`,
                phone: clients.phone,
                gender: clients.gender,
                createdAt: clients.createdAt,
            })
            .from(clients)
            .orderBy(desc(clients.createdAt));

        const order = desc(clients.createdAt);
        const parameters = {
            search,
        };

        const data = await withPagination(query.$dynamic(), order, page, limit);
        return data;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const updateClient = async (id: string | number, values: ClientFormType) => {
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
            .where(eq(clients.id, sql.placeholder("id")))
            .prepare();
        const result = await prepare.execute({ id });
        return result;
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const removeClient = async (ids: Array<number>) => {
    try {
        await deleteClients(ids);
    } catch (error: any) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const setIsDeadClient = async (ids: number[], value: boolean) => {
    return declareDeceased(ids, value);
};
