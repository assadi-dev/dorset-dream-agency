import React from "react";
import AskAiCard from "./AskAiCard";
import SpinnerLoading from "@/components/loader/SpinerLoading";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Button } from "@/components/ui/button";
import { Square, StopCircle } from "lucide-react";
import { dispatchEvent } from "@/lib/event";
import { AskAICustomEvent } from "../../utils";

const AskAiFetching = () => {
    const stopFetching = () => {
        dispatchEvent(AskAICustomEvent.abort, null);
    };

    return (
        <AskAiCard>
            <div className="flex items-center space-between">
                <div className="flex items-center p-1 select-none">
                    <Spinner className="h-4 w-4 mx-3 " variant={"ellipsis"} />{" "}
                    <span className="text-sm  animate-pulse">Génération en cours </span>
                </div>
                <div className="flex-1 flex justify-end items-center">
                    <Button
                        variant={"ghost"}
                        size="icon"
                        className="rounded-full w-7 h-7 motion-preset-slide-right"
                        onClick={stopFetching}
                    >
                        <Square className="h-1 w-1" />
                    </Button>
                </div>
            </div>
        </AskAiCard>
    );
};

export default AskAiFetching;
