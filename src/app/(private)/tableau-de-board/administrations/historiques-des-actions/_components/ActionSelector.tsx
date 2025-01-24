"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useRouteRefresh from "@/hooks/useRouteRefresh";
import React from "react";

export enum ActionSelectEnum {
    create = "Création",
    update = "Modification",
    delete = "Suppression",
}

const ActionSelector = () => {
    const { updateSearchParamAndRefresh } = useRouteRefresh();
    const handleSelect = (value: string) => {
        updateSearchParamAndRefresh("action", value);
    };

    return (
        <Select defaultValue="all" onValueChange={handleSelect}>
            <SelectTrigger className="lg:w-[220px]">
                <SelectValue placeholder="Sélectionné une action" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Voir tout</SelectItem>
                {Object.entries(ActionSelectEnum).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                        {v}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default ActionSelector;
