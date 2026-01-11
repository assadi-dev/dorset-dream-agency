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
import SelectionActionButton from "./SelectionActionButton";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import { useSession } from "next-auth/react";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FilterSection from "./FilterSection";

type ListLocationProps = {
    transactions: any[];
    totalItems: number;
    limit: number;
};
const ListLocation = ({ transactions, limit, totalItems }: ListLocationProps) => {
    const session = useSession();
    const { data } = session;
    const IS_ADMIN = ACTIONS_CONTROL_PERMISSION.isAdmin(data?.user?.role);
    const { itemChecked, handleSelectedRow, handleSelectedAllRow, reset } = useSelectTableRow();
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
    const transactionsColumn = (IS_ADMIN && [SelectColumns, ...columns, actions]) || [...columns, actions];

    return (
        <Card className="px-2 bg-white">
            <div className="my-5 flex flex-col md:flex-row justify-between items-center gap-3">
                <div className="flex items-center gap-2  w-full md:max-w-[35vw] xl:max-w-[25vw] ">
                    <SearchInputDataTable />
                </div>

                {itemChecked.length > 0 ? (
                    <div className="flex gap-3 items-center justify-center">
                        <p className="px-2 py-0.5  text-nowrap text-muted-foreground">
                            {itemChecked.length} element sélectionnées
                        </p>
                        <SelectionActionButton selectedItems={itemChecked} resetSelected={reset} />
                    </div>
                ) : (
                    <FilterSection />
                )}
            </div>
            <DataTable columns={transactionsColumn} data={transactions} />
            <Separator className="my-3" />
            <CardFooter>
                <div className="flex justify-between items-center w-full">
                    <div></div>

                    <div className="self-end">
                        <SimplePagination limit={limit} totalItems={totalItems} />
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ListLocation;
