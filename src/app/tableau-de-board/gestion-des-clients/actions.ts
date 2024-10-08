"use server";

import { db } from "@/database";
import { ClientFormType } from "./_components/forms/schema";
import { clients } from "@/database/drizzle/schema/client";
import { desc, sql } from "drizzle-orm";

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
