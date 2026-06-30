
export const taxesWriteService = {
    create: async (body: unknown) => {
        const validate = taxesValidator.create(body);
        if (!validate.success) {
            return validate.error
        }
        const result = await insertTaxe(validate.data);
        return result;
    },
    update: async (id: number, body: unknown) => {
        const validate = taxesValidator.update(body);
        if (!validate.success) {
            return validate.error
        }
        const result = await updateTaxe(id, validate.data);
        return result;
    },
    delete: async (body: unknown) => {
        const validate = taxesValidator.deleteMany(body);
        if (!validate.success) {
            return validate.error
        }
        const { ids } = validate.data;
        const result = await deleteManyTaxe(ids);
        return result;
    },
}