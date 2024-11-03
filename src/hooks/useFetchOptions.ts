import { API_INSTANCE } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type CategoryResponse = {
    id: number;
    label: string;
    value: string;
};
export const useCategoryPropertiesOptions = () => {
    const fetcher = React.useCallback(async (): Promise<CategoryResponse[]> => {
        try {
            const { data } = await API_INSTANCE.get("/enumCategoryProperty");
            return data;
        } catch (error: any) {
            throw error;
        }
    }, []);

    const query = useQuery({ queryKey: ["ENUM_PROPERTY_CATEGORIES"], queryFn: fetcher });

    return query;
};
