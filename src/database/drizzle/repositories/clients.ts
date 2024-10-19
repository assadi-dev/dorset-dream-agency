"use server";

import { db } from "@/database";
import { clients } from "@/database/drizzle/schema/client";
import { desc, eq, sql } from "drizzle-orm";

type NewClient = typeof clients.$inferInsert;
export const insertClient = async (values: any) => {
    try {
        const newClient: NewClient = {
            lastName: values.lastName,
            firstName: values.firstName,
            gender: values.gender,
            phone: values.phone,
        };

        await db.insert(clients).values(newClient);
        return newClient;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const getClientsCollections = async () => {
    try {
        const response = await db
            .select({
                id: clients.id,
                fullName: sql<string>`CONCAT(${clients.lastName}," ",${clients.firstName})`,
                phone: clients.phone,
                gender: clients.gender,
                createdAt: clients.createdAt,
            })
            .from(clients)
            .orderBy(desc(clients.createdAt));

        return response;
    } catch (error) {
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
            .orderBy(desc(clients.createdAt));

        return response;
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
        };

        const prepare = db
            .update(clients)
            .set(client)
            .where(eq(clients.id, sql.placeholder("id")))
            .prepare();
        const result = await prepare.execute({ id });
        return result;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

export const deleteClients = async (ids: Array<number>) => {
    try {
        for (const id of ids) {
            const req = db
                .delete(clients)
                .where(eq(clients.id, sql.placeholder("id")))
                .prepare();
            await req.execute({ id });
        }
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};
