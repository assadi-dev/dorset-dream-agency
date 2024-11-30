"use client";
import React from "react";
import { Pie, PieChart } from "recharts";
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
import { chartConfig } from "./chartConfig";
import { SelectMonth } from "@/components/forms/SelectMonth";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactionPerServiceStat } from "../../helper";
import { MonthEnum } from "@/app/types";
import { getNbOfDayInMonth, MONTHS_OF_YEAR } from "@/lib/date";

const TransactionChart = () => {
    const currentMont = new Date().getMonth();
    const [selectedMonth, setSelectedMonth] = React.useState<number>(currentMont);
    const currentYear = new Date().getFullYear();
    const startDate = `${currentYear}-${selectedMonth}-01 00:00`;
    const endDate = `${currentYear}-${selectedMonth}-${getNbOfDayInMonth(selectedMonth, currentYear)} 23:59`;
    const filter = { startDate, endDate };
    const { data } = useQuery({ queryKey: [selectedMonth], queryFn: () => fetchTransactionPerServiceStat(filter) });
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

    return (
        <Card className="flex flex-col w-full h-full ">
            <CardHeader className="items-center pb-0">
                <CardTitle>Chiffre de l'agence en $</CardTitle>
                <SelectMonth defaultValue={MONTHS_OF_YEAR[selectedMonth - 1]} />
            </CardHeader>
            <ChartContainer config={chartConfig} className="mx-auto h-full">
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel className="min-w-[200px]" />}
                    />
                    <Pie data={CHART_DATA} dataKey="ventes" label nameKey="secteur" />
                    <ChartLegend content={<ChartLegendContent nameKey="secteur" />} />
                </PieChart>
            </ChartContainer>
        </Card>
    );
};

export default TransactionChart;
