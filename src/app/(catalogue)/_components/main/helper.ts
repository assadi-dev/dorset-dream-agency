import { API_INSTANCE } from "@/lib/api";

export const getPropertiesPerCategoryApi = async (category: string) => {
    const result = await API_INSTANCE.get(`/properties/presentations`, {
        params: {
            limit: 10,
            category: category,
            order: "desc",
        },
    });

    return result.data;
};
