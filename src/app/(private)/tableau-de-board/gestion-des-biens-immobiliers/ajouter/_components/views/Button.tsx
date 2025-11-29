import React from "react";
import { BookImage } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const CoverButton = ({ isCover, onClick }: { isCover: boolean; onClick: () => void }) => {
    const BTN_CLASS =
        "rounded-full w-6 h-6 !text-black !bg-gradient-to-br from-primary-accent  text-primary-accent active:scale-110 transition-all  opacity-0 group-hover:opacity-100";

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={"outline"}
                    type="button"
                    size={"icon"}
                    className={cn(BTN_CLASS, {
                        "ring-green-900": isCover,
                        "ring-1": isCover,
                        "!text-green-950": isCover,
                        "!from-lime-400": isCover,
                        "!to-lime-400": isCover,
                        "opacity-100": isCover,
                        "hover:bg-lime-400": isCover,
                    })}
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
