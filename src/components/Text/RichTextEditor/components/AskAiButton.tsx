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
import { handleAIAction } from "../utils";
import { Editor } from "@tiptap/react";
import { dispatchEvent } from "@/lib/event";

type AskAiButtonProps = {
    editor: Editor;
};
const AskAiButton = ({ editor }: AskAiButtonProps) => {
    const handleClickAskAi = () => {
        dispatchEvent("askAi:open", {
            from: "toolbar",
            editor,
        });
        console.log("dispatch event:  from toolbar");
    };

    return (
        /*         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="sm" title="Demander à l'IA">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Demander à l'IA
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleAIAction({ editor, action: "generate" })}>
                    Générer une description
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAIAction({ editor, action: "rephrase" })}>
                    Reformuler
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAIAction({ editor, action: "correct" })}>
                    Corriger
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu> */
        <Button type="button" variant="outline" size="sm" title="Demander à l'IA" onClick={handleClickAskAi}>
            <Sparkles className="h-3 w-3 mr-1" />
            Demander à l'IA
        </Button>
    );
};

export default AskAiButton;
