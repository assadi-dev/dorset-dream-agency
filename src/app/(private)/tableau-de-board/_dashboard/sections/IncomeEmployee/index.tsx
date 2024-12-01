"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

import SimpleTable from "@/components/Datatable/BasicTable";
import SearchInput from "@/components/forms/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_CARD_QUERY, fetchTransactionCollection } from "../../helper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { columns } from "./column";
import { SelectMonth } from "@/components/forms/SelectMonth";

const IncomeEmployee = () => {
    const DATA_TRANSACTIONS = React.useMemo(() => {
        //if (!data) return [];
        return [];
    }, []);

    const [state, setState] = React.useState({
        search: "",
        page: 1,
    });

    const { debouncedValue } = useDebounce(state.search, 300);
    /*     const { data } = useQuery({
        queryKey: [DASHBOARD_CARD_QUERY.DASHBOARD_STATS_TRANSACTION, debouncedValue, state.page],
        queryFn: () =>
            fetchTransactionCollection({
                page: state.page,
                search: debouncedValue,
            }),
    });
 */
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setState((current) => ({ ...current, search: value }));
    };

    return (
        <div>
            <Card className="">
                <CardHeader>
                    <CardTitle>Derniers contributions des employées</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex sm:flex-row sm:justify-between items-center">
                        <SearchInput onChange={handleSearch} />
                        <SelectMonth />
                    </div>
                    <ScrollArea className="py-3 h-[200px] lg:h-[300px]">
                        <SimpleTable columns={columns} data={DATA_TRANSACTIONS} />
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};

export default IncomeEmployee;
