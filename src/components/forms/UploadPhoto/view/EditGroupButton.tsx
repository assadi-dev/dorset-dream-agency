import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ResetIcon } from "@radix-ui/react-icons";
import { Save } from "lucide-react";
import React from "react";

type EditGroupButtonProps = ButtonProps;
const EditGroupButton = ({ ...props }: EditGroupButtonProps) => {
    return (
        <TooltipProvider>
            <div
                className={cn(
                    "absolute left-0 top-[50%] translate-y-[-50%] p-5 flex flex-col items-center gap-3",
                    props.className,
                )}
            >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="icon" variant="outline" className="bg-transparent text-white">
                            <ResetIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-300 ">
                        <p className="text-sm text-black">Réinitialiser</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="icon" variant="outline" className="bg-transparent text-white">
                            <Save />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-300 text-secondary">
                        <p className="text-sm text-black">Sauvegarder</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
};

export default EditGroupButton;
