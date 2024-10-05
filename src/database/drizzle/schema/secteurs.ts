import { int, mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";
import { employees } from "./employees";
import { relations } from "drizzle-orm";

export const secteurs = mysqlTable("secteurs", {
    id: int("id").primaryKey(),
    image: varchar("image", { length: 255 }),
    name: varchar("name", { length: 50 }).notNull(),
    description: varchar("description", { length: 255 }),
});

/* export const secteurRelations = relations(secteurs, ({ many }) => ({
    employeeSecteur: many(employeesToSecteurs),
}));

export const employeesToSecteurs = mysqlTable(
    "employees_to_secteurs",
    {
        employeeId: int("employee_id")
            .notNull()
            .references(() => employees.id),
        secteurId: int("secteur_id")
            .notNull()
            .references(() => secteurs.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.employeeId, t.secteurId] }),
    }),
);
export const employeesToSecteursRelations = relations(employeesToSecteurs, ({ one }) => ({
    employee: one(employees, {
        fields: [employeesToSecteurs.employeeId],
        references: [employees.id],
    }),
    secteur: one(secteurs, {
        fields: [employeesToSecteurs.secteurId],
        references: [secteurs.id],
    }),
}));
 */
