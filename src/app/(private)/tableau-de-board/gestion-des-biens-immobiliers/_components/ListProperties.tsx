"use client";
import DataTable from "@/components/Datatable/Datatable";
import React from "react";
import { columns } from "./columns";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPropertiesCollections } from "../helpers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import ActionsImmobilier from "./ActionsImmobilier";
import DropdownActions from "@/components/Datatable/DropdownActions";
import { CellColumn } from "@/app/types/ReactTable";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { useSearchParams } from "next/navigation";
import { PROPERTY_QUERY_KEY } from "@/app/types/QueryKeys";
import useDataCollections from "@/hooks/useDataCollections";
import useGetRoleUser from "@/hooks/useRoleUser";
import { Role } from "@/app/types/user";
import { ACTIONS_CONTROL_PERMISSION } from "@/lib/access";
import useSelectTableRow from "@/hooks/useSelectTableRow";
import CheckBoxColumn from "@/components/Datatable/CheckBoxColumn";
import SelectionActions from "./SelectedActions";
import { selectedLabel } from "@/lib/text";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SearchInputDataTable from "@/components/Datatable/SearchInputDataTable";

const ListProperties = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";

    const { data, isFetching, error } = useQuery({
        queryKey: [PROPERTY_QUERY_KEY.LIST_IMMOBILIER_GESTION, page, limit, search],
        queryFn: () => fetchPropertiesCollections({ page, limit, search }),
        refetchOnMount: true,
        placeholderData: keepPreviousData,
    });

    const role = useGetRoleUser();

    const { itemChecked, handleSelectedRow, handleSelectedAllRow, reset } = useSelectTableRow();

    const PROPERTIES_COLLECTIONS = useDataCollections(data);

    const actions = {
        id: "actions",
        enableHiding: false,
        cell: ({ row }: CellColumn) => (
            <DropdownActions>
                <ActionsImmobilier payload={row.original} />
            </DropdownActions>
        ),
    };
    const SelectColumns = CheckBoxColumn({
        onCheckedChange: handleSelectedRow,
        onCheckedAllChange: handleSelectedAllRow,
        selected: itemChecked,
    });
    const ImmobilierColumns = ACTIONS_CONTROL_PERMISSION.canAction(role)
        ? [SelectColumns, ...columns, actions]
        : columns;

    return (
        <Card className="px-2 bg-white">
            {/*       {error && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                        Un problème est survenue lors de la Récupérations des biens immobiliers
                    </AlertDescription>
                </Alert>
            )} */}
            <div className="my-5  flex items-center justify-between">
                <div className="flex items-center gap-2  min-w-[25vw]">
                    <SearchInputDataTable />
                </div>
                <div className="flex items-center gap-2">
                    {itemChecked.length > 0 && (
                        <div className="flex gap-3 items-center ">
                            <p className="px-2 py-0.5 text-muted-foreground">{selectedLabel(itemChecked.length)}</p>
                            <SelectionActions selectedItems={itemChecked} resetSelected={reset} />
                        </div>
                    )}
                </div>
            </div>
            {!error && (
                <DataTable columns={ImmobilierColumns} data={PROPERTIES_COLLECTIONS.data} isLoading={isFetching} />
            )}
            <Separator className="my-3" />
            <CardFooter>
                <div className="flex justify-between items-center w-full">
                    <div></div>

                    <div className="self-end">
                        {!error && <SimplePagination totalItems={PROPERTIES_COLLECTIONS.totalItems} limit={limit} />}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ListProperties;
