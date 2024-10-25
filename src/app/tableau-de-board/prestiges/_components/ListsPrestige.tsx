"use client";
import DataTable from "@/components/Datatable/Datatable";
import React from "react";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { fetch_prestige } from "../helper";
import AlertDestructive from "@/components/notify/AlertDestructive";

const ListsPrestige = () => {
    const { data, error, isFetching } = useQuery({
        queryKey: ["GET_PRESTIGE_PROPERTIES"],
        queryFn: () => fetch_prestige(),
        refetchOnMount: true,
    });

    const PRESTIGE_DATA = React.useMemo(() => {
        if (!data) return [];
        return data;
    }, [data]);

    return (
        <div>
            <div className="my-3">{error ? <AlertDestructive title="Erreur" description={error.message} /> : null}</div>
            <DataTable columns={columns} data={PRESTIGE_DATA} />
        </div>
    );
};

export default ListsPrestige;
