import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LucideMoreVertical, MoreHorizontal, MoreHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";

type DropdownActionsProps = {
    children?: React.ReactNode;
};
const DropdownActions = ({ children }: DropdownActionsProps) => {
    return (
        <div className="flex justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <LucideMoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">{children}</DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DropdownActions;
