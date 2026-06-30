"use client";

import { TAXES_QUERIES } from "@/config/queries/taxes";
import { API_INSTANCE } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useTaxesOptions = () => {
    const fetchTaxesOptions = async () => {
        const res = await API_INSTANCE.get("/taxes/list");
        return res.data;
    };

    const query = useQuery({
        queryKey: [TAXES_QUERIES.GET_TAXE_LIST],
        queryFn: fetchTaxesOptions,
    });
    return query;
};

export default useTaxesOptions;