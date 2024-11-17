import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function SkeletonCard() {
    return <Skeleton className=" rounded-xl w-full h-full" />;
}
const LoadingSkeleton = () => {
    const array = Array.from({ length: 8 }).fill("hello");
    return (
        <div className="pt-3 lg:pt-8 flex flex-col  gap-3">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] grid-rows-[repeat(auto-fill,350px)] gap-3 w-full min-h-[78vh]">
                {array.map((item, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        </div>
    );
};

export default LoadingSkeleton;
