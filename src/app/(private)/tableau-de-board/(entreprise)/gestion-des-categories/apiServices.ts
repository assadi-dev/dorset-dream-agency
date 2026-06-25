import { API_INSTANCE } from "@/lib/api";

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