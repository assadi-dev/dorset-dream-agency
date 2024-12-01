import { ChartConfig } from "@/components/ui/chart";

export enum ServiceLabel {
    locationLS = "Location LS",
    locationIle = "Location Iles",
    ventesLS = "Ventes LS",
    venteIles = "Vente Iles",
}

export const chartConfig = {
    locationLS: {
        label: ServiceLabel.locationLS,
        color: "hsl(var(--chart-1))",
    },
    locationIle: {
        label: ServiceLabel.locationIle,
        color: "hsl(var(--chart-2))",
    },
    ventesLS: {
        label: ServiceLabel.ventesLS,
        color: "hsl(var(--chart-3))",
    },
    venteIles: {
        label: ServiceLabel.venteIles,
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;
