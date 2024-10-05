import { timestamp } from "drizzle-orm/mysql-core";
/**
 * Ajout des champs created_at et updated_at
 */
export const updatedAndCreatedAt = {
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().onUpdateNow(),
};
