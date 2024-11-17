"use server";

import { db } from "@/database";
import { desc, eq, sql } from "drizzle-orm";
import { perquisitions } from "../schema/perquisitions";
import { perquisitionDecode } from "./dto/perquisitionsPhotosDTO";
import { employees } from "../schema/employees";
import { clients } from "../schema/client";
import { clearPerquisitionFiles, getWarrantPerquisitionPhotos } from "./perquisitionsToPhotos";
import { photos } from "../schema/photos";

export const insertPerquisition = async (values: any) => {
    const validateInput = perquisitionDecode.perquisitionInput(values);
    if (!validateInput.success) throw validateInput.error;

    const request = db.insert(perquisitions).values({
        clientID: validateInput.data.clientID,
        employeeID: validateInput.data.employeeID,
    });

    const result = await request;
    const id = result[0].insertId;
    return findOne(id);
};

export const findOne = async (id: number) => {
    const request = db
        .select()
        .from(perquisitions)
        .where(eq(perquisitions.id, sql.placeholder("id")))
        .prepare();

    const result = await request.execute({
        id,
    });

    return result[0];
};

type PhotoType = Omit<typeof photos.$inferSelect, "createdAt" | "updatedAt">;

type getPerquisitionWithPhotosType = {
    id: number;
    employee: any;
    client: any;
    createdAt: Date | null;
    photos: any[];
};
export const getClientPerquisitionWithPhotos = async (id: number): Promise<getPerquisitionWithPhotosType[]> => {
    const perquisitionsWithPhotos: getPerquisitionWithPhotosType[] = [];
    const perquisitionsRequest = db
        .select({
            id: perquisitions.id,
            employee: sql`CONCAT(${employees.firstName}, " ",${employees.lastName})`,
            client: sql`CONCAT(${clients.lastName}," ",${clients.firstName})`,
            createdAt: perquisitions.createdAt,
        })
        .from(perquisitions)
        .leftJoin(clients, eq(clients.id, perquisitions.clientID))
        .leftJoin(employees, eq(employees.id, perquisitions.employeeID))
        .where(eq(clients.id, sql.placeholder("id")))
        .orderBy(desc(perquisitions.createdAt))
        .prepare();
    const perquisitionsResult = await perquisitionsRequest.execute({
        id,
    });
    for (const perquisition of perquisitionsResult) {
        const photos = await getWarrantPerquisitionPhotos(perquisition.id);
        if (photos) perquisitionsWithPhotos.push({ ...perquisition, photos });
    }

    return perquisitionsWithPhotos;
};

export const deletePerquisition = async (id: number) => {
    await clearPerquisitionFiles(id);
    const request = db
        .delete(perquisitions)
        .where(eq(perquisitions.id, sql.placeholder("id")))
        .prepare();
    return await request.execute({
        id,
    });
};

export const deletesPerquisitions = async (ids: number[]) => {
    if (ids.length) {
        for (const id of ids) {
            await deletePerquisition(id);
        }
    }
};
