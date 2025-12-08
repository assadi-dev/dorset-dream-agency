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

type ListGradesProps = {
    grades: { name: string; description: string; createdAt: string }[];
    limit: number;
    totalItems: number;
};
const ListGrades = ({ grades }: ListGradesProps) => {
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
    const accountColumns = ACTIONS_CONTROL_PERMISSION.canAction(role)
        ? [SelectColumns, ...columns, actions]
        : [SelectColumns, ...columns];
    return <div>ListGrades</div>;
};

export default ListGrades;
