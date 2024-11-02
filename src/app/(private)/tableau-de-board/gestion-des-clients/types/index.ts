import { GenderType } from "@/app/types";

export type ClientColumnType = {
    id: number;
    name: string;
    phone: string;
    createdAt: string;
};

export type ClientType = {
    id: number;
    fullName?: string;
    firstName: string;
    lastName: string;
    phone: string;
    gender: GenderType;
    slug?: string;
    createdAt: string;
    updatedAt?: string;
};
