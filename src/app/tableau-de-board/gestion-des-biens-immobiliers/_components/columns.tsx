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
        accessorKey: "isFurnish",
        header: "Meublé",
        cell: ({ cell }) => (cell.getValue() ? "Oui" : "Non"),
    },
    {
        accessorKey: "isAvailable",
        header: "Disponibilité",
        cell: ({ cell }) => (cell.getValue() ? "Oui" : "Non"), // TODO: add a color to indicate availability
    },
    {
        accessorKey: "category",
        header: "Catégorie",
    },
];
