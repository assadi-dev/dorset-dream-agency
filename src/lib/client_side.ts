"use client";

export const safeLoadFile = ({ path }: { path?: string }): string => {
    try {
        if (!path) return "";
        return process.env.NEXT_PUBLIC_API_URL + path;
    } catch (error) {
        return "";
    }
};
