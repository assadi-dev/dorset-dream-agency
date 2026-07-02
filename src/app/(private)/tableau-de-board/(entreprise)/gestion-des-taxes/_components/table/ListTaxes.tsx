"use client"

import React from "react";

import DataTable from "@/components/Datatable/Datatable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import { CellColumn } from "@/app/types/ReactTable";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import useGetRoleUser from "@/hooks/useRoleUser";
import CheckBoxColumn from "@/components/Datatable/CheckBoxColumn";
import useSelectTableRow from "@/hooks/useSelectTableRow";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import { columns } from "./columns";
import TaxeActions from "./TaxeActions";
import TaxesSelectedActions from "./TaxesSelectedAction";


type ListTaxesProps = {
    taxes: any[];
    totalItems: number;
    limit: number;
};
const ListTaxes = ({ taxes, totalItems, limit }: ListTaxesProps) => {
    const role = useGetRoleUser();
    const { itemChecked, handleSelectedAllRow, handleSelectedRow, reset } = useSelectTableRow();

    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }: CellColumn) {
            return (
                <DropdownActions>
                    <TaxeActions
                        payload={row.original}
                        canDelete={ACTIONS_CONTROL_PERMISSION.canAction(role)}
                        canUpdate={true}
                        canUpload={ACTIONS_CONTROL_PERMISSION.canAction(role)}
                    />
                </DropdownActions>
            );
        },
    };

    const SelectColumns = CheckBoxColumn({
        onCheckedChange: handleSelectedRow,
        onCheckedAllChange: handleSelectedAllRow,
        selected: itemChecked,
    });
    const CategoriesColumn = ACTIONS_CONTROL_PERMISSION.canAction(role) ? [SelectColumns, ...columns, actions] : columns;

    return (
        <Card className="  px-2 bg-dynasty-card">
            <div className="my-5 flex justify-between items-center">
                <div className="min-w-[25vw]">
                    {" "}
                    <SearchInputDataTable />
                </div>
                <div>
                    {itemChecked.length > 0 && (
                        <TaxesSelectedActions itemSelected={itemChecked} resetSelectedRow={reset} />
                    )}
                </div>
            </div>
            <DataTable columns={CategoriesColumn} data={taxes} />
            <Separator className="my-2" />
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

export default ListTaxes;
