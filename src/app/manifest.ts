import { ENV } from "@/config/global";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Dorset Dream Agency",
        short_name: "Dorset Dream",
        description: `Consulter le catalogue des biens immobilier proposer par l'agence ${ENV.APP_TITLE}`,
        start_url: "/",
        display: "standalone",
        background_color: "#060a5b",
        theme_color: "#060a5b",
        icons: [
            {
                src: "../assets/favicon/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "../assets/favicon/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "../assets/favicon/android-chrome-384x384.png",
                sizes: "384x384",
                type: "image/png",
            },
        ],
    };
}
