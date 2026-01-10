"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LocationColumnType } from "../types";
import { datetimeFormatFr } from "@/lib/date";
import { CellColumn } from "@/app/types/ReactTable";
import StatusLocationVente from "./StatusLocationVente";

export const columns: ColumnDef<LocationColumnType>[] = [
    {
        accessorKey: "property",
        header: "Bien",
    },

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
        header: "Téléphone",
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
        accessorKey: "keyNumber",
        header: "N° clé",
    },

    {
        accessorKey: "transactionDate",
        header: "Date",
        cell: ({ row }: CellColumn) => datetimeFormatFr(row.getValue("transactionDate")),
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Statut</div>,
        cell: ({ row }: CellColumn) => <StatusLocationVente item={row.original} />,
    },
];
