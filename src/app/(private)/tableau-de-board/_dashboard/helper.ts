import { API_INSTANCE } from "@/lib/api";
import { formatFullDateShortText, getHour, getWeekNumber } from "@/lib/date";
import { getClientCountResponse } from "./_cards/types";

export enum DASHBOARD_CARD_QUERY {
    DASHBOARD_STATS_CLIENT = "dashboard_stats_clients",
    DASHBOARD_STATS_TRANSACTION = "dashboard_stats_transaction",
    DASHBOARD_STATS_INCOME = "dashboard_stats_income",
}

export const getDateToday = () => {
    const dt = new Date();
    const day = formatFullDateShortText(dt)?.replace(/\./g, "");
    const hours = getHour(dt);
    const week = getWeekNumber(dt);
    return { day, hours, week };
};

export const getClientCount = async (startDate: string, endDate: string): Promise<getClientCountResponse> => {
    const response = await API_INSTANCE.get("/analytics/dashboards/clients", {
        params: {
            startDate,
            endDate,
        },
    });
    return response.data;
};
