"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellColumn } from "@/app/types/ReactTable";
import SwitchAvailable from "./SwitchAvailable";
import { LocationColumnType } from "../../../gestion-des-locations-et-ventes/types";

export const columns: ColumnDef<LocationColumnType>[] = [
    {
        accessorKey: "name",
        header: "Nom du bien",
        cell: ({ getValue }: CellColumn) => <span className="text-nowrap">{getValue()}</span>,
    },
    {
        accessorKey: "address",
        header: "Adresse",
        cell: ({ getValue }: CellColumn) => <span className="text-nowrap">{getValue()}</span>,
    },
    {
        accessorKey: "rentalPrice",
        header: "Prix location",
        cell: ({ getValue }: CellColumn) => <span className="text-nowrap">{getValue()}</span>,
    },
    {
        accessorKey: "sellingPrice",
        header: "Prix de vente",
        cell: ({ getValue }: CellColumn) => <span className="text-nowrap">{getValue()}</span>,
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
