"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

import SimpleTable from "@/components/Datatable/BasicTable";
import SearchInput from "@/components/forms/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_CARD_QUERY, fetchEmployeeIncomeTransaction, fetchTransactionCollection } from "../../helper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { columns } from "./column";
import { SelectMonth } from "@/components/forms/SelectMonth";
import { getCurrentMonth, getNbOfDayInMonth, MONTHS_OF_YEAR } from "@/lib/date";

const IncomeEmployee = () => {
    const currentMonth = getCurrentMonth();
    const [state, setState] = React.useState({
        search: "",
        page: 1,
        selectedMonth: currentMonth + 1,
    });
    const { debouncedValue } = useDebounce(state.search, 300);
    const currentYear = new Date().getFullYear();
    const startDate = `${currentYear}-${state.selectedMonth}-01 00:00`;
    const endDate = `${currentYear}-${state.selectedMonth}-${getNbOfDayInMonth(state.selectedMonth, currentYear)} 23:59`;
    const filter = { startDate, endDate, search: debouncedValue, page: state.page, limit: 10 };

    const { data } = useQuery({
        queryKey: [DASHBOARD_CARD_QUERY.DASHBOARD_STATS_TRANSACTION_PER_EMPLOYEES, filter],
        queryFn: () => fetchEmployeeIncomeTransaction(filter),
    });

    const DATA_TRANSACTIONS = React.useMemo<any[]>(() => {
        if (!data) return [];
        return data.data;
    }, [data]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setState((current) => ({ ...current, search: value }));
    };
    const handleSelectMonth = (value: string) => {
        const monthIndex = MONTHS_OF_YEAR.findIndex((m) => m === value);
        setState((current) => ({ ...current, selectedMonth: monthIndex + 1 }));
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
                        <SelectMonth onValueChange={handleSelectMonth} />
                    </div>
                    <ScrollArea className="py-3 h-[200px] lg:h-[300px]">
                        <SimpleTable
                            columns={columns}
                            data={DATA_TRANSACTIONS}
                            classNames={{
                                tableHeaderClassName: "text-center",
                            }}
                        />
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};

export default IncomeEmployee;
