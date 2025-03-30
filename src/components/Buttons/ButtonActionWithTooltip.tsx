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
    srOnly?: string;
} & ButtonProps;
const ButtonActionWithTooltip = ({
    label,
    tooltipTitle,
    icon,
    side,
    classNames,
    srOnly,
    ...props
}: ButtonActionWithTooltipProps) => {
    const TooltipText = () => {
        return <p className={cn("text-sm text-black", classNames?.tooltipTextContent)}>{tooltipTitle}</p>;
    };
    const Component = React.forwardRef((p: any, ref: React.LegacyRef<HTMLButtonElement>) => {
        const mergeProps = { ...props };
        delete mergeProps.onPointerDown;
        delete mergeProps.onPointerLeave;
        delete mergeProps.onPointerMove;
        return (
            <div>
                <Button ref={ref} {...mergeProps} className={cn("flex items-center gap-2", props.className)}>
                    {srOnly && <span className="sr-only">{srOnly}</span>}
                    {icon ? icon : null} {label}
                </Button>
            </div>
        );
    });

    return withTooltip(Component, {
        tooltipContent: {
            className: cn("bg-white text-secondary ring-1 ring-slate-200 shadow-lg", classNames?.tooltipContent),
            side: side || "bottom",
        },
        tooltipContentChildren: <TooltipText />,
    });
};

export default ButtonActionWithTooltip;
