"use client";

import React from "react";
import { columns } from "./columns";
import DataTable from "@/components/Datatable/Datatable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import EmployeesActions from "./EmployeesActions";
import { CellColumn } from "@/app/types/ReactTable";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import useGetRoleUser from "@/hooks/useRoleUser";
import CheckBoxColumn from "@/components/Datatable/CheckBoxColumn";
import EmployeeSelectedActions from "./EmployeeSelectedActions";
import useSelectTableRow from "@/hooks/useSelectTableRow";

type ListEmployeeProps = {
    employees: any[];
    totalItems: number;
    limit: number;
};
const ListEmployee = ({ employees, totalItems, limit }: ListEmployeeProps) => {
    const role = useGetRoleUser();
    const { itemChecked, handleSelectedAllRow, handleSelectedRow, reset } = useSelectTableRow();

    const actions = {
        id: "actions",
        enableHiding: false,
        cell({ row }: CellColumn) {
            return (
                <DropdownActions>
                    <EmployeesActions
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
    const EmployeesColumn = ACTIONS_CONTROL_PERMISSION.canAction(role) ? [SelectColumns, ...columns, actions] : columns;

    return (
        <>
            <div className="my-5 flex justify-between items-center">
                <div>
                    {itemChecked.length > 0 && (
                        <EmployeeSelectedActions itemSelected={itemChecked} resetSelectedRow={reset} />
                    )}
                </div>
                <SimplePagination limit={limit} totalItems={totalItems} />
            </div>
            <DataTable columns={EmployeesColumn} data={employees} />
        </>
    );
};

export default ListEmployee;
