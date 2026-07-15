"use client";

import { CATEGORIES_QUERIES } from "@/config/queries/categories";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesCollections } from "../apiServices";
import { useCategoriesParams } from "./useCategoriesParams";

export const useGetCollections = () => {
    const {params} = useCategoriesParams();
    const { data, isLoading, error } = useQuery({
        queryKey: [CATEGORIES_QUERIES.GET_CATEGORIES_COLLECTIONS,params],
        queryFn:()=> fetchCategoriesCollections(params),
    });
    return { collections:data?.data ?? [], isLoading, error,limit: data?.limit ?? params.limit ,totalItems:data?.totalItems };
};