import { API_INSTANCE } from "@/lib/api";
import { CategoryPropertyInputsType } from "./type";

export const fetchCategoriesCollections = async ({page,limit,search}: {page: number,limit: number,search?: string|null}) => {
   try {
     const response = await API_INSTANCE.get("/categories/paginate",{
        params: {
            page,
            limit,
            search,
        },
     });
    return response.data;
   } catch (error) {
    throw error;
   }
};

export const createCategoryApi = async (data: CategoryPropertyInputsType) => {
    try {
        const response = await API_INSTANCE.post("/category", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCategoryApi = async (id: number, data: CategoryPropertyInputsType) => {
    try {
        const response = await API_INSTANCE.put(`/category/update/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCategoryApi = async (ids: number[]) => {
    try {
        const response = await API_INSTANCE.delete(`/category`, {data: {ids}});
        return response.data;
    } catch (error) {
        throw error;
    }
};