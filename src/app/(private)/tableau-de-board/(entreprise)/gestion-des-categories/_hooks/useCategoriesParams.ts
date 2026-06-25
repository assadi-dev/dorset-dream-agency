"use client";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export const useCategoriesParams = () => {
    const [params, setParams] = useQueryStates({
       page:parseAsInteger.withDefault(1),
       limit:parseAsInteger.withDefault(15),
       search:parseAsString,
    });


    const updateParams = (newParams: Partial<typeof params>) => {
        setParams({...params,...newParams},{
            shallow:true,
        });
    };

    return { params, setParams,updateParams };
};