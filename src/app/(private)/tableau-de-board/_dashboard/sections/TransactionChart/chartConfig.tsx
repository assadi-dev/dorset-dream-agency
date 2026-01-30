import { ChartConfig } from "@/components/ui/chart";

export enum ServiceLabel {
    locationLS = "Location LS",
    locationFavelas = "Location Favelas",
    ventesLS = "Ventes LS",
    ventesFavelas = "Ventes Favelas",
    ventesBlaineCounty = "Ventes Blaine County",
    locationBlaineCounty = "Location Blaine County",
}

export const chartConfig = {
    locationLS: {
        label: ServiceLabel.locationLS,
        color: "hsl(var(--chart-1))",
    },
    locationFavelas: {
        label: ServiceLabel.locationFavelas,
        color: "hsl(var(--chart-2))",
    },
    ventesLS: {
        label: ServiceLabel.ventesLS,
        color: "hsl(var(--chart-3))",
    },
    ventesFavelas: {
        label: ServiceLabel.ventesFavelas,
        color: "hsl(var(--chart-4))",
    },
    locationBlaineCounty: {
        label: ServiceLabel.locationBlaineCounty,
        color: "hsl(var(--chart-2))",
    },
    ventesBlaineCounty: {
        label: ServiceLabel.ventesBlaineCounty,
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;
