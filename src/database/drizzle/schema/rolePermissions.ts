import { datetime, int, json, mysqlTable, primaryKey, timestamp } from "drizzle-orm/mysql-core";
import { roles } from "./roles";
import { relations } from "drizzle-orm";
import { permissions } from "./permissions";
import { users } from "./users";

export const rolePermissions = mysqlTable(
    "role_permissions",
    {
        roleId: int("role_id")
            .notNull()
            .references(() => roles.id, { onDelete: "cascade" }),
        permissionId: int("permission_id")
            .notNull()
            .references(() => permissions.id, { onDelete: "cascade" }),
        grantedBy: int("granted_by").references(() => users.id, { onDelete: "set null" }),
        grantedAt: datetime("granted_at")
            .$default(() => new Date())
            .notNull(),
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
    assigner: one(users, {
        fields: [rolePermissions.grantedBy],
        references: [users.id],
    }),
}));
