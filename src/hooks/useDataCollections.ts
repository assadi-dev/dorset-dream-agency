import React from "react";

const useDataCollections = (data: any) => {
    const COLLECTIONS = React.useMemo<{
        data: any[];
        totalItems: number;
    }>(() => {
        if (!data) return { data: [], totalItems: 0 };
        return {
            data: data.data,
            totalItems: data.totalItems,
        };
    }, [data]);

    return {
        data: COLLECTIONS.data,
        totalItems: COLLECTIONS.totalItems,
    };
};

export default useDataCollections;
