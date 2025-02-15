import { Role } from "@/app/types/user";

export enum UserActionEnum {
    create = "Création",
    update = "Modification",
    delete = "Surpression",
    restore = "Restauration",
}

export type UserAction = "create" | "update" | "delete" | "restore";
export type UserActionColumnType = {
    user: string;
    grade: string;
    action: UserAction;
    context: string;
    date: string;
};

export type Description = {
    id: number;
    user: string;
    grade: string;
    role: Role;
    description: string;
    extras: any;
};

export type ActionDescription = {
    id: number;
    user: string;
    grade: string;
    action: UserAction;
    name: string;
    entity: string;
    description: Description;
    timestamp: string;
};
