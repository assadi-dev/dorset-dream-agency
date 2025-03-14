import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContentProps, TooltipTriggerProps } from "@radix-ui/react-tooltip";
import React from "react";

type WithTooltipProps = {
    tooltipContent?: TooltipContentProps;
    tooltipTrigger?: TooltipTriggerProps;
    tooltipContentChildren: React.ReactNode;
};
const withTooltip = (Component: any, props: WithTooltipProps) => {
    const NewComponent = (p: any, ref: any) => {
        return <Component {...p} />;
    };

    const tooltipTriggerProps = props.tooltipTrigger;
    const tooltipContentProps = props.tooltipContent;

    return (
        <Tooltip>
            <TooltipTrigger {...tooltipTriggerProps} asChild>
                <div>
                    <NewComponent />
                </div>
            </TooltipTrigger>
            <TooltipContent {...tooltipContentProps}>{props.tooltipContentChildren}</TooltipContent>
        </Tooltip>
    );
};

export default withTooltip;
