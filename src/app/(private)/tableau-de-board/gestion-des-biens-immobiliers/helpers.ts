import { FilterPaginationType } from "@/database/types";
import { API_INSTANCE } from "@/lib/api";

export enum PROPERTY_QUERY_KEY {
    LIST_IMMOBILIER_GESTION = "LIST_IMMOBILIER_GESTION",
}

export const fetchPropertiesCollections = async (filter: FilterPaginationType) => {
    try {
        const result = (
            await API_INSTANCE.get("/properties/collections", {
                params: filter,
            })
        ).data;
        return result || [];
    } catch (error: any) {
        throw error;
    }
};

export const createVarianteApi = (formData: FormData) => {};
