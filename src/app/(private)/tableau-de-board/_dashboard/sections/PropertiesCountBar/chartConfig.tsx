import { ChartConfig } from "@/components/ui/chart";

export const description = "An interactive bar chart";

export const chartConfig = {
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
