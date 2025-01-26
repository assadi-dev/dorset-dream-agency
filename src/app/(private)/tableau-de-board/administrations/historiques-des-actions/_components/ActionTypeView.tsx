import React from "react";
import { UserAction, UserActionEnum } from "../types";

type ActionTypeColumnViewProps = {
    action: UserAction;
};
const ActionTypeColumnView = ({ action }: ActionTypeColumnViewProps) => {
    if (action === "create") {
        return (
            <p className="text-xs py-1 px-2 ring-1 ring-green-700 font-semibold w-[100px] text-center rounded-lg bg-green-100 text-green-800">
                {UserActionEnum["create"]}
            </p>
        );
    }
    if (action === "update") {
        return (
            <p className="text-xs py-1 px-2 ring-1 font-semibold w-[100px] text-center rounded-lg bg-cyan-100 text-cyan-700 ">
                {UserActionEnum["update"]}
            </p>
        );
    }
    if (action === "delete") {
        return (
            <p className="text-xs py-1 px-2 ring-1 ring-red-700 font-semibold w-[100px] text-center rounded-lg bg-red-100 text-red-700">
                {UserActionEnum["delete"]}
            </p>
        );
    }
};

export default ActionTypeColumnView;
