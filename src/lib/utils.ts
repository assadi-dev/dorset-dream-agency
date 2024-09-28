import { ENV } from "@/config/global";
import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Insertion du titre de la page
 * @param title titre de la page
 * @returns
 */
export const setTitlePage = (title?: string) => {
    const metadata: Metadata = {
        title: title ? `${title} - ${ENV.APP_TITLE}` : ENV.APP_TITLE,
        description: `Panel d'administration de l'agence immobilier ${ENV.APP_TITLE}`,
    };

    return metadata;
};
