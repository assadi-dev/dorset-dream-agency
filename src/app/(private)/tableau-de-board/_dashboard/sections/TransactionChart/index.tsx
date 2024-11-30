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

const TransactionChart = () => {
    const chartDataMock = [
        { secteur: "locationLS", ventes: 100, fill: "var(--color-locationLS)" },
        { secteur: "locationIle", ventes: 100, fill: "var(--color-locationIle)" },
        { secteur: "venteLS", ventes: 100, fill: "var(--color-venteLS)" },
        { secteur: "venteIles", ventes: 100, fill: "var(--color-venteIles)" },
    ];

    return (
        <Card className="flex flex-col w-full h-full ">
            <CardHeader className="items-center pb-0">
                <CardTitle>Chiffre de l'agence</CardTitle>
                <SelectMonth />
            </CardHeader>
            <ChartContainer config={chartConfig} className="mx-auto h-full">
                <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={chartDataMock} dataKey="ventes" nameKey="secteur" />
                    <ChartLegend content={<ChartLegendContent nameKey="secteur" />} />
                </PieChart>
            </ChartContainer>
        </Card>
    );
};

export default TransactionChart;
