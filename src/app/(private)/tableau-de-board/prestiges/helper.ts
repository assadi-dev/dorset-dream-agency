import { API_INSTANCE } from "@/lib/api";

export const fetch_prestige = async () => {
    try {
        const res = await API_INSTANCE.get(`/properties/prestiges`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const setAvailableProperty = async (id: number, checked: boolean) => {
    const res = await API_INSTANCE.put(`/property/available/${id}`, {
        isAvailable: checked,
    });
    return res.data;
};
