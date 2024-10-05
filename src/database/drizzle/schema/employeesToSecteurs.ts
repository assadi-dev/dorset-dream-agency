import { relations } from "drizzle-orm";
import { int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import { employees } from "./employees";
import { secteurs } from "./secteurs";

export const employeesToSecteurs = mysqlTable(
    "employees_to_secteurs",
    {
        employeeID: int("employee_id")
            .notNull()
            .references(() => employees.id),
        secteurId: int("secteur_id")
            .notNull()
            .references(() => secteurs.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.employeeID, t.secteurId] }),
    }),
);
export const employeesToSecteursRelations = relations(employeesToSecteurs, ({ one }) => ({
    employee: one(employees, {
        fields: [employeesToSecteurs.employeeID],
        references: [employees.id],
    }),
    secteur: one(secteurs, {
        fields: [employeesToSecteurs.secteurId],
        references: [secteurs.id],
    }),
}));
