import { API_INSTANCE } from "@/lib/api";

export const fetch_prestige = async () => {
    try {
        const res = await API_INSTANCE.get(`/properties/prestiges`);
        return res.data;
    } catch (error) {
        throw error;
    }
};
