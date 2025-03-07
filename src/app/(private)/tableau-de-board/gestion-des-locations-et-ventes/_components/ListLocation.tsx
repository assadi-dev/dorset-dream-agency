"use client";
import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import TransactionActions from "./TransactionActions";
import { CellColumn } from "@/app/types/ReactTable";
import SimplePagination from "@/components/Paginations/SimplePagination";
import CheckBoxColumn from "@/components/Datatable/CheckBoxColumn";
import useSelectTableRow from "@/hooks/useSelectTableRow";
import { Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ButtonActionWithTooltip from "@/components/Buttons/ButtonActionWithTooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SelectionActionButton from "./SelectionActionButton";

type ListLocationProps = {
    transactions: any[];
    totalItems: number;
    limit: number;
};
const ListLocation = ({ transactions, limit, totalItems }: ListLocationProps) => {
    const { itemChecked, handleSelectedRow, handleSelectedAllRow } = useSelectTableRow();
    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }: CellColumn) {
            return (
                <DropdownActions>
                    <TransactionActions payload={row.original} />
                </DropdownActions>
            );
        },
    };
    const SelectColumns = CheckBoxColumn({
        onCheckedChange: handleSelectedRow,
        onCheckedAllChange: handleSelectedAllRow,
        selected: itemChecked,
    });
    const transactionsColumn = [SelectColumns, ...columns, actions];

    return (
        <>
            <div className="my-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {itemChecked.length > 0 && (
                        <div className="flex gap-3 items-center ">
                            <p className="px-2 py-0.5 bg-slate-50 ring-1 ring-slate-300 rounded-md shadow">
                                {itemChecked.length} element sélectionnées
                            </p>
                            <SelectionActionButton selectedItems={itemChecked} />
                        </div>
                    )}
                </div>
                <SimplePagination limit={limit} totalItems={totalItems} />
            </div>
            <DataTable columns={transactionsColumn} data={transactions} />
        </>
    );
};

export default ListLocation;
