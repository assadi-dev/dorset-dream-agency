"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserAction, UserActionColumnType } from "../types";
import ActionTypeColumnView from "./ActionTypeView";
import { datetimeFormatFr } from "@/lib/date";

export const columns: ColumnDef<UserActionColumnType>[] = [
    {
        accessorKey: "user",
        header: "Utilisateur",
        cell: ({ cell }) => <p className="text-nowrap">{cell.getValue() as string}</p>,
    },
    {
        accessorKey: "grade",
        header: "Grade",
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ cell }) => <ActionTypeColumnView action={cell.getValue() as UserAction} />,
    },
    {
        accessorKey: "name",
        header: "Context",
        cell: ({ cell }) => <p className="text-nowrap">{cell.getValue() as string}</p>,
    },
    {
        accessorKey: "timestamp",
        header: "Date",
        cell: ({ cell }) => <p className="text-nowrap">{datetimeFormatFr(cell.getValue() as string)}</p>,
    },
];
