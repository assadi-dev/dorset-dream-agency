"use server";

import { db } from "@/database";
import { clients } from "@/database/drizzle/schema/client";
import { wait } from "@/lib/utils";
import { eq, sql } from "drizzle-orm";

export type clientsType = Omit<typeof clients.$inferSelect, "createdAt" | "updatedAt">;

export const getClientDetails = async (id: string | number) => {
    const prepare = db
        .select({
            id: clients.id,
            lastName: clients.lastName,
            firstName: clients.firstName,
            phone: clients.phone,
            gender: clients.gender,
            isDead: clients.isDead,
        })
        .from(clients)
        .where(eq(clients.id, sql.placeholder("id")))
        .prepare();

    const result = await prepare.execute({ id });

    return result[0];
};

export type clientDetailType = clientsType;
