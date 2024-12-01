"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { wait } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { chartConfig, ServiceLabel } from "./chartConfig";
import { SelectMonth } from "@/components/forms/SelectMonth";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_CARD_QUERY, fetchTransactionPerServiceStat } from "../../helper";

import { getCurrentMonth, getNbOfDayInMonth, MONTHS_OF_YEAR } from "@/lib/date";
import EmptyChart from "./EmptyChart";

const TransactionChart = () => {
    const currentMonth = getCurrentMonth();
    const [selectedMonth, setSelectedMonth] = React.useState<number>(currentMonth + 1);
    const currentYear = new Date().getFullYear();
    const startDate = `${currentYear}-${selectedMonth}-01 00:00`;
    const endDate = `${currentYear}-${selectedMonth}-${getNbOfDayInMonth(selectedMonth, currentYear)} 23:59`;
    const filter = { startDate, endDate };
    const { data, isFetching } = useQuery({
        queryKey: [DASHBOARD_CARD_QUERY.DASHBOARD_STATS_TRANSACTION_PER_SERVICES, filter],
        queryFn: () => fetchTransactionPerServiceStat(filter),
    });

    const CHART_DATA = React.useMemo(() => {
        if (!data) return [];

        return data.map((v) => {
            let secteur = "";
            if (v.service === "Location Iles") secteur = "locationIle";
            if (v.service === "Location LS") secteur = "locationLS";
            if (v.service === "Vente Iles") secteur = "venteIles";
            if (v.service === "Ventes LS") secteur = "ventesLS";
            return {
                secteur,
                ventes: v.total,
                fill: ` var(--color-${secteur})`,
            };
        });
    }, [data]);

    const handleSelectMonth = (value: string) => {
        const monthIndex = MONTHS_OF_YEAR.findIndex((m) => m === value);
        setSelectedMonth(monthIndex + 1);
    };

    return (
        <Card className="flex flex-col w-full h-full ">
            <CardHeader className="items-center pb-0">
                <CardTitle>Chiffre de l'agence en $</CardTitle>
                <SelectMonth onValueChange={handleSelectMonth} />
            </CardHeader>
            {CHART_DATA.length > 0 && !isFetching && (
                <ChartContainer config={chartConfig} className="mx-auto h-full">
                    <BarChart accessibilityLayer data={CHART_DATA}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="secteur"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value: string) => {
                                const servicesLabel = ServiceLabel as Record<string, string>;
                                return servicesLabel[value];
                            }}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent className="min-w-[200px]" />} />
                        <Bar dataKey="ventes" fill="var(--color-desktop)" radius={5} />
                        <ChartLegend content={<ChartLegendContent nameKey="secteur" />} />
                    </BarChart>
                </ChartContainer>
            )}
            {CHART_DATA.length === 0 && !isFetching && <EmptyChart />}
        </Card>
    );
};

export default TransactionChart;
