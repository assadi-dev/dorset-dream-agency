"use server";

import { db } from "@/database";
import { warrantPerquisitions } from "../schema/warrantPerquisitions";
import { eq, sql } from "drizzle-orm";

export const insertWarrantPerquisition = async (values: any) => {
    const request = db.insert(warrantPerquisitions).values({
        clientID: values.id,
    });

    const result = await request;
    const id = result[0].insertId;
    return findOne(id);
};

export const findOne = async (id: number) => {
    const request = db
        .select()
        .from(warrantPerquisitions)
        .where(eq(warrantPerquisitions.id, sql.placeholder("id")))
        .prepare();

    const result = await request.execute({
        id,
    });

    return result[0];
};

export const removeOne = async (id: number) => {
    const request = db
        .delete(warrantPerquisitions)
        .where(eq(warrantPerquisitions.id, sql.placeholder("id")))
        .prepare();
    return await request.execute({
        id,
    });
};

export const removes = async (ids: number[]) => {
    if (ids.length) {
        for (const id of ids) {
            await removeOne(id);
        }
    }
};
