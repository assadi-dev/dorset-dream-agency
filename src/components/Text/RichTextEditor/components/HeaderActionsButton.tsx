import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonProps, LucidIconProps } from "@/types/global";
import React from "react";

type HeaderActionsButtonProps = {
    icon: LucidIconProps;
    handler: () => void;
    isSelected: boolean;
    label?: string;
} & ButtonProps;
const HeaderActionsButton = ({ icon, handler, isSelected, ...props }: HeaderActionsButtonProps) => {
    const IconAction = icon;
    const defaultClassName = "hover:bg-primary hover:text-primary-foreground transition-all";
    return (
        <>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handler}
                className={cn({ "bg-primary text-primary-foreground": isSelected }, defaultClassName, props.className)}
                {...props}
            >
                <IconAction className="h-4 w-4" />
            </Button>
        </>
    );
};

export default HeaderActionsButton;

export const HeaderActionSeparator = () => {
    return <div className="h-6 w-px bg-border mx-1" />;
};
