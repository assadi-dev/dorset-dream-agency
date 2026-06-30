"use client"

import { TaxeInputsType } from "@/database/drizzle/repositories/dto/taxesDTO";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaxeApi, deleteTaxeApi, updateTaxeApi } from "../apiService";
import { TAXES_QUERIES } from "@/config/queries/taxes";

export const useTaxesMutation = () => {
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: async (data: TaxeInputsType) => {
           return  await createTaxeApi(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TAXES_QUERIES.GET_TAXES_COLLECTIONS] });
        },
    });


    const updateMutation = useMutation({
        mutationFn: async (data:{id:number, data:TaxeInputsType}) => {
           return  await updateTaxeApi(data.id,data.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TAXES_QUERIES.GET_TAXES_COLLECTIONS] });
        },
    });


    const deleteMutation = useMutation({
        mutationFn: async (ids:number[]) => {
           return  await deleteTaxeApi(ids);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TAXES_QUERIES.GET_TAXES_COLLECTIONS] });
        },
    });



    return  {
        create:createMutation.mutateAsync,
        update:updateMutation.mutateAsync,
        remove:deleteMutation.mutateAsync,
    };
}