"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellColumn } from "@/app/types/ReactTable";
import { LocationColumnType } from "../../../gestion-des-locations-et-ventes/types";
import formatThousands from "format-thousands";
import { CountRender, PriceRender } from "./CellIner";

export const columns: ColumnDef<LocationColumnType>[] = [
    {
        accessorKey: "seller",
        header: "Employé(e)",
        cell: ({ row }: CellColumn) => <CountRender value={row.getValue("seller")} />,
    },

    {
        accessorKey: "totalRent",
        header: "Location",
        cell: ({ row }: CellColumn) => <CountRender value={row.getValue("totalRent")} />,
    },
    {
        accessorKey: "totalSales",
        header: "Ventes",
        cell: ({ row }: CellColumn) => <CountRender value={row.getValue("totalSales")} />,
    },
    {
        accessorKey: "totalRentPrice",
        header: "Location $",
        cell: ({ row }: CellColumn) => <PriceRender value={row.getValue("totalRentPrice")} />,
    },
    {
        accessorKey: "totalSalesPrice",
        header: "Ventes $",
        cell: ({ row }: CellColumn) => <PriceRender value={row.getValue("totalSalesPrice")} />,
    },

    {
        accessorKey: "totalPrice",
        header: "Total $",
        cell: ({ row }: CellColumn) => <PriceRender value={row.getValue("totalPrice")} />,
    },
];
