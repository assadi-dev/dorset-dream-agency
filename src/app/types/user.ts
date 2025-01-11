export type Role = "user" | "patron" | "admin";
export enum RoleEnum {
    user = "user",
    patron = "patron",
    admin = "admin",
}

export type ActionPermission = {
    canUpdate?: boolean;
    canDelete?: boolean;
};
