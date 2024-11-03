import { API_INSTANCE } from "@/lib/api";

type PropertyCarouselResponse = {
    id: number;
    propertyID: number;
    name: string;
    label: string;
    description: string | null;
    rentalPrice: number;
    sellingPrice: number;
    isFurnish: boolean;
    isAvailable: boolean;
    category: string;
    categoryID: number;
    photo: string;
};
export const getPropertiesForCarouselApi = async (): Promise<PropertyCarouselResponse[]> => {
    const result = await API_INSTANCE.get(`/properties/catalog`, {
        params: {
            limit: 5,
            category: "prestige",
            order: "desc",
        },
    });

    return result.data;
};

export const getPropertiesPerCategoryApi = async (category: string, limit = 25) => {
    const result = await API_INSTANCE.get(`/properties/catalog`, {
        params: {
            limit,
            category: category,
            order: "desc",
        },
    });

    return result.data;
};

export const cleanDataForCarousel = (inputs: PropertyCarouselResponse | any) => {
    return {
        id: inputs.id,
        name: inputs.name,
        cover: inputs.photo,
        photo: inputs.photo,
        category: {
            id: inputs.categoryID,
            name: inputs.category,
        },
        rentalPrice: inputs.rentalPrice,
        sellingPrice: inputs.sellingPrice,
        isFurnish: inputs.isFurnish,
        isAvailable: inputs.isAvailable,
    };
};

export const cleanPropertyWithGallery = (
    inputs: PropertyCarouselResponse & {
        gallery: any[];
    },
) => {
    return {
        id: inputs.id,
        name: inputs.name,
        cover: inputs.photo,
        gallery: inputs.gallery,
        category: {
            id: inputs.categoryID,
            name: inputs.category,
        },
        rentalPrice: inputs.rentalPrice,
        sellingPrice: inputs.sellingPrice,
        isFurnish: inputs.isFurnish,
        isAvailable: inputs.isAvailable,
    };
};
