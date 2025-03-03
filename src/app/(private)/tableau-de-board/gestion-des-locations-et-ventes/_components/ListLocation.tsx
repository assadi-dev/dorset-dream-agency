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
                <div></div>
                <SimplePagination limit={limit} totalItems={totalItems} />
            </div>
            <DataTable columns={transactionsColumn} data={transactions} />
        </>
    );
};

export default ListLocation;
