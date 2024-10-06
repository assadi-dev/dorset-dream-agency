import { serial, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { employeesToSecteurs } from "./employeesToSecteurs";

export const secteurs = mysqlTable("secteurs", {
    id: serial("id").primaryKey(),
    image: varchar("image", { length: 255 }),
    name: varchar("name", { length: 50 }).notNull(),
    description: varchar("description", { length: 255 }),
});

export const secteurRelations = relations(secteurs, ({ many }) => ({
    employees: many(employeesToSecteurs),
}));
