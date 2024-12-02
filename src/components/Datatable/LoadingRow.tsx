import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import SpinnerLoading from "../loader/SpinerLoading";

type LoadingRowProps = {
    columns: ColumnDef<any, any>[];
};
const LoadingRow = ({ columns }: LoadingRowProps) => {
    return (
        <TableRow className="h-full hover:!bg-transparent">
            <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex flex-col gap-3 py-8 items-center w-full  justify-center min-h-[10vh]">
                    <SpinnerLoading size={28} />

                    <p className="animate-pulse">Récupération des données en cours...</p>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default LoadingRow;
