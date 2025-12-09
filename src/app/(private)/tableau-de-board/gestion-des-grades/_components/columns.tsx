"use client";
import { Role } from "@/app/types/user";
import { datetimeFormatFr, datetimeFormatFr2, datetimeFormatWithoutSecISO8601 } from "@/lib/date";
import { showRole } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type GradeColumn = {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

export const columns: ColumnDef<GradeColumn>[] = [
    {
        accessorKey: "name",
        header: "Nom du grade",
    },

    {
        accessorKey: "usersTotalCount",
        header: "Nombre d'employé associés",
    },
    {
        accessorKey: "permissions",
        header: "Permissions",
    },

    {
        accessorKey: "createdAt",
        header: "Créer le",
        cell(props: any) {
            return datetimeFormatFr(props.getValue());
        },
    },
];
