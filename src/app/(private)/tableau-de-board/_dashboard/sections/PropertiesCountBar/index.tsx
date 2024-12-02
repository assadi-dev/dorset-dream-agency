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

const PropertiesCountBar = () => {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("rental");

    const currentMonth = getCurrentMonth();
    const [selectedMonth, setSelectedMonth] = React.useState<number>(currentMonth + 1);
    const currentYear = new Date().getFullYear();
    const startDate = `${currentYear}-${selectedMonth}-01 00:00`;
    const endDate = `${currentYear}-${selectedMonth}-${getNbOfDayInMonth(selectedMonth, currentYear)} 23:59`;
    const filter = { startDate, endDate };
    const { data, isFetching } = useQuery({
        queryKey: [DASHBOARD_CARD_QUERY.DASHBOARD_STATS_TRANSACTION_PER_WEEK, filter],
        queryFn: () => fetchTransactionCountPerWeek(filter),
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
        setSelectedMonth(monthIndex + 1);
    };

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-2 px-6 py-5 sm:py-6">
                    <CardTitle>Total de ventes et location</CardTitle>
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
                                <span className="text-lg font-bold leading-none sm:text-3xl">
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
