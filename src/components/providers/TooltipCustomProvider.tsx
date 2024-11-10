import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TooltipCustomProviderProps = {
    RenderComponent?: React.FC<any> | null;
    message?: string;
    hoverMessage?: string | null;
};
const TooltipCustomProvider = ({ message, hoverMessage, RenderComponent }: TooltipCustomProviderProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                {RenderComponent && (
                    <TooltipTrigger>
                        <RenderComponent />
                    </TooltipTrigger>
                )}
                {hoverMessage && !RenderComponent && <TooltipTrigger> {hoverMessage}</TooltipTrigger>}
                <TooltipContent side="bottom">{message}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TooltipCustomProvider;
