import { ENV } from "@/config/global";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Dorset Dream Agency",
        short_name: "Dorset Dream",
        description: `Consulter le catalogue des biens immobilier proposer par l'agence ${ENV.APP_TITLE}`,
        start_url: "/",
        id: "/",
        display: "standalone",
        background_color: "#060a5b",
        theme_color: "#060a5b",
        icons: [
            {
                src: "/favicon/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/favicon/favicon-144x144.png",
                sizes: "144x144",
                type: "image/png",
            },
            {
                src: "/favicon/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/favicon/android-chrome-384x384.png",
                sizes: "384x384",
                type: "image/png",
            },
        ],
    };
}
