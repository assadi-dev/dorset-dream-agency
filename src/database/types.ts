export type OrderType = "desc" | "asc";

export type FilterPaginationType = {
    page?: number;
    limit?: number;
    order?: OrderType;
    orderColumn?: string;
    search?: string | null;
};