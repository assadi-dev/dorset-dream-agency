"use server";

import { db } from "@/database";
import { ClientFormType } from "./_components/forms/schema";
import { clients } from "@/database/drizzle/schema/client";
import { desc, eq, sql } from "drizzle-orm";
import { deleteClients } from "@/database/drizzle/repositories/clients";

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

export const updateClient = async (id: string | number, values: ClientFormType) => {
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

export const removeClient = async (ids: Array<number>) => {
    try {
        await deleteClients(ids);
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};
