import { datetime, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { roles } from "./roles";
import { relations } from "drizzle-orm";

export const userRoles = mysqlTable(
    "user_roles",
    {
        userId: int("user_id")
            .notNull()
            .unique()
            .references(() => users.id, { onDelete: "cascade" }),
        roleId: int("role_id")
            .notNull()
            .references(() => roles.id, { onDelete: "cascade" }),
        assignedAt: datetime("assigned_at")
            .$onUpdate(() => new Date())
            .notNull(),
        assignedBy: int("assigned_by").references(() => users.id, { onDelete: "cascade" }),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.roleId, table.userId] }),
    }),
);

export const userRoleRelations = relations(userRoles, ({ one }) => ({
    user: one(users, {
        fields: [userRoles.roleId],
        references: [users.id],
    }),
    role: one(roles, {
        fields: [userRoles.roleId],
        references: [roles.id],
    }),
    assignedByUser: one(users, {
        fields: [userRoles.assignedBy],
        references: [users.id],
    }),
}));
