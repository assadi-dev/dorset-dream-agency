import { API_INSTANCE } from "@/lib/api";

export const fetchPropertiesCollections = async () => {
    try {
        const result = (await API_INSTANCE.get("/properties/variants/collections")).data;
        return result || [];
    } catch (error) {
        throw error;
    }
};
