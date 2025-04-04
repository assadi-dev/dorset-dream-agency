export type PropertiesColumn = {
    name: string;
    rentalPrice: number;
    sellingPrice: number;
    isAvailable: boolean;
    isFurnished: boolean;
};

export type GalleryResponse = {
    id: number;
    originalName: string;
    size: number;
    type: string;
    url: string;
    order: number;
    isCover: boolean;
};

export type FileObj = {
    id: number | string;
    name: string;
    size: number;
    type: string;
    url?: string | null;
    file: File;
    order: number;
    isCover: boolean;
};
