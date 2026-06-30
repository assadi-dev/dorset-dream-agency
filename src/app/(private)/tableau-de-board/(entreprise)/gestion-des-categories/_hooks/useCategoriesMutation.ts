"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERIES } from "@/config/queries/categories";

export const useCategoriesMutation = () => {

    const queryClient = useQueryClient();




    const create = async()=>{

            const mutation = useMutation({
        mutationFn: async (data: CategoryPropertyInputsType) => {
            return await createCategory(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERIES.GET_CATEGORIES_COLLECTIONS] });
        },
    });
        queryClient.invalidateQueries({queryKey: [CATEGORIES_QUERIES.GET_CATEGORIES_COLLECTIONS]});
    }
    const update = async()=>{
        queryClient.invalidateQueries({queryKey: [CATEGORIES_QUERIES.GET_CATEGORIES_COLLECTIONS]});
    }
    const remove = async()=>{
        queryClient.invalidateQueries({queryKey: [CATEGORIES_QUERIES.GET_CATEGORIES_COLLECTIONS]});
    }

    return {};
};