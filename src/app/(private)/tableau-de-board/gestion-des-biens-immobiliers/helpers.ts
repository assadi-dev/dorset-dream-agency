import { API_INSTANCE } from "@/lib/api";

export enum PROPERTY_QUERY_KEY {
    LIST_IMMOBILIER_GESTION = "LIST_IMMOBILIER_GESTION",
}

export const fetchPropertiesCollections = async () => {
    try {
        const result = (await API_INSTANCE.get("/properties/collections")).data;
        return result || [];
    } catch (error: any) {
        throw error;
    }
};

export const createVarianteApi = (formData: FormData) => {};
