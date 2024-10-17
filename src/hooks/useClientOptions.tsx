import { useQuery } from "@tanstack/react-query";
import React from "react";

const useClientOptions = () => {
    const fetchClient = () => {
        return fetch("/api/clients/options");
    };

    const query = useQuery({ queryKey: ["clients-options"], queryFn: fetchClient });

    return query;
};

export default useClientOptions;
