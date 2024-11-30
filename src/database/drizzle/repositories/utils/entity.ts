import { db } from "@/database";
import { BindParameters } from "@/database/types";
import { count, SQL } from "drizzle-orm";
import { MySqlColumn, MySqlSelect, MySqlTableWithColumns } from "drizzle-orm/mysql-core";

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

export async function rowCount(table: MySqlTableWithColumns<any>, where?: any) {
    const query = db.select({ count: count() }).from(table);
    if (where) {
        query.where(where);
    }
    const result = await query;
    return result[0].count;
}
