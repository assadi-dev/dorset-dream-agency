"use client";
import { CellColumn } from "@/app/types/ReactTable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import React from "react";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import useGetRoleUser from "@/hooks/useRoleUser";
import useSelectTableRow from "@/hooks/useSelectTableRow";
import CheckBoxColumn from "@/components/Datatable/CheckBoxColumn";
import { columns } from "./columns";
import GradeMoreAction from "./GradeMoreAction";
import { Card, CardFooter } from "@/components/ui/card";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import DataTable from "@/components/Datatable/Datatable";
import SimplePagination from "@/components/Paginations/SimplePagination";

type ListGradesProps = {
    grades: { name: string; description: string; createdAt: string; updatedAt: string }[];
    limit: number;
    totalItems: number;
};
const ListGrades = ({ grades, totalItems, limit }: ListGradesProps) => {
    const role = useGetRoleUser();
    const { itemChecked, handleSelectedRow, handleSelectedAllRow, reset } = useSelectTableRow();

    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }: CellColumn) {
            return (
                <DropdownActions>
                    <GradeMoreAction
                        payload={row.original}
                        canUpdate={ACTIONS_CONTROL_PERMISSION.canAction(role)}
                        canChangePassword={ACTIONS_CONTROL_PERMISSION.canAction(role)}
                        canDelete={ACTIONS_CONTROL_PERMISSION.canAction(role)}
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
    const gradeColumns = ACTIONS_CONTROL_PERMISSION.canAction(role)
        ? [SelectColumns, ...columns, actions]
        : [SelectColumns, ...columns];
    return (
        <>
            <Card className="px-2 bg-white">
                <div className="my-5 flex justify-between items-center">
                    <div className="min-w-[25vw]">
                        <SearchInputDataTable />
                    </div>
                    <div>
                        {/*      {itemChecked.length > 0 && (
                        <AccountSelectedActions selectedItems={itemChecked} resetSelected={reset} />
                    )} */}
                    </div>
                </div>
                <DataTable columns={gradeColumns} data={grades} />
                <CardFooter>
                    <div className="flex items-center justify-between w-full">
                        <div></div>
                        <SimplePagination limit={limit} totalItems={totalItems} />
                    </div>
                </CardFooter>
            </Card>
        </>
    );
};

export default ListGrades;
