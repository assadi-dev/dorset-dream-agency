import { SQL } from "drizzle-orm";
import { MySqlColumn, MySqlSelect } from "drizzle-orm/mysql-core";

export function withPagination<T extends MySqlSelect>(
    qb: T,
    orderByColumn: MySqlColumn | SQL | SQL.Aliased,
    page = 1,
    limit = 5,
    bindParams?: Record<string, string>,
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
