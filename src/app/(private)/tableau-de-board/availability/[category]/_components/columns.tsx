"use client";

import { ColumnDef } from "@tanstack/react-table";

import { datetimeFormatFr } from "@/lib/date";
import { CellColumn } from "@/app/types/ReactTable";
import { LocationColumnType } from "../../gestion-des-locations-et-ventes/types";
import SwitchAvailable from "./SwitchAvailable";

export const columns: ColumnDef<LocationColumnType>[] = [
    {
        accessorKey: "name",
        header: "Nom du bien",
    },
    {
        accessorKey: "address",
        header: "Adresse",
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
        header: () => <div className="text-center">Disponibilité</div>,
        cell: ({ cell }) => <SwitchAvailable property={cell.row.original} />,
    },
    {
        accessorKey: "category",
        header: "Catégorie",
    },
];
