import { PropertyService } from "@/app/types/properties";

export type TodayDateReducerType = { day: string; hours: string; week: number };

export type getDashboardResponse = {
    count: number;
    difference: {
        count: number;
        percentage: number;
    };
};
export type getDashboardSumResponse = {
    sum: number;
    difference: {
        sum: number;
        percentage: number;
    };
};
export type getDashboardTransactionsCountResponse = {
    total: number;
    rental: number;
    sales: number;
};

export type TransactionPerServiceStatResponse = {
    service: PropertyService;
    total: number;
};
export type TransactionCountPerWeekResponse = {
    rental: number;
    sales: number;
    data: {
        day: number; // 0-6
        rental: number;
        sales: number;
    }[];
};

export type FetchEmployeeIncomeTransactionResponse = {
    page: number;
    totalItems: number;
    limit: number;
    data: {
        seller: string;
        totalPrice: number;
        totalSalesPrice: number;
        totalRentPrice: number;
        totalSales: number;
        totalRent: number;
    }[];
};
