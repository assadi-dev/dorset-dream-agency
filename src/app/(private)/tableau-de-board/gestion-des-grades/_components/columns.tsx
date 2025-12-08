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
        header: "Nome du grade",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "usersTotalCount",
        header: "Nombre d'employé associés",
    },

    {
        accessorKey: "createdAt",
        header: "Crée le",
        cell(props: any) {
            return datetimeFormatFr(props.getValue());
        },
    },
];
