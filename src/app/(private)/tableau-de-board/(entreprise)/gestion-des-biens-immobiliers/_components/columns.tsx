"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PropertiesColumn } from "../types";
import RenderPropertyCell from "./RenderPropertyCell";

export const columns: ColumnDef<PropertiesColumn>[] = [
    {
        accessorKey: "name",
        header: () => <div className="text-nowrap">Nom du bien</div>,
        cell: ({ row: { original } }) => <RenderPropertyCell property={original} />,
    },
    {
        accessorKey: "rentalPrice",
        header: () => <div className="text-nowrap">Prix location</div>,
    },
    {
        accessorKey: "sellingPrice",
        header: () => <div className="text-nowrap">Prix de vente</div>,
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
