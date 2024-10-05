import { mysqlEnum, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { updatedAndCreatedAt } from "../utils";

export const users = mysqlTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 255 }),
    password: varchar("password", { length: 255 }),
    avatar: varchar("avatar", { length: 255 }),
    role: mysqlEnum("role", ["user", "admin"]),
    ...updatedAndCreatedAt,
});
