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
