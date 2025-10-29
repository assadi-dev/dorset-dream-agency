import { GenderType } from "@/app/types";
import { avatarByGender } from "./utils";
import { StaticImageData } from "next/image";

export const safeLoadFile = ({ path }: { path?: string }): string => {
    try {
        if (!path) return "";
        return process.env.NEXT_PUBLIC_API_URL + path;
    } catch (error) {
        return "";
    }
};

export const safeLoadAvatar = ({
    path,
    gender,
}: {
    path?: string | null;
    gender: GenderType;
}): string | StaticImageData => {
    try {
        if (!path) return avatarByGender(gender);
        return process.env.NEXT_PUBLIC_API_URL + path;
    } catch (error) {
        return avatarByGender(gender);
    }
};
export const isHttpUrl = (url: string): boolean => /^http?:\/\//.test(url);
export const isBlobUrl = (url: string): boolean => /^blob?:\/\//.test(url);

export const LoadPreviewFile = (path: string): string => {
    try {
        if (path.startsWith("blob")) return path;

        if (path.startsWith("/")) return safeLoadFile({ path: path });
    } catch (error) {
        return "";
    }
    return "";
};
