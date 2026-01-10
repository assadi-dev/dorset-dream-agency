import { UserActionEnum } from "@/types/global";
import { LOCATION_STATUS } from "./drizzle/utils";

export type OrderType = "desc" | "asc";

export type FilterPaginationType = {
    page?: number;
    limit?: number;
    order?: OrderType;
    orderColumn?: string;
    search?: string | null;
};

export type BindParameters = Record<string, any> | undefined;

export type StartDateEnDateType = {
    startDate: string;
    endDate: string;
};

export type LocationStatusType = "death" | "disappearance" | "investigation" | "ongoing" | "cancelled";
