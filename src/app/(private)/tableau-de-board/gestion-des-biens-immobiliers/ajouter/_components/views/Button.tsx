import React from "react";
import { BookImage } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export const CoverButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={"outline"}
                    type="button"
                    //tooltipTitle="Définir cette image en couverture"
                    size={"icon"}
                    className="rounded-full w-6 h-6 !text-black !bg-gradient-to-br from-primary-accent  text-primary-accent active:scale-110 transition-all  opacity-0 group-hover:opacity-100"
                    onClick={onClick}
                >
                    <BookImage className="p-0" />
                </Button>
            </TooltipTrigger>

            <TooltipContent
                className="bg-white text-secondary ring-1 ring-slate-200 shadow-lg text-black"
                side="bottom"
            >
                Définir cette image en couverture
            </TooltipContent>
        </Tooltip>
    );
};
