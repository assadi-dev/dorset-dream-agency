import { SQL } from "drizzle-orm";
import { MySqlColumn, MySqlSelect } from "drizzle-orm/mysql-core";

export function withPagination<T extends MySqlSelect>(
    qb: T,
    orderByColumn: MySqlColumn | SQL | SQL.Aliased,
    page = 1,
    limit = 5,
) {
    return qb
        .orderBy(orderByColumn)
        .limit(limit)
        .offset((page - 1) * limit);
}
