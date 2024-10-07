"use client";
import { Role } from "@/app/types/user";
import { datetimeFormatFr, datetimeFormatFr2, datetimeFormatWithoutSecISO8601 } from "@/lib/date";
import { showRole } from "@/lib/utils";
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
        cell(props) {
            return showRole(props.getValue());
        },
    },
    {
        accessorKey: "createdAt",
        header: "Crée le",
        cell(props) {
            return datetimeFormatFr(props.getValue());
        },
    },
];
