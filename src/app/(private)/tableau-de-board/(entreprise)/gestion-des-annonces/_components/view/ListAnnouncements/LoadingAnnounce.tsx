import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingAnnounce = () => {
    const arrayFill = Array.from({ length: 10 });
    return (
        <>
            <div className="flex justify-between mb-8">
                <Skeleton className="w-[35vh] h-[3rem] rounded-full" />
                <Skeleton className="w-[65vh] h-[3rem] rounded-full" />
            </div>
            <div className="grid grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-3 justify-center w-full">
                {arrayFill.map((_, i) => (
                    <Skeleton key={i} className="w-full h-[195px] rounded" />
                ))}
            </div>
        </>
    );
};

export default LoadingAnnounce;
