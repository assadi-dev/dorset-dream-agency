"use client";
import { Role } from "@/app/types/user";
import { ColumnDef } from "@tanstack/react-table";

export type AccountColumn = {
    username: string;
    role: Role;
    createdAt: string;
};

export const columns: ColumnDef<AccountColumn>[] = [
    {
        accessorKey: "username",
        header: "Identifiant",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "createdAt",
        header: "Crée le",
    },
];
