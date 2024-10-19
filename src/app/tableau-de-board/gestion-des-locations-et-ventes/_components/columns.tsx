"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LocationColumnType } from "../types";

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
    },
];
