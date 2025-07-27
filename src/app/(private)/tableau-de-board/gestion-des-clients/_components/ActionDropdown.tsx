import React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useClientItemAction from "../hooks/useClientItemAction";

type ActionDropdownProps = { selected: number[]; totalCount: number; toggleModCard: () => void };
const ActionDropdown = ({ selected, toggleModCard }: ActionDropdownProps) => {
    const { ListActionItems } = useClientItemAction({ selected, toggleModCard });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" type="button" size="sm" className="w-full min-w-[120px] xl:w-fit">
                    Actions
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72" align="center">
                <DropdownMenuGroup className="w-full">
                    {ListActionItems.map((item) => (
                        <DropdownMenuItem key={item.title} onClick={item.handler}>
                            <div className="w-full">
                                <p className="flex gap-2 items-center">
                                    {<item.icon className="w-4" />} {item.title}
                                </p>
                                <div className="p-1 rounded  w-full">
                                    {" "}
                                    <small className="text-slate-500">{item.tooltipMessage}</small>
                                </div>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionDropdown;
