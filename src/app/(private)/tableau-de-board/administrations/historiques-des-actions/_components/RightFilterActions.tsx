"use client";
import React from "react";
import ActionSelector from "./ActionSelector";
import { useSearchParams } from "next/navigation";
import SelectDateRange from "./SelectDateRange";

type RightActionsProps = {
    totalItem: number;
};
const RightFilterActions = ({ totalItem }: RightActionsProps) => {
    return (
        <div className="flex justify-between items-center w-full ">
            <div></div>
            <div className="flex gap-3 items-center">
                <SelectDateRange />
                <ActionSelector />
            </div>
        </div>
    );
};

export default RightFilterActions;
