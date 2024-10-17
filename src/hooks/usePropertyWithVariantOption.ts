import { API_INSTANCE } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const usePropertyWithVariant = () => {
    const fetchPropertyOptions = async () => {
        return API_INSTANCE.get("/api/property/variants/options");
    };

    const query = useQuery({
        queryKey: ["properties_options"],
        queryFn: fetchPropertyOptions,
    });
    return query;
};

export default usePropertyWithVariant;
