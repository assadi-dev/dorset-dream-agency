import {
    format,
    getISOWeek,
    getDaysInMonth,
    startOfWeek,
    lastDayOfMonth,
    getMonth,
    differenceInDays,
    differenceInCalendarDays,
} from "date-fns";
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
export const datetimeFormatFr3 = (date: string) => {
    try {
        const dt = new Date(date);
        return format(dt, "dd-MM-yyyy");
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
 *Retourne le numéro de la semaine à partir de la date
 */
export const getWeekNumber = (date: Date) => {
    const dt = new Date(date);
    const result = getISOWeek(dt);
    return result;
};

export const DAYS_OF_WEEK = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export const MONTHS_OF_YEAR = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
];

/**
 * Retourne le nombre de jours dans le mois de l'année indiqué en paramètre
 *
 */
export const getNbOfDayInMonth = (month: number, year: number) => {
    const currentYear = year || new Date().getFullYear();
    return getDaysInMonth(new Date(currentYear, month));
};
/**
 * Retourne le dernier jours du mois de l'année
 *
 */
export const getLastDayInMonth = (month: number, year: number) => {
    const currentYear = year || new Date().getFullYear();
    const result = lastDayOfMonth(new Date(currentYear, month));
    return result;
};

/**
 * Retourne a date du debut de la semaine
 *
 */
export const getStartOfWeek = (date?: string) => {
    const dt = date ? new Date(date) : new Date();
    const result = startOfWeek(dt, { weekStartsOn: 1 });
    return result;
};

export const getCurrentMonth = (date?: string) => {
    const dateTime = date ? new Date(date) : new Date();
    return getMonth(dateTime);
};

//export const maxAge = params.maxAge || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
