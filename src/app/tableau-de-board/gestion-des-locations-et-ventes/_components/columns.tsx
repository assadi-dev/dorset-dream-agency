"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LocationColumnType } from "../types";

export const columns: ColumnDef<LocationColumnType>[] = [
    {
        accessorKey: "seller",
        header: "Vendeur",
    },
    {
        accessorKey: "customer",
        header: "Client",
    },
    {
        accessorKey: "telephone",
        header: "Telephone",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "sellingPrice",
        header: "Prix",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
];
