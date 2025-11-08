"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles } from "lucide-react";
import React from "react";
import { AskAICustomEvent, handleAIAction } from "../../utils";
import { Editor } from "@tiptap/react";
import { dispatchEvent } from "@/lib/event";

type AskAiButtonProps = {
    editor: Editor;
};
const AskAiButton = ({ editor }: AskAiButtonProps) => {
    const handleClickAskAi = () => {
        dispatchEvent(AskAICustomEvent.show, {
            from: "toolbar",
            editor,
        });
        console.log("dispatch event:  from toolbar");
    };

    return (
        <Button type="button" variant="outline" size="sm" title="Demander à l'IA" onClick={handleClickAskAi}>
            <Sparkles className="h-3 w-3 mr-1" />
            Demander à l'IA
        </Button>
    );
};

export default AskAiButton;
