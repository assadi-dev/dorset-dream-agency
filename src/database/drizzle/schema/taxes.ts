import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { updatedAndCreatedAt } from "../utils";


export const taxes = mysqlTable("taxes", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 100 }),
    rate: int("rate"),
    ...updatedAndCreatedAt,

});
