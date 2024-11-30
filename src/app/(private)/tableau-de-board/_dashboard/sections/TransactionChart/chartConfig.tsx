import { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
    locationLS: {
        label: "Location LS",
        color: "hsl(var(--chart-1))",
    },
    locationIle: {
        label: "Location iles",
        color: "hsl(var(--chart-2))",
    },
    ventesLS: {
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
