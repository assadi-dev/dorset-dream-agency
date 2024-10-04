"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ClientColumnType } from "../types";

export const columns: ColumnDef<ClientColumnType>[] = [
    {
        accessorKey: "name",
        header: "Nom Prénom",
    },
    {
        accessorKey: "phone",
        header: "N° Téléphone",
    },
    {
        accessorKey: "crée le",
        header: "createdAt",
    },
];
