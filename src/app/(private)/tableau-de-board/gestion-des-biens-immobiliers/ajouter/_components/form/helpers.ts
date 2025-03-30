import { API_INSTANCE } from "@/lib/api";
import { FileObj } from "../../../types";
import { UseFormReturn } from "react-hook-form";
import { ToastSuccessSonner } from "@/components/notify/Sonner";
import { UploadZoneForm } from "../views/EditUploadZoneVariant";

type variant = {
    id: number | string;
    name: string;
    files: [];
};

export const removeVariants = (variants: Array<variant>, ids: Array<string | number>) => {
    return [...variants].filter((v) => !ids.includes(v.id));
};

export const createVariantGalleryApi = async (formData: FormData) => {
    return API_INSTANCE.post("/variants/gallery", formData);
};

export const updatePropertyApi = async (id: number | string, data: any) => {
    const res = await API_INSTANCE.put(`/property/${id}`, data);
    return res.data;
};

export const updateVariantGalleryApi = async (formData: FormData) => {
    return API_INSTANCE.post("/variants/gallery/update", formData);
};
export const updateGalleryApi = async (data: {
    variantID: number;
    photoID: number;
    isCover?: boolean;
    order?: number;
}) => {
    return API_INSTANCE.put("/gallery", data);
};

export const removeVariantWithGalleryApi = (ids: number[]) => {
    return API_INSTANCE.delete("/variants/gallery");
};

export const STOCKAGE_VALUE = {
    no: 0,
    other: -1,
    yes: 1,
};

export const STOCKAGE_RADIO_LIST = [
    {
        label: "Pas de coffre ",
        value: STOCKAGE_VALUE.no,
    },
    {
        label: "Sur demande",
        value: STOCKAGE_VALUE.other,
    },
    {
        label: "Avec coffre",
        value: STOCKAGE_VALUE.yes,
    },
];

export const updateCover = (form: UseFormReturn<UploadZoneForm>, file: FileObj) => {
    const allFiles = form.getValues("files");
    const current = allFiles.find((it) => it.id == file.id);
    if (!current) return;
    const updateFiles = allFiles.map((it) => {
        if (it.id == file.id) {
            return { ...it, isCover: file.isCover };
        } else it.isCover = false;
        return it;
    }) as FileObj[];
    form.setValue("files", updateFiles);
    const variantID = form.getValues("id");
    if (typeof variantID == "number" && typeof file.id == "number") {
        try {
            updateGalleryApi({
                variantID,
                photoID: file.id,
                isCover: file.isCover,
            }).then(() => ToastSuccessSonner("Vous avez définis une image de couverture"));
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
        }
    }
};
