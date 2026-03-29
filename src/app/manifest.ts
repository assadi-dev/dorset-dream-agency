import { ENV } from "@/config/global";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Dynasty 8",
        short_name: "D8",
        description: `Consulter le catalogue des biens immobilier proposer par l'agence ${ENV.APP_TITLE}`,
        start_url: "/",
        id: "/",
        display: "standalone",
        display_override: ["standalone", "minimal-ui"],
        background_color: "#106835",
        theme_color: "#106835",
        icons: [
            {
                src: "/favicon/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/favicon/android-chrome-144x144.png",
                sizes: "144x144",
                type: "image/png",
            },
            {
                src: "/favicon/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/favicon/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
