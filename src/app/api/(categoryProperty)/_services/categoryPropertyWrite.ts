import { deleteManyCategory, insertCategory, updateCategory } from "@/database/drizzle/repositories/categories";
import { categoriesValidator } from "@/database/drizzle/repositories/dto/categoriesDTO";


export const categoryPropertyWriteService = {
    create: async (body: unknown) => {
        const validate = categoriesValidator.create(body);
        if (!validate.success) {
            return validate.error
        }
        const result = await insertCategory(validate.data);
        return result;
    },

    update: async (id: number, body: unknown) => {
        const validate = categoriesValidator.update(body);
        if (!validate.success) {
            return validate.error
        }
        const result = await updateCategory(id, validate.data);
        return result;
    },

    delete: async (body: unknown) => {
        const validate = categoriesValidator.deleteMany(body);
        if (!validate.success) {
            return validate.error
        }
        const { ids } = validate.data;
        const result = await deleteManyCategory(ids);
        return result;
    },
}