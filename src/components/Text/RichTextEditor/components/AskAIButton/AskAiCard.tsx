import { cn } from "@/lib/utils";
import React from "react";

type AskAiCardProps = {
    children: React.ReactElement;
    classnames?: { container?: string; children?: string };
};
const AskAiCard = ({ children, classnames }: AskAiCardProps) => {
    return (
        <div className={cn("absolute bottom-3 w-full left-0 flex justify-center p-1", classnames?.container)}>
            <div
                className={cn(
                    "w-2/3 mx-auto rounded-lg shadow-lg bg-white border    p-1  text-sm text-slate-500 motion-preset-expand motion-duration-300 ",
                    classnames?.children,
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default AskAiCard;
