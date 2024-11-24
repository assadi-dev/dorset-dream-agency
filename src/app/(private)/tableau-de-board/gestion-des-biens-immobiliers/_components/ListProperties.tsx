"use client";
import DataTable from "@/components/Datatable/Datatable";
import React from "react";
import { columns } from "./columns";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PROPERTY_QUERY_KEY, fetchPropertiesCollections } from "../helpers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import ActionsImmobilier from "./ActionsImmobilier";
import DropdownActions from "@/components/Datatable/DropdownActions";
import { CellColumn } from "@/app/types/ReactTable";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { useSearchParams } from "next/navigation";

const ListProperties = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    console.log(searchParams.get("limit"));

    const { data, isFetching, error } = useQuery({
        queryKey: [PROPERTY_QUERY_KEY.LIST_IMMOBILIER_GESTION, page, limit],
        queryFn: () => fetchPropertiesCollections({ page, limit }),
        refetchOnMount: true,
        placeholderData: keepPreviousData,
    });

    const totalPagination = data ? data.totalItems : 0;

    const actions = {
        id: "actions",
        enableHiding: false,
        cell: ({ row }: CellColumn) => (
            <DropdownActions>
                <ActionsImmobilier payload={row.original} />
            </DropdownActions>
        ),
    };
    const ImmobilierColumns = [...columns, actions];

    return (
        <div>
            {error && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                        Un problème est survenue lors de la Récupérations des biens immobiliers
                    </AlertDescription>
                </Alert>
            )}
            <div className="mb-3 flex items-center justify-between">
                <div></div>
                {!error && data && <SimplePagination totalItems={totalPagination} limit={limit} />}
            </div>
            {!error && data ? <DataTable columns={ImmobilierColumns} data={data.data} /> : null}
        </div>
    );
};

export default ListProperties;
