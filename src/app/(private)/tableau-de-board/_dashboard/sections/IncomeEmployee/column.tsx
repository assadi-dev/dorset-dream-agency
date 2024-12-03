"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellColumn } from "@/app/types/ReactTable";
import { LocationColumnType } from "../../../gestion-des-locations-et-ventes/types";
import { CountRender, PriceRender } from "./CellRender";

export const columns: ColumnDef<LocationColumnType>[] = [
    {
        accessorKey: "seller",
        header: "Employé(e)s",
        cell: ({ row }: CellColumn) => <CountRender value={row.getValue("seller")} />,
    },

    {
        accessorKey: "totalRent",
        header: "Locations",
        cell: ({ row }: CellColumn) => <CountRender value={row.getValue("totalRent")} />,
    },
    {
        accessorKey: "totalSales",
        header: "Ventes",
        cell: ({ row }: CellColumn) => <CountRender value={row.getValue("totalSales")} />,
    },
    {
        accessorKey: "totalRentPrice",
        header: "Locations $",
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
