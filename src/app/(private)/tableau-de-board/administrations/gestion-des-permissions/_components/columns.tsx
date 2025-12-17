"use client";
import { Role } from "@/app/types/user";
import { datetimeFormatFr, datetimeFormatFr2, datetimeFormatWithoutSecISO8601 } from "@/lib/date";
import { showRole } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import ActionPermissionSwitcher from "./ActionPermissionSwitcher";

export type GradeColumn = {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

export type ResourceColumn = {
    id: string;
    label: string;
    value: string;
    resource: string;
    create: boolean;
    update: boolean;
    delete: boolean;
    all: boolean;
};

export const columns: ColumnDef<ResourceColumn>[] = [
    {
        accessorKey: "label",
        header: "Ressources",
    },

    {
        accessorKey: "create",
        header: "Créer",
        cell: ({ row: { original } }) => (
            <ActionPermissionSwitcher fieldName={original.value} checked={original.create} />
        ),
    },
    {
        accessorKey: "update",
        header: "Éditer",
        cell: ({ row: { original } }) => (
            <ActionPermissionSwitcher fieldName={original.value} checked={original.update} />
        ),
    },
    {
        accessorKey: "delete",
        header: "Supprimer",
        cell: ({ row: { original } }) => (
            <ActionPermissionSwitcher fieldName={original.value} checked={original.delete} />
        ),
    },
    {
        accessorKey: "all",
        header: "Tout",
        cell: ({ row: { original } }) => <ActionPermissionSwitcher fieldName={original.value} checked={original.all} />,
    },
];
