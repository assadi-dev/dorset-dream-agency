import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import withTooltip from "@/HOC/withTooltip";
import { cn } from "@/lib/utils";

type TextWithTooltipWithTooltipProps = {
    children?: React.ReactNode;
    tooltipTitle: string;
    icon?: any;
    side?: "top" | "right" | "bottom" | "left";
    classNames?: {
        tooltipContent?: string;
        tooltipTextContent?: string;
    };
} & ButtonProps;
const TextWithTooltip = ({
    children,
    tooltipTitle,
    icon,
    side,
    classNames,
    ...props
}: TextWithTooltipWithTooltipProps) => {
    const TooltipText = () => {
        return <p className={cn("text-sm text-black", classNames?.tooltipTextContent)}>{tooltipTitle}</p>;
    };
    const Component = () => {
        return <>{children}</>;
    };

    return withTooltip(Component, {
        tooltipContent: {
            className: cn("bg-white text-secondary ring-1 ring-slate-200 shadow-lg", classNames?.tooltipContent),
            side: side || "bottom",
        },
        tooltipContentChildren: <TooltipText />,
    });
};

export default TextWithTooltip;
