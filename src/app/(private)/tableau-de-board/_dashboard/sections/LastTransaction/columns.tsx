"use client";

import { ColumnDef } from "@tanstack/react-table";
import { datetimeFormatFr } from "@/lib/date";
import { CellColumn } from "@/app/types/ReactTable";
import { LocationColumnType } from "../../../gestion-des-locations-et-ventes/types";

export const columns: ColumnDef<LocationColumnType>[] = [
    {
        accessorKey: "property",
        header: "Bien",
    },

    {
        accessorKey: "propertyService",
        header: "Type",
    },
    {
        accessorKey: "price",
        header: "Prix",
    },
    {
        accessorKey: "category",
        header: "Catégorie",
    },

    {
        accessorKey: "transactionDate",
        header: "Date",
        cell: ({ row }: CellColumn) => datetimeFormatFr(row.getValue("transactionDate")),
    },
];
