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
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3">
            <div></div>
            <div className="flex flex-col sm:flex-row justify-between gap-2 items-center">
                <SelectDateRange />
                <div className="w-full flex justify-end">
                    <ActionSelector />
                </div>
            </div>
        </div>
    );
};

export default RightFilterActions;
