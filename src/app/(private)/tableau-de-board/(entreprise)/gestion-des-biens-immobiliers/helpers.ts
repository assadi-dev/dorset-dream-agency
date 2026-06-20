import { TiptapContent } from "@/components/Text/RichTextEditor/type";
import { FilterPaginationType } from "@/database/types";
import { API_INSTANCE } from "@/lib/api";

export const fetchPropertiesCollections = async (filter: FilterPaginationType) => {
    try {
        const result = (
            await API_INSTANCE.get("/properties/collections", {
                params: filter,
            })
        ).data;
        return result || [];
    } catch (error: any) {
        throw error;
    }
};

export const createVarianteApi = (formData: FormData) => {};
export const duplicateVarianteApi = async (entries: { id: number; name: string }) => {
    try {
        const result = await API_INSTANCE.post("/property/duplicate", entries);
        return result.data;
    } catch (error: any) {
        throw error;
    }
};

export const parseInitialDescription = (initialDescription: string) => {
    try {
        return JSON.parse(initialDescription ?? "") as TiptapContent;
    } catch (error) {
        return {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    attrs: { textAlign: null },
                    content: [{ type: "text", marks: [], text: initialDescription }],
                },
            ],
            attrs: undefined,
        } satisfies TiptapContent;
    }
};
