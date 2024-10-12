"use client";
import DataTable from "@/components/Datatable/Datatable";
import React from "react";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { fetchPropertiesCollections } from "../helpers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const ListProperties = () => {
    const { data, isFetching, error } = useQuery({
        queryKey: ["LIST_IMMOBILIER_GESTION"],
        queryFn: fetchPropertiesCollections,
    });

    return (
        <div>
            {error && (
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                        Un problème est survenue lors de la Récupérations des biens immobiliers
                    </AlertDescription>
                </Alert>
            )}

            {!error && data ? <DataTable columns={columns} data={data} /> : null}
        </div>
    );
};

export default ListProperties;
