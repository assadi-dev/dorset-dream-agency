import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContentProps, TooltipTriggerProps } from "@radix-ui/react-tooltip";
import React from "react";

type WithTooltipProps = {
    tooltipContent?: TooltipContentProps;
    tooltipTrigger?: TooltipTriggerProps;
    tooltipContentChildren: React.ReactNode;
};
const withTooltip = (Component: React.ComponentType<any>, props: WithTooltipProps) => {
    const NewComponent = (props: any) => {
        return <Component {...props} />;
    };

    const tooltipTriggerProps = props.tooltipTrigger;
    const tooltipContentProps = props.tooltipContent;

    return (
        <Tooltip>
            <TooltipTrigger {...tooltipTriggerProps}>
                <NewComponent />
            </TooltipTrigger>
            <TooltipContent {...tooltipContentProps}>{props.tooltipContentChildren}</TooltipContent>
        </Tooltip>
    );
};

export default withTooltip;
