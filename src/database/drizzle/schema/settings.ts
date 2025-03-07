import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const settings = mysqlTable("settings", {
    id: int("id").autoincrement().primaryKey(),
    analyticPeriod: varchar("analytic_period", { length: 255 }),
    analyticPeriodEnd: varchar("name", { length: 50 }),
});
