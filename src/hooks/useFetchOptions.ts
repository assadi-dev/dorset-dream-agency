import { API_INSTANCE } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useCategoryPropertiesOptions = () => {
    const fetcher = React.useCallback(async () => {
        try {
            const { data } = await API_INSTANCE.get("/enumCategoryProperty");
            return data;
        } catch (error) {
            throw error;
        }
    }, []);

    const query = useQuery({ queryKey: ["ENUM_PROPERTY_CATEGORIES"], queryFn: fetcher });

    return query;
};
