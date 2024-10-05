import { SQL } from "drizzle-orm";
import { date, datetime, timestamp } from "drizzle-orm/mysql-core";
/**
 * Ajout des champs created_at et updated_at
 */
export const updatedAndCreatedAt = {
    createdAt: datetime("created_at")
        .notNull()
        .$default(() => new Date()), // Timestamp de création
    updatedAt: datetime("updated_at")
        .notNull()
        .$onUpdate(() => new Date()),
};
