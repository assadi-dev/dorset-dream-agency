"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PropertiesColumn } from "../types";

export const columns: ColumnDef<PropertiesColumn>[] = [
    {
        accessorKey: "name",
        header: "Nom du bien",
    },
    {
        accessorKey: "rentalPrice",
        header: "Prix location",
    },
    {
        accessorKey: "sellingPrice",
        header: "Prix de vente",
    },
    {
        accessorKey: "isFurnished",
        header: "Meublé",
    },
    {
        accessorKey: "isAvailable",
        header: "Disponibilité",
    },
];
