import { SQL } from "drizzle-orm";
import { date, datetime, timestamp } from "drizzle-orm/mysql-core";
import { OrderType } from "../types";
/**
 * Ajout des champs created_at et updated_at
 */
export const updatedAndCreatedAt = {
    createdAt: datetime("created_at").$default(() => new Date()), // Timestamp de création
    updatedAt: datetime("updated_at").$onUpdate(() => new Date()),
};

/**
 * Ajout des champs deleted_at
 */
export const deletedAt = {
    deletedAt: datetime("deleted_at"),
};

export const takeUniqueOrThrow = (message: string) => {
    return <T>(values: T[]): T => {
        if (values.length !== 1) throw new Error(`Found non unique or inexistent value: ${message}`);
        return values[0]!;
    };
};

export const ExtractFilterParams = (searchParams: URLSearchParams) => {
    const limit = Number(searchParams.get("limit")) || 5;
    const page = Number(searchParams.get("page")) || 1;
    const order = searchParams.get("order")?.toLowerCase() || "desc";
    const search = searchParams.get("search")?.toLowerCase() || null;
    return { search, page, limit, order: order as OrderType };
};
