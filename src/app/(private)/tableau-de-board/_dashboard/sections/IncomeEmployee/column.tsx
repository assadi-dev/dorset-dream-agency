"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellColumn } from "@/app/types/ReactTable";
import { LocationColumnType } from "../../../gestion-des-locations-et-ventes/types";
import formatThousands from "format-thousands";

export const columns: ColumnDef<LocationColumnType>[] = [
    {
        accessorKey: "seller",
        header: "Employé(e)",
    },

    {
        accessorKey: "totalRent",
        header: "Location",
    },
    {
        accessorKey: "totalSales",
        header: "Ventes",
    },
    {
        accessorKey: "totalRentPrice",
        header: "Location $",
        cell: ({ row }: CellColumn) => formatThousands(row.getValue("totalRentPrice")) + "$",
    },
    {
        accessorKey: "totalSalesPrice",
        header: "Ventes $",
        cell: ({ row }: CellColumn) => formatThousands(row.getValue("totalSalesPrice")) + "$",
    },

    {
        accessorKey: "totalPrice",
        header: "Total $",
        cell: ({ row }: CellColumn) => formatThousands(row.getValue("totalPrice")) + "$",
    },
];
