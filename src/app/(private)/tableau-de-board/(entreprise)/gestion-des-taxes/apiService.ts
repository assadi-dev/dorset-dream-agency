import { TaxeInputsType } from "@/database/drizzle/repositories/dto/taxesDTO";
import { FilterPaginationType } from "@/database/types";
import { API_INSTANCE } from "@/lib/api";


export const getTaxesCollectionsApi = async ({page,limit,search}:FilterPaginationType) => {
    try {
        const response = await API_INSTANCE.get("/taxes", {
            params: { page, limit, search },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const createTaxeApi = async (data: TaxeInputsType) => {
try {
        const response = await API_INSTANCE.post("/taxes", data);
        return response.data;
    
} catch (error) {
    throw error;
}
}


export const updateTaxeApi = async (id: number, data: TaxeInputsType) => {
    try {
        const response = await API_INSTANCE.put(`/taxes/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteTaxeApi = async (ids: number[]) => {
    try {
        const response = await API_INSTANCE.delete("/taxes", {
            data: { ids },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
