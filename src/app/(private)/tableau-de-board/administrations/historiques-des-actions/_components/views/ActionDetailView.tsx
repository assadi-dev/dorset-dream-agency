import useModalState from "@/hooks/useModalState";
import React from "react";
import { ActionDescription, Description } from "../../types";
import { Separator } from "@radix-ui/react-separator";
import { cn, showRole } from "@/lib/utils";
import { datetimeFormatFr } from "@/lib/date";

const ActionDetailView = () => {
    const { payload } = useModalState();
    const actionData = payload as ActionDescription;
    const description = JSON.parse(payload.description) as Description;
    const bgColor = () => {
        switch (actionData.action) {
            case "create":
                return "bg-green-200 text-green-900";
            case "update":
                return "bg-blue-100 text-blue-900";
            case "delete":
                return "bg-red-200 text-red-900";
            case "restore":
                return "bg-orange-200";
            default:
                return "bg-slate-200";
        }
    };
    return (
        <div className="w-[45vw] ">
            <div className="mb-4">
                {" "}
                <h2 className="text-lg font-semibold">{description.user}</h2>
                <p>
                    {description.grade} - {showRole(description.role)}
                </p>
            </div>

            <div className={cn(bgColor(), `font-semibold rounded shadow-lg p-8 flex items-center w-full mb-4`)}>
                <p className="text-xs lg:text-sm 2xl:text-lg drop-shadow-xl">{description.description}</p>
            </div>
            <div>
                <p className="text-slate-600">Fait le {datetimeFormatFr(actionData.timestamp)} </p>
            </div>
        </div>
    );
};

export default ActionDetailView;
