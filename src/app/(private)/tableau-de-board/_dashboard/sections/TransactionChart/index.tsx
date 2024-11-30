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

const TransactionChart = () => {
    const chartDataMock = [
        { secteur: "locationLS", ventes: 100, fill: "var(--color-locationLS)" },
        { secteur: "locationIle", ventes: 100, fill: "var(--color-locationIle)" },
        { secteur: "venteLS", ventes: 100, fill: "var(--color-venteLS)" },
        { secteur: "venteIles", ventes: 100, fill: "var(--color-venteIles)" },
    ];

    const chartConfig = {
        locationLS: {
            label: "Location LS",
            color: "hsl(var(--chart-1))",
        },
        locationIle: {
            label: "Location iles",
            color: "hsl(var(--chart-2))",
        },
        venteLS: {
            label: "Ventes LS",
            color: "hsl(var(--chart-3))",
        },
        venteIles: {
            label: "Vente iles",
            color: "hsl(var(--chart-4))",
        },
        other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
        },
    } satisfies ChartConfig;

    return (
        <div>
            <Card className="flex flex-col w-full h-full">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Chiffre de l'agence</CardTitle>
                </CardHeader>
                <ChartContainer config={chartConfig} className="mx-auto h-full">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartDataMock} dataKey="ventes" nameKey="secteur" />
                        <ChartLegend content={<ChartLegendContent nameKey="secteur" />} />
                    </PieChart>
                </ChartContainer>
            </Card>
        </div>
    );
};

export default TransactionChart;
