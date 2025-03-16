import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const GalleryLoader = () => {
    const array = Array.from({ length: 6 });
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 w-full">
            {array.map((item: any, index) => (
                <Skeleton key={index} className="w-full h-[150px] 2xl:h-[200px] bg-slate-100 rounded-lg" />
            ))}
        </div>
    );
};

export default GalleryLoader;
