"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LocationColumnType } from "../types";
import { datetimeFormatFr } from "@/lib/date";
import { CellColumn } from "@/app/types/ReactTable";

export const columns: ColumnDef<LocationColumnType>[] = [
    {
        accessorKey: "seller",
        header: "Vendeur",
    },
    {
        accessorKey: "client",
        header: "Client",
    },
    {
        accessorKey: "phone",
        header: "Telephone",
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
        accessorKey: "transactionDate",
        header: "Date",
        cell: ({ row }: CellColumn) => datetimeFormatFr(row.getValue("transactionDate")),
    },
];
