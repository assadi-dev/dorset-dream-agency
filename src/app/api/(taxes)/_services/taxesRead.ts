

export const taxesReadService = {
    collections: async () => {
        const result = await getAllTaxes();
        return result;
    },
    getList: async () => {
        const result = await getListTaxes();
        return result;
    },
}