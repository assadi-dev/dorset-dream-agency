import { Trash } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import withTooltip from "@/HOC/withTooltip";
import { cn } from "@/lib/utils";

type ButtonActionWithTooltipProps = {
    label?: string;
    tooltipTitle: string;
    icon?: any;
    side?: "top" | "right" | "bottom" | "left";
    classNames?: {
        tooltipContent?: string;
        tooltipTextContent?: string;
    };
} & ButtonProps;
const ButtonActionWithTooltip = ({
    label,
    tooltipTitle,
    icon,
    side,
    classNames,
    ...props
}: ButtonActionWithTooltipProps) => {
    const TooltipText = () => {
        return <p className={cn("text-sm text-black", classNames?.tooltipTextContent)}>{tooltipTitle}</p>;
    };
    const Component = () => {
        return (
            <Button {...props} className={cn(props.className)}>
                {icon ? <Trash /> : null} {label}
            </Button>
        );
    };

    return withTooltip(Component, {
        tooltipContent: {
            className: cn("bg-white text-secondary ring-1 ring-slate-200 shadow-lg", classNames?.tooltipContent),
            side: side || "bottom",
        },
        tooltipContentChildren: <TooltipText />,
    });
};

export default ButtonActionWithTooltip;
