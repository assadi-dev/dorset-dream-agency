import { API_INSTANCE } from "@/lib/api";
export const CANVAS_VALUES = {
    height: 420,
    width: 640,
    backgroundColor: "#ffffff",
    stroke: 0,
};

export const fetchBackgroundImages = async () => {
    const result = await API_INSTANCE.get("/announcement/background");
    return result.data;
};

export enum ANNOUNCEMENT_QUERY_KEY {
    BACKGROUND_IMAGES = "BACKGROUND_IMAGES",
}
