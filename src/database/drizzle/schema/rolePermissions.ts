import { int, json, mysqlTable, primaryKey, timestamp } from "drizzle-orm/mysql-core";
import { roles } from "./roles";
import { relations } from "drizzle-orm";
import { permissions } from "./permissions";

export const rolePermissions = mysqlTable(
    "role_permissions",
    {
        roleId: int("role_id")
            .notNull()
            .references(() => roles.id, { onDelete: "cascade" }),
        permissionId: int("permission_id")
            .notNull()
            .references(() => permissions.id, { onDelete: "cascade" }),
        grantedAt: timestamp("granted_at").defaultNow().notNull(),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.roleId, table.permissionId] }),
    }),
);

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
    role: one(roles, {
        fields: [rolePermissions.roleId],
        references: [roles.id],
    }),
    permission: one(permissions, {
        fields: [rolePermissions.permissionId],
        references: [permissions.id],
    }),
}));
