import { getListTaxes, getTaxesCollections } from "@/database/drizzle/repositories/taxes";
import { FilterPaginationType } from "@/database/types";


export const taxesReadService = {
    collections: async (filter: FilterPaginationType) => {
        const result = await getTaxesCollections(filter);
        return result;
    },
    getList: async () => {
        const result = await getListTaxes();
        return result;
    },
}