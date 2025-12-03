"use client";
import { Button } from "@/components/ui/button";

import { Sparkles } from "lucide-react";
import React from "react";
import { AskAICustomEvent, getEditorTextSelection } from "../../utils";
import { Editor } from "@tiptap/react";
import { dispatchEvent } from "@/lib/event";
import HeaderActionsButton from "../HeaderActionsButton";
import { BubbleMenuProps } from "@tiptap/react/menus";

type AskAiButtonProps = {
    editor: Editor;
};
const AskAiButton = ({ editor }: AskAiButtonProps) => {
    const handleClickAskAi = () => {
        const text = getEditorTextSelection(editor).text;

        dispatchEvent(AskAICustomEvent.show, {
            from: "toolbar",
            editor,
            text,
        });
    };

    return (
        <Button type="button" variant="outline" size="sm" title="Demander à l'IA" onClick={handleClickAskAi}>
            <Sparkles className="h-3 w-3 mr-1" />
        </Button>
    );
};

export default AskAiButton;

export const AskAiBubleAction = ({ editor, bubbleMenuRef }: AskAiButtonProps & { bubbleMenuRef: any }) => {
    const handleClickAskAi = () => {
        if (bubbleMenuRef) {
            bubbleMenuRef.style.visibility = "hidden";
            bubbleMenuRef.style.opacity = 0;
        }

        const text = getEditorTextSelection(editor).text;
        dispatchEvent(AskAICustomEvent.show, {
            from: "bubbleMenu",
            editor,
            text,
        });
    };
    return (
        <HeaderActionsButton icon={Sparkles} label={"Demander à l'IA"} handler={handleClickAskAi} isSelected={false} />
    );
};
