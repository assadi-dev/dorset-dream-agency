import { db } from "@/database";
import { taxes } from "../schema/taxes";
import { and, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";
import { BindParameters, FilterPaginationType } from "@/database/types";
import { withPagination } from "./utils/entity";


export const insertTaxe = async (data: any) => {
    return await db.insert(taxes).values(data);
}

export const updateTaxe = async (id: number, data: any) => {
    return await db.update(taxes).set(data).where(eq(taxes.id, id));
}

export const deleteTaxe = async (id: number) => {
    await db.delete(taxes).where(eq(taxes.id, id));
}
export const deleteManyTaxe = async (ids: number[]) => {
    await db.delete(taxes).where(inArray(taxes.id, ids));
}

export const getAllTaxes = async () => {
    return await db.select().from(taxes);
}

export const getListTaxes = async () => {
    return await db.select({
        id: taxes.id,
        label: taxes.name,
        value: taxes.rate,
    }).from(taxes).orderBy(desc(taxes.createdAt));
}


export const getTaxesCollections = async (filter: FilterPaginationType) => {
    try {
        const { page, limit, search } = filter;
                const query = db
                    .select({
                        id: taxes.id,
                        name: taxes.name,
                        rate: taxes.rate,
                        createdAt: taxes.createdAt,
                        updatedAt: taxes.updatedAt,
                    })
                    .from(taxes).$dynamic()
        const totalItemsQury = db.select({count: sql<number>`COUNT(*)`}).from(taxes).$dynamic()

        const searchCondition = search
            ? or(ilike(taxes.name, sql.placeholder("search")),)
            : undefined;

        const parameters: BindParameters = {
            search: `%${search}%`,
        };

        if(search){
            query.where(and( searchCondition));
            totalItemsQury.where(and( searchCondition));
        }

     

        const orderbyColumn = desc(taxes.createdAt);
;
        const [data, [{count}]] = await Promise.all([withPagination(query.$dynamic(), orderbyColumn, page, limit, parameters), totalItemsQury.execute(parameters)]);

        return {
            page,
            limit,
            totalItems:count,
            data,
        };
    } catch (error: any) {
        throw error;
    }
}