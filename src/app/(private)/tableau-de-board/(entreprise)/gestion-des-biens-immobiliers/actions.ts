import { removePropertyWithFiles } from "@/database/drizzle/repositories/properties";

export const removePropertiesAction = async (formData: FormData) => {
    if (formData.getAll("ids")) {
        const propertiesIds = formData.getAll("ids").map((id) => Number(id));
        await removePropertyWithFiles(propertiesIds);
    }
};
