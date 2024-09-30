import { formatFullDateShortText, getHour, getWeekNumber } from "@/lib/date";

export const getDateToday = () => {
    const dt = new Date();
    const day = formatFullDateShortText(dt)?.replace(/\./g, "");
    const hours = getHour(dt);
    const week = getWeekNumber(dt);
    return { day, hours, week };
};
