export type Role = "user" | "patron" | "admin" | "manager";
export enum RoleEnum {
    user = "user",
    patron = "patron",
    admin = "admin",
    manager = "manager",
}

export type ActionPermission = {
    canUpdate?: boolean;
    canDelete?: boolean;
};
