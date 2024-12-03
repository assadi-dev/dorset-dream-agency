import { API_INSTANCE } from "@/lib/api";
import { wait } from "@/lib/utils";

export const fetch_prestige = async (filter: any) => {
    try {
        const res = await API_INSTANCE.get(`/properties/prestiges`, {
            params: { ...filter },
        });
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
