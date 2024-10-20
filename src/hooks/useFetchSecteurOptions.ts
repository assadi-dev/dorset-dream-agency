import { API_INSTANCE } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useFetchSecteursOptions = () => {
    const fetcher = React.useCallback(async () => {
        try {
            const { data } = await API_INSTANCE.get("/secteurs/options");
            return data;
        } catch (error: any) {
            throw error;
        }
    }, []);

    const query = useQuery({
        queryKey: ["ENUM_SECTEUR_OPTIONS"],
        queryFn: fetcher,
    });

    return query;
};

export default useFetchSecteursOptions;
