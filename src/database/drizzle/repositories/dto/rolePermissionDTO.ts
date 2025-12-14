import z from "zod";
import { REQUIRE_MESSAGE_ERROR } from "@/config/messages";

import { OmitInputCreation } from "@/types/database";
import { rolePermissions } from "../../schema/rolePermissions";

export type RolePermissionBase = typeof rolePermissions.$inferSelect;

export type CreateRoleRolePermissionBaseInputs = Omit<RolePermissionBase, OmitInputCreation | "grantedAt">;

export type UpdateRoleRolePermissionBaseInputs = Partial<RolePermissionBase>;

export type FindRoleRolePermissionField = Omit<CreateRoleRolePermissionBaseInputs, "grantedBy">;
