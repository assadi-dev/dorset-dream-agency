"use client";
import { datetimeFormatFr3 } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";

export type TaxeColumnData = {
    id: string;
    name: string;
    rate: number;
    description: string;
    createdAt: Date;


};

export const columns: ColumnDef<TaxeColumnData>[] = [
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }) => {
            return (
                <p className="text-nowrap">{row.getValue("name")}</p>
            );
        },
    },
    {
        accessorKey: "rate",
        header: () => (

            <p className="text-center">Taux</p>

        ),
        cell: ({ row }) => {
            return (

                <p className="text-center">{row.getValue("rate") ?? "0"}$</p>


            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date de création",
        cell: ({ row }) =>

            <p className="text-nowrap">{datetimeFormatFr3(row.getValue("createdAt") as string)}</p>,
    },

];
