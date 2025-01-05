import { ENV } from "@/config/global";
import { API_INSTANCE } from "@/lib/api";

export const loadAnnounceSaves = async (path: string) => {
    try {
        const url = `${ENV.DOMAIN}/api/${path}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
            throw data;
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const fetchOneAnnounce = async (id: number, signal?: AbortSignal) => {
    const response = await API_INSTANCE.get(`/announce/${id}`);
    const data = await response.data;
    return data;
};
