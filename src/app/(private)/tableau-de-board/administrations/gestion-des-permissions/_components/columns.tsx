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
        accessorKey: "entity",
        header: "Ressources",
    },

    {
        accessorKey: "create",
        header: "Créer",
    },
    {
        accessorKey: "update",
        header: "Éditer",
    },
    {
        accessorKey: "delete",
        header: "Supprimer",
    },
    {
        accessorKey: "all",
        header: "Tout",
    },
];
