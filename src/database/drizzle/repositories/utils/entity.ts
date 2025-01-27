import { db } from "@/database";
import { BindParameters } from "@/database/types";
import { count, isNull, SQL, SQLWrapper, sum } from "drizzle-orm";
import { MySqlColumn, MySqlSelect, MySqlTable, MySqlTableWithColumns, QueryBuilder } from "drizzle-orm/mysql-core";
import { MySql2Database } from "drizzle-orm/mysql2";
import { TypedQueryBuilder } from "drizzle-orm/query-builders/query-builder";
import { SQLiteColumn, SQLiteSelect } from "drizzle-orm/sqlite-core";
import { generateDescriptionForUserAction } from "../../utils";
import { auth } from "@/auth";

export function withPagination<T extends MySqlSelect>(
    qb: T,
    orderByColumn: MySqlColumn | SQL | SQL.Aliased,
    page = 1,
    limit = 5,
    bindParams?: BindParameters,
) {
    const query = qb
        .orderBy(orderByColumn)
        .limit(limit)
        .offset((page - 1) * limit);
    if (bindParams) {
        return query.prepare().execute({
            ...bindParams,
        });
    }

    return query;
}

export function withPaginationForSqlite<T extends SQLiteSelect>(
    qb: T,
    page = 1,
    limit = 5,
    bindParams?: BindParameters,
) {
    const query = qb.limit(limit).offset((page - 1) * limit);
    if (bindParams) {
        return query.prepare().execute({
            ...bindParams,
        });
    }

    return query;
}

export async function rowCount(table: MySqlTableWithColumns<any>, where?: any) {
    const query = db.select({ count: count() }).from(table);
    if (where) {
        query.where(where);
    }
    const result = await query;
    return result[0].count;
}

export async function rowSum(table: MySqlTableWithColumns<any>, column: SQLWrapper, where?: any) {
    const query = db.select({ sum: sum(column) }).from(table);
    if (where) {
        query.where(where);
    }
    const result = await query;
    return Number(result[0].sum);
}

export function hasDeletedAtColumn(table: MySqlTableWithColumns<any>): boolean {
    return "deletedAt" in table;
}

export function selectWithSoftDelete(table: MySqlTableWithColumns<any>) {
    if (hasDeletedAtColumn(table)) {
        return isNull(table["deletedAt"]);
    }
    return undefined;
}

export const setDeletedAt = (table: MySqlTableWithColumns<any>) => {
    if (hasDeletedAtColumn(table)) {
        return db
            .update(table)
            .set({
                deletedAt: new Date(),
            })
            .$dynamic();
    }
    return undefined;
};

export async function generateDescription(message: string, extras?: any) {
    try {
        const session = await auth();

        const description = await generateDescriptionForUserAction({
            session: session || null,
            message: message,
            extras: extras,
        });
        return description;
    } catch (error) {}
}
