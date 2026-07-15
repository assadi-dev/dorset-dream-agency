"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERIES } from "@/config/queries/categories";
import { CategoryPropertyInputsType, ReorderCategoryType } from "../type";
import { createCategoryApi, deleteCategoryApi, reorderCategoryApi, toggleVisibilityCategoryApi, updateCategoryApi } from "../apiServices";


export const useCategoriesMutation = () => {
    const queryClient = useQueryClient();
    

    const createMutation = useMutation({
        mutationFn: async (data: CategoryPropertyInputsType) => {
            return await createCategoryApi(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERIES.GET_CATEGORIES_COLLECTIONS] });
        },

    });

    const updateMutation = useMutation({
        mutationFn: async ({id,body}: {id:number,body:CategoryPropertyInputsType}) => {
            return await updateCategoryApi(id,body);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERIES.GET_CATEGORIES_COLLECTIONS] });
        },

    });


    const deleteMutation = useMutation({
        mutationFn: async (ids:number[]) => {
            return await deleteCategoryApi(ids);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERIES.GET_CATEGORIES_COLLECTIONS] });
        },

    });

    const toggleVisibilityMutation = useMutation({
        mutationFn: async ({ids,isVisible}: {ids: number[], isVisible: boolean}) => {
            return await toggleVisibilityCategoryApi(ids,isVisible);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERIES.GET_CATEGORIES_COLLECTIONS] });
        },

    });

    const reorderMutation = useMutation({
        mutationFn: async (data: ReorderCategoryType) => {
            return await reorderCategoryApi(data);
        },

     
    });

    return {
        create:createMutation.mutateAsync,
        update:updateMutation.mutateAsync,
        remove:deleteMutation.mutateAsync,
        toggleVisibility:toggleVisibilityMutation.mutateAsync,
        reorder:reorderMutation.mutateAsync
    };
};