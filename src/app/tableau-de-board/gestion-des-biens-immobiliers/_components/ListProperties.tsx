"use client";
import DataTable from "@/components/Datatable/Datatable";
import React from "react";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { PROPERTY_QUERY_KEY, fetchPropertiesCollections } from "../helpers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import ActionsImmobilier from "./ActionsImmobilier";
import DropdownActions from "@/components/Datatable/DropdownActions";
import { CellColumn } from "@/app/types/ReactTable";

const ListProperties = () => {
    const { data, isFetching, error } = useQuery({
        queryKey: [PROPERTY_QUERY_KEY.LIST_IMMOBILIER_GESTION],
        queryFn: fetchPropertiesCollections,
        refetchOnMount: true,
    });

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

            {!error && data ? <DataTable columns={ImmobilierColumns} data={data} /> : null}
        </div>
    );
};

export default ListProperties;
