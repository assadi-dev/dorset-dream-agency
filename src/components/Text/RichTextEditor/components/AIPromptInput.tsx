import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { ListRestart, PencilLine, RectangleEllipsis, Send, SparklesIcon, SpellCheck } from "lucide-react";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleAIAction } from "../utils";

type AIPromptInputProps = {
    editor: Editor;
};
const AIPromptInput = ({ editor }: AIPromptInputProps) => {
    return (
        <div className="w-3/4 rounded-lg shadow-lg bg-white border  absolute bottom-5 left-1/2 translate-x-[-50%] p-1  text-sm text-slate-500">
            <div className="px-2 pt-2">
                <textarea
                    className="resize-none w-full outline-none border-none"
                    name="prompt"
                    id="prompt"
                    placeholder="Demander à l'ia ce que vous voulez faire"
                ></textarea>
            </div>
            <div className="grid grid-cols-2 pr-3">
                <div>
                    <AiPromptContextPopover editor={editor} />{" "}
                </div>
                <Button className="justify-self-end" variant={"ghost"} size={"icon"}>
                    <Send className="h-4 w-4" />{" "}
                </Button>
            </div>
        </div>
    );
};

export default AIPromptInput;

export const AiPromptContextPopover = ({ editor }: AIPromptInputProps) => {
    const ItemHoverStyle = "hover:bg-primary hover:text-primary-foreground text-sm";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={"sm"} className="flex items-center ">
                    <SparklesIcon className="h-1.5 w-1.5" /> Actions
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[25vw]">
                <DropdownMenuItem
                    className={ItemHoverStyle}
                    onClick={() => handleAIAction({ editor, action: "generate" })}
                >
                    <RectangleEllipsis className="h-4 w-4 mr-1" /> Générer une description
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={ItemHoverStyle}
                    onClick={() => handleAIAction({ editor, action: "rephrase" })}
                >
                    <ListRestart className="h-4 w-4 mr-1" /> Reformuler
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={ItemHoverStyle}
                    onClick={() => handleAIAction({ editor, action: "correct" })}
                >
                    <SpellCheck className="h-4 w-4 mr-1" /> Corriger
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
