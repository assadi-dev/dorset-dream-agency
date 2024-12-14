import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingTabs = () => {
    return (
        <div className="w-[50vw] mx-auto flex flex-col gap-3 h-[70vh]">
            <div className="w-full bg-white shadow border h-14 rounded p-2 grid grid-cols-2 gap-3">
                <Skeleton className="h-full" />
                <Skeleton className="h-full" />
            </div>
            <div className="w-full bg-white shadow border h-full rounded p-3 pt-14 flex flex-col gap-5 justify-between">
                <div className="flex flex-col gap-5 h-full items-center">
                    <Skeleton className="h-[3rem] w-[90%] mx-auto border mb-3" />
                    <Skeleton className="h-[3rem] w-[90%] mx-auto border mb-3" />
                    <Skeleton className="h-[3rem] w-[90%] mx-auto border mb-3" />
                </div>
                <Skeleton className="h-[3rem] w-[90%] mx-auto border mb-3" />
            </div>
        </div>
    );
};

export default LoadingTabs;
