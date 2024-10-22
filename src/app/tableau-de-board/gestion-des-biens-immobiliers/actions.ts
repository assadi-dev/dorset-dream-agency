import { deleteVariant } from "@/database/drizzle/repositories/variants";

const removeVariantProperty = async (ids: Array<number>) => {
    await deleteVariant(ids);
};
