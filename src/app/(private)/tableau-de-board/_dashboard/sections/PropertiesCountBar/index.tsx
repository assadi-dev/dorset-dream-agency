"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, Label, LabelList, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectMonth } from "../../../../../../components/forms/SelectMonth";
import { DAYS_OF_WEEK } from "@/lib/date";

const chartData = [
    { day: 0, rental: 222, sales: 150 },
    { day: 1, rental: 97, sales: 180 },
    { day: 2, rental: 167, sales: 120 },
    { day: 3, rental: 242, sales: 260 },
    { day: 4, rental: 373, sales: 290 },
    { day: 5, rental: 301, sales: 340 },
    { day: 6, rental: 245, sales: 180 },
];

const chartConfig = {
    total: {
        label: "Total",
    },
    rental: {
        label: "Locations",
        color: "hsl(var(--chart-1))",
    },
    sales: {
        label: "Ventes",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

const PropertiesCountBar = () => {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("rental");

    const total = React.useMemo(
        () => ({
            rental: chartData.reduce((acc, curr) => acc + curr.rental, 0),
            sales: chartData.reduce((acc, curr) => acc + curr.sales, 0),
        }),
        [],
    );

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-2 px-6 py-5 sm:py-6">
                    <CardTitle>Total de ventes et location</CardTitle>
                    <SelectMonth />
                </div>
                <div className="flex">
                    {["rental", "sales"].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key as keyof typeof total].toLocaleString()}
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
                        data={chartData}
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
