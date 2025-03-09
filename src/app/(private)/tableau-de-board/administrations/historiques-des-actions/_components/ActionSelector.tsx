"use client";
import { MultipleSelectorProps } from "@/components/ui/MultipleSelector";
import useRouteRefresh from "@/hooks/useRouteRefresh";
import React from "react";
import { UserAction, UserActionEnum } from "../types";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

type ActionSelectorProps = MultipleSelectorProps;
const ActionSelector = ({ ...props }: ActionSelectorProps) => {
    const { updateSearchParamAndRefresh } = useRouteRefresh();

    type selectStateType = { create: boolean; update: boolean; delete: boolean; restore: boolean };
    const [open, setOpen] = React.useState(false);

    const options = Object.entries(UserActionEnum).map(([k, v]) => ({ label: v, value: k }));
    const [selected, setSelected] = React.useReducer(
        (prev: selectStateType, state: Partial<selectStateType>) => ({ ...prev, ...state }),
        {
            create: true,
            update: true,
            delete: true,
            restore: true,
        },
    );
    const handleSelect = (e: React.MouseEvent, action: UserAction) => {
        e.preventDefault();
        const checked = !selected[action];
        const current = { ...selected };
        current[action] = checked;
        setSelected(current);
    };

    const confirmFilterAction = () => {
        const actionsParams = Object.entries(selected)
            .filter(([k, v]) => v === true)
            .map((i) => i[0]);
        updateSearchParamAndRefresh("action", actionsParams.join(","));
        setOpen(false);
    };

    return (
        <div className="w-fit">
            <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" onClick={() => setOpen(true)}>
                        <Filter /> Filtres
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filtrer par action</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {options.map((item: { value: string; label: UserActionEnum }) => (
                        <DropdownMenuCheckboxItem
                            key={item.value}
                            onClick={(e: React.MouseEvent<any>) => handleSelect(e, item.value as UserAction)}
                            checked={selected[item.value as UserAction]}
                        >
                            {item.label}
                        </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />
                    <div>
                        <Button className="w-full shadow-lg" size={"sm"} onClick={confirmFilterAction}>
                            Valider
                        </Button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ActionSelector;
