"use client";
import { datetimeFormatFr3 } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";

export type Category = {
    id: string;
    name: string;
    count: number;
    createdAt: Date;


};

export const columns: ColumnDef<Category>[] = [
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
        accessorKey: "count",
        header: () => (

            <p className="text-center">Nombre de biens</p>

        ),
        cell: ({ row }) => {
            return (

                <p className="text-center">{row.getValue("count")}</p>


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
