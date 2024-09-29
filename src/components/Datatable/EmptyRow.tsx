import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { ColumnDef } from "@tanstack/react-table";

type EmptyProps = {
    columns: ColumnDef<TData, TValue>[];
};
const EmptyRow = ({ columns }: EmptyProps) => {
    return (
        <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
            </TableCell>
        </TableRow>
    );
};

export default EmptyRow;
