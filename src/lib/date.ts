import { format, getISOWeek } from "date-fns";
import { fr } from "date-fns/locale";

//const timeZone = "Europe/Paris";

/**
 * Retourne la date au format suivant YYYY-MM-DD
 * @param {*} date
 */
export const dateFormatISO8601 = (date: string) => {
    return format(new Date(date), "yyyy-MM-dd");
};

/**
 * Retourne la date et l'heure au format suivant YYYY-MM-DD HH:MM
 * @param {*} date
 */
export const datetimeFormatWithoutSecISO8601 = (date: string) => {
    return format(new Date(date), "yyyy-MM-dd HH:mm");
};

/**
 * Retourne la date et l'heure au format suivant DD-MM-YYYY à HH:MM:SS
 * @param {*} date
 */
export const datetimeFormatFr = (date: string) => {
    try {
        const dt = new Date(date);
        return format(dt, "dd-MM-yyyy à HH:mm");
    } catch (error: any) {
        return "Format de la date incorrect";
    }
};

/**
 * Retourne la date et l'heure au format suivant DD-MM-YYYY à HH:MM:SS
 * @param {*} date
 */
export const datetimeFormatFr2 = (date: string) => {
    try {
        const dt = new Date(date);
        return format(dt, "dd / MM / yyyy à HH:mm");
    } catch (error: any) {
        return "Format de la date incorrect";
    }
};

/**
 * Retourne la date au format suivant mar 29 juil 2024
 * @param {*} date
 * @returns
 */
export const formatFullDateShortText = (date: Date) => {
    if (!date) return "";
    return format(new Date(date), "eee dd MMM yyyy", { locale: fr });
};

/**
 * Retourne la date au format suivant mar 29 juil 2024 à 10h35
 * @param {*} date
 */
export const formatFullDateShortTextWitHours = (date: Date) => {
    if (!date) return "";
    return format(new Date(date), "eee dd MMM yyyy à HH'h'mm", { locale: fr });
};

/**
 * Retourne la date au format suivant mar 29 juil 2024
 * @param {*} date
 * @returns
 */
export const getHour = (date: Date) => {
    if (!date) return "";
    return format(new Date(date), "HH:mm", { locale: fr });
};

/**
 *Retourne le numero de la semaine à partir de la date
 */
export const getWeekNumber = (date: Date) => {
    const dt = new Date(date);
    const result = getISOWeek(dt);
    return result;
};
