"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { columns } from "./columns";
import SimpleTable from "@/components/Datatable/BasicTable";
import SearchInput from "@/components/forms/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_CARD_QUERY, fetchTransactionCollection } from "../../helper";
import { ScrollArea } from "@/components/ui/scroll-area";

const LastTransaction = () => {
    const [state, setState] = React.useState({
        search: "",
        page: 1,
    });

    const { debouncedValue } = useDebounce(state.search, 300);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setState((current) => ({ ...current, search: value }));
    };

    const { data } = useQuery({
        queryKey: [DASHBOARD_CARD_QUERY.DASHBOARD_STATS_TRANSACTION, debouncedValue, state.page],
        queryFn: () =>
            fetchTransactionCollection({
                page: state.page,
                search: debouncedValue,
            }),
    });

    const DATA_TRANSACTIONS = React.useMemo(() => {
        if (!data) return [];
        return data.data;
    }, [data]);

    return (
        <Card className="h-full w-full overflow-hidden">
            <CardHeader>
                <CardTitle>Dernières Locations et Ventes</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
                <div className="flex sm:flex-row sm:justify-between ">
                    <SearchInput onChange={handleSearch} />
                </div>
                <ScrollArea className="py-3 h-[300px] lg:h-[400px]">
                    <SimpleTable columns={columns} data={DATA_TRANSACTIONS} />
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default LastTransaction;
