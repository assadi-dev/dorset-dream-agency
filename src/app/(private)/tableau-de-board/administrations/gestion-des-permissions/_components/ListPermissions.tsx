"use client";
import { CellColumn } from "@/app/types/ReactTable";
import DropdownActions from "@/components/Datatable/DropdownActions";
import React from "react";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import useGetRoleUser from "@/hooks/useRoleUser";
import useSelectTableRow from "@/hooks/useSelectTableRow";
import CheckBoxColumn from "@/components/Datatable/CheckBoxColumn";
import { columns } from "./columns";
import GradeMoreAction from "./PermissionsMoreAction";
import { Card, CardFooter } from "@/components/ui/card";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";
import DataTable from "@/components/Datatable/Datatable";
import SimplePagination from "@/components/Paginations/SimplePagination";
import PermissionsMoreAction from "./PermissionsMoreAction";
import useGetResourcesLabels from "../_hooks/useGetResourcesLabels";
import { useSearchParams } from "next/navigation";

type ListPermissionsProps = {
    permissions: { name: string; description: string; action: string; createdAt: string; updatedAt: string }[];
    limit: number;
    totalItems: number;
};
const ListPermissions = ({ permissions, totalItems, limit }: ListPermissionsProps) => {
    const role = useGetRoleUser();
    const { itemChecked, handleSelectedRow, handleSelectedAllRow, reset } = useSelectTableRow();

    const resourcesCollections = useGetResourcesLabels({ limit });

    const SelectColumns = CheckBoxColumn({
        onCheckedChange: handleSelectedRow,
        onCheckedAllChange: handleSelectedAllRow,
        selected: itemChecked,
    });
    const roleColumns = ACTIONS_CONTROL_PERMISSION.canAction(role)
        ? [SelectColumns, ...columns]
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
                <DataTable columns={roleColumns} data={resourcesCollections.collections} />
                <CardFooter>
                    <div className="flex items-center justify-between w-full">
                        <div></div>
                        {<SimplePagination limit={limit} totalItems={resourcesCollections.totalCount} />}
                    </div>
                </CardFooter>
            </Card>
        </>
    );
};

export default ListPermissions;
