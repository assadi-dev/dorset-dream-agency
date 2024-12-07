import { Skeleton } from "@/components/ui/skeleton";

import React from "react";

const LoaderBackground = () => {
    const array = Array.from({ length: 6 });

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))]  gap-1 p-1 w-full">
            {array.map((_, i) => (
                <Skeleton key={i} className="w-full h-[80px] rounded" />
            ))}
        </div>
    );
};

export default LoaderBackground;
