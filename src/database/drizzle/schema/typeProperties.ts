import { updatedAndCreatedAt } from "../utils";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const typeProperties = mysqlTable("type_properties", {
    id: int("id").primaryKey(),
    name: varchar("name", { length: 100 }),
    ...updatedAndCreatedAt,
});
