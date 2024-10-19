"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LocationColumnType } from "../types";
import { datetimeFormatFr } from "@/lib/date";

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
        accessorKey: "sellingPrice",
        header: "Prix",
    },
    {
        accessorKey: "transactionDate",
        header: "Date",
        cell: ({ row }) => datetimeFormatFr(row.getValue("transactionDate")),
    },
];
