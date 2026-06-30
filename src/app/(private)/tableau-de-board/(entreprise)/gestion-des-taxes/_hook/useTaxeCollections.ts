"use client"

import { useQuery } from "@tanstack/react-query";
import { getTaxesCollectionsApi } from "../apiService";
import { TAXES_QUERIES } from "@/config/queries/taxes";
import { useTaxesParams } from "./usetaxesFilter";

 const useTaxeCollections = () => {
    const {params} = useTaxesParams();

    const {data,isLoading,isError} = useQuery({
        queryKey: [TAXES_QUERIES.GET_TAXES_COLLECTIONS,...Object.values(params)],
        queryFn: () =>  getTaxesCollectionsApi(params),
        
        
       
    });




    return  {
       collections:data ?? [],
       isLoading,
       isError,
       limit:params.limit,
       page:params.page,
       search:params.search,
       totalItems:data?.totalItems ?? 0,

    };
}

export default useTaxeCollections;