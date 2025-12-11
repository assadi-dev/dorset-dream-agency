import { int, mysqlTable, timestamp } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { roles } from "./roles";
import { relations } from "drizzle-orm";

export const userRoles = mysqlTable("user_roles", {
    userId: int("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    roleId: int("role_id")
        .notNull()
        .references(() => roles.id, { onDelete: "cascade" }),
    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
    assignedBy: int("assigned_by")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
});

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
