"use client";
import React from "react";
import ActionSelector from "./ActionSelector";
import SimplePagination from "@/components/Paginations/SimplePagination";
import { useSearchParams } from "next/navigation";
import SelectDateRange from "./SelectDateRange";

type RightActionsProps = {
    totalItem: number;
};
const RightFilterActions = ({ totalItem }: RightActionsProps) => {
    const searchParams = useSearchParams();
    const limit = Number(searchParams.get("limit")) || 5;
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex gap-3 items-center">
                <ActionSelector />
                <SelectDateRange />
            </div>
            <SimplePagination totalItems={totalItem} limit={limit} />
        </div>
    );
};

export default RightFilterActions;
