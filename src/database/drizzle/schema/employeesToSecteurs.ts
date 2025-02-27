import { relations } from "drizzle-orm";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import { employees } from "./employees";
import { secteurs } from "./secteurs";

export const employeesToSecteurs = mysqlTable(
    "employees_to_secteurs",
    {
        employeeID: int("employee_id")
            .notNull()
            .references(() => employees.id, { onDelete: "cascade" }),
        secteurId: int("secteur_id")
            .notNull()
            .references(() => secteurs.id, { onDelete: "cascade" }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.employeeID, t.secteurId] }),
        employeesIdx: index("employee_idx").on(t.employeeID),
        secteursIdx: index("secteur_idx").on(t.secteurId),
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
