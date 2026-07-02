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
        cell: ({ row }: CellColumn) => <p className="text-nowrap">{row.getValue("property")}</p>,
    },

    {
        accessorKey: "seller",
        header: "Vendeur",
        cell: ({ row }: CellColumn) => <p className="text-nowrap">{row.getValue("seller")}</p>,
    },
    {
        accessorKey: "client",
        header: "Client",
        cell: ({ row }: CellColumn) => <p className="text-nowrap">{row.getValue("client")}</p>,
    },
    {
        accessorKey: "phone",
        header: "Téléphone",
    },
    {
        accessorKey: "propertyService",
        header: "Type",
        cell: ({ row }: CellColumn) => <p className="text-nowrap">{row.getValue("propertyService")}</p>,
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
        accessorKey: "invoice",
        header: "N° Facture",
    },

    {
        accessorKey: "transactionDate",
        header: "Date",
        cell: ({ row }: CellColumn) => <p className="text-nowrap">{datetimeFormatFr(row.getValue("transactionDate"))}</p>,
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Statut</div>,
        cell: ({ row }: CellColumn) => <StatusLocationVente item={row.original} />,
    },
];
