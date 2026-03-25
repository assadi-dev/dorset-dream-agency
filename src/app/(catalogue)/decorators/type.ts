export type DecoratorCollectionData = {
    id: number;
    name: string;
    phone: string | null;
    email: string | null;
    speciality: string | null;
    photoUrl: string | null;
    experience: number | null;
    averageTime: number | null;
    createdAt: Date | null;
}
export type DecoratorCollectionApiType = {
    data: DecoratorCollectionData[];
    totalItems: number;
    page: number;
    limit: number;
}