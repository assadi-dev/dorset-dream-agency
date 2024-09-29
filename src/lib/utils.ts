import { ENV } from "@/config/global";
import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Insertion du titre de la page et retourne l'objet metadata
 * @param title titre de la page
 *
 */
export const setTitlePage = (title?: string) => {
    const metadata: Metadata = {
        title: title ? `${title} - ${ENV.APP_TITLE}` : ENV.APP_TITLE,
        description: `Panel d'administration de l'agence immobilier ${ENV.APP_TITLE}`,
    };

    return metadata;
};

export const currentYear = () => {
    return new Date().getFullYear();
};

/**
 * Force la premiere lettre en majuscule
 * @param word
 */
export const firstLetterCapitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export const wait = (delay: number): Promise<"Ready !"> => {
    return new Promise((resolve) => setTimeout(() => resolve("Ready !"), delay));
};

export const execution_delayed = (delay: number, cb: () => void) => {
    return new Promise((resolve) =>
        setTimeout(() => {
            cb();
            resolve("done !");
        }, delay),
    );
};
