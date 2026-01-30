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

const currentMonth = getCurrentMonth();
const currentYear = new Date().getFullYear();
const defaultDate = () => {
    const date = new Date(new Date().setDate(1)).setHours(0, 0, 0, 0);
    const days = getNbOfDayInMonth(currentMonth, currentYear);
    const endDate = new Date(new Date(date).setDate(days)).setHours(23, 59, 59, 999);

    return {
        starDate: new Date(date).toISOString(),
        endDate: new Date(endDate).toISOString(),
    };
};

const IncomeEmployee = () => {
    const initialiseDate = defaultDate();

    const [state, setState] = React.useState({
        search: "",
        page: 1,
        startDate: initialiseDate.starDate,
        endDate: initialiseDate.endDate,
    });
    const { debouncedValue } = useDebounce(state.search, 300);

    const { startDate, endDate } = state;

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

        const date = new Date(new Date().setMonth(monthIndex, 1)).setHours(0, 0, 0, 0);
        const days = getNbOfDayInMonth(monthIndex, currentYear);
        const endDate = new Date(new Date(date).setDate(days)).setHours(23, 59, 59, 999);

        const initialiseDate = {
            startDate: new Date(date).toISOString(),
            endDate: new Date(endDate).toISOString(),
        };
        setState((current) => ({
            ...current,
            selectedMonth: monthIndex,
            ...initialiseDate,
        }));
    };

    return (
        <Card className="h-full w-full overflow-hidden">
            <CardHeader>
                <CardTitle>Dernières contributions des employés</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
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
    );
};

export default IncomeEmployee;
