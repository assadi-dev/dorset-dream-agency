"use client";
import { useCategoryPropertiesOptions } from "@/hooks/useFetchOptions";
import React, { useMemo } from "react";

export const useLoadCategories = () => {
    const { data} = useCategoryPropertiesOptions();

    const CATEGORIES_OPTIONS =  useMemo(() => {
        if(!data) return [];
        return data?.map((category) => ({   
            id: category.id,
            label: category.label,
            value: category.value,
        }));
    }, [data]);

    return { CATEGORIES_OPTIONS };
};