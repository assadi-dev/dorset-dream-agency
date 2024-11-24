"use server";

import { db } from "@/database";
import { and, asc, desc, eq, like, or, sql } from "drizzle-orm";
import { perquisitions } from "../schema/perquisitions";
import { perquisitionDecode } from "./dto/perquisitionsPhotosDTO";
import { employees } from "../schema/employees";
import { clients } from "../schema/client";
import { clearPerquisitionFiles, getWarrantPerquisitionPhotos } from "./perquisitionsToPhotos";
import { photos } from "../schema/photos";
import { withPagination } from "./utils/entity";
import { BindParameters, FilterPaginationType } from "@/database/types";

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
type WarrantPerquisitionDataType = {
    id: number;
    employee: any;
    client: any;
    createdAt: Date | null;
    photos: any[];
};

type getPerquisitionWithPhotosType = {
    page: number;
    totalItems: number;
    limit: number;
    data: WarrantPerquisitionDataType[];
};
export const getClientPerquisitionWithPhotos = async (
    id: number,
    filters: FilterPaginationType,
): Promise<getPerquisitionWithPhotosType> => {
    const { page, limit, order, search } = filters;
    const clientCondition = id ? eq(clients.id, sql.placeholder("id")) : undefined;
    const searchCondition = search
        ? or(
              like(perquisitions.id, sql.placeholder("search")),
              like(employees.firstName, sql.placeholder("search")),
              like(employees.lastName, sql.placeholder("search")),
          )
        : undefined;

    const perquisitionsWithPhotos: WarrantPerquisitionDataType[] = [];
    const perquisitionsQuery = db
        .select({
            id: perquisitions.id,
            employee: sql`CONCAT(${employees.firstName}, " ",${employees.lastName})`,
            client: sql`CONCAT(${clients.lastName}," ",${clients.firstName})`,
            createdAt: perquisitions.createdAt,
        })
        .from(perquisitions)
        .leftJoin(clients, eq(clients.id, perquisitions.clientID))
        .leftJoin(employees, eq(employees.id, perquisitions.employeeID))
        .where(and(clientCondition, searchCondition))
        .$dynamic();

    const parameters: BindParameters = {
        id,
        search: `%${search}%`,
    };

    const rowsCount = await perquisitionsQuery.execute({
        ...parameters,
    });

    const totalItems = rowsCount.length || 0;
    const orderColumn = "createdAt";
    const orderBy = order === "asc" ? asc(perquisitions[orderColumn]) : desc(perquisitions[orderColumn]);

    const perquisitionsResult = await withPagination(perquisitionsQuery, orderBy, page, limit, parameters);

    for (const perquisition of perquisitionsResult) {
        const photos = await getWarrantPerquisitionPhotos(perquisition.id);
        if (photos) perquisitionsWithPhotos.push({ ...perquisition, photos });
    }

    return {
        page: Number(page),
        totalItems,
        limit: Number(limit),
        data: perquisitionsWithPhotos,
    };
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
