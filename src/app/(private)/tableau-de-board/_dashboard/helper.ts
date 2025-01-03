import { API_INSTANCE } from "@/lib/api";
import { formatFullDateShortText, getHour, getWeekNumber } from "@/lib/date";
import {
    FetchEmployeeIncomeTransactionResponse,
    getDashboardResponse,
    getDashboardSumResponse,
    getDashboardTransactionsCountResponse,
    TransactionCountPerWeekResponse,
    TransactionPerServiceStatResponse,
} from "./_cards/types";
import { wait } from "@/lib/utils";

export enum DASHBOARD_CARD_QUERY {
    DASHBOARD_STATS_CLIENT = "dashboard_stats_clients",
    DASHBOARD_STATS_TRANSACTION = "dashboard_stats_transaction",
    DASHBOARD_STATS_INCOME = "dashboard_stats_income",
    DASHBOARD_LAST_TRANSACTION = "dashboard_last_transaction",
    DASHBOARD_STATS_TRANSACTION_PER_SERVICES = "dashboard_stats_transaction_per_service",
    DASHBOARD_STATS_TRANSACTION_PER_WEEK = "dashboard_stats_transaction_per_week",
    DASHBOARD_STATS_TRANSACTION_PER_EMPLOYEES = "dashboard_stats_transaction_per_employees",
    DASHBOARD_ANNOUNCE = "dashboard_announce",
}

export const getDateToday = () => {
    const dt = new Date();
    const day = formatFullDateShortText(dt)?.replace(/\./g, "");
    const hours = getHour(dt);
    const week = getWeekNumber(dt);
    return { day, hours, week };
};

export const getClientCount = async (startDate: string, endDate: string): Promise<getDashboardResponse> => {
    const response = await API_INSTANCE.get("/analytics/dashboards/clients", {
        params: {
            startDate,
            endDate,
        },
    });
    return response.data;
};
export const getIncomeTransaction = async (startDate: string, endDate: string): Promise<getDashboardSumResponse> => {
    const response = await API_INSTANCE.get("/analytics/dashboards/incomeTransactions", {
        params: {
            startDate,
            endDate,
        },
    });
    return response.data;
};
export const getGlobalCountTransaction = async (): Promise<getDashboardTransactionsCountResponse> => {
    const response = await API_INSTANCE.get("/analytics/dashboards/transactionCount");
    return response.data;
};

export const fetchTransactionCollection = async (filter: { page: number; search: string | null }) => {
    const response = await API_INSTANCE.get("/transactions/collections", {
        params: { ...filter, limit: 10 },
    });
    return response.data;
};

export const fetchTransactionPerServiceStat = async (filter: {
    startDate: string;
    endDate: string;
}): Promise<TransactionPerServiceStatResponse[]> => {
    const response = await API_INSTANCE.get("/analytics/dashboards/charts/transactionPerService", {
        params: { ...filter },
    });
    return response.data;
};

export const fetchTransactionCountPerWeek = async (filter: {
    startDate: string;
    endDate: string;
}): Promise<TransactionCountPerWeekResponse> => {
    const response = await API_INSTANCE.get("/analytics/dashboards/charts/transactionPerWeek", {
        params: { ...filter },
    });
    return response.data;
};
export const fetchEmployeeIncomeTransaction = async (filter: {
    startDate: string;
    endDate: string;
    page: number;
    limit: number;
    search?: string | null;
}): Promise<FetchEmployeeIncomeTransactionResponse> => {
    const response = await API_INSTANCE.get("/analytics/dashboards/employeeContributions", {
        params: { ...filter },
    });
    return response.data;
};

export const fetchAnnounce = async (): Promise<{
    title: string;
    url: string;
} | null> => {
    try {
        const response = await API_INSTANCE.get("/announcements/display");
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
};
