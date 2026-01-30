"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, Label, LabelList, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectMonth } from "../../../../../../components/forms/SelectMonth";
import { DAYS_OF_WEEK, getCurrentMonth, getNbOfDayInMonth, MONTHS_OF_YEAR } from "@/lib/date";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_CARD_QUERY, fetchTransactionCountPerWeek, fetchTransactionPerServiceStat } from "../../helper";
import { chartConfig } from "./chartConfig";

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

const PropertiesCountBar = () => {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("rental");

    const initialiseDate = defaultDate();

    const [state, setState] = React.useState({
        startDate: initialiseDate.starDate,
        endDate: initialiseDate.endDate,
    });

    const { data, isFetching } = useQuery({
        queryKey: [DASHBOARD_CARD_QUERY.DASHBOARD_STATS_TRANSACTION_PER_WEEK, state],
        queryFn: () => fetchTransactionCountPerWeek(state),
    });

    const CHART_DATA = React.useMemo(() => {
        if (!data) return;
        return data.data;
    }, [data]);

    const TOTAL = React.useMemo(
        () => ({
            rental: data ? data.rental : 0,
            sales: data ? data.sales : 0,
        }),
        [data],
    );

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
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 xl:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-2 px-6 py-5 sm:py-6">
                    <CardTitle>Total des Ventes et Locations</CardTitle>
                    <SelectMonth onValueChange={handleSelectMonth} />
                </div>
                <div className="flex">
                    {["rental", "sales"].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative  flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                                <span className="text-2xl font-bold leading-none xl:text-3xl text-center">
                                    {TOTAL[key as keyof typeof TOTAL].toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={CHART_DATA}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => DAYS_OF_WEEK[value]}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent className="w-[150px]" nameKey={activeChart} hideLabel />}
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default PropertiesCountBar;
