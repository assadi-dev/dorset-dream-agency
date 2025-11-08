"use client";
import React from "react";
import { AskAICustomEvent } from "../utils";
import { dispatchEvent } from "@/lib/event";
import { Editor } from "@tiptap/react";
import { Transaction } from "@tiptap/pm/state";

type UseAskAIEventProps = {
    element?: any | null;
    editor: Editor;
};
const useAskAIEvent = ({ element, editor }: UseAskAIEventProps) => {
    const closePopover = () => {
        dispatchEvent(AskAICustomEvent.close, null);
    };

    const handleClickListener = (ev: PointerEvent) => {};
    const handleSelect = (ev: any) => {
        const editor = ev.editor as Editor;
        const { view, state } = editor;
        const { from, to } = view.state.selection;
        const transaction = ev.transaction as Transaction;
        const text = state.doc.textBetween(from, to, "\n");
        console.log(text);
    };

    const ajusteTextareaAutoSize = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    const textareaAutoSize = React.useCallback(() => {
        if (!element) return;
        element?.querySelectorAll("textarea")?.forEach((textarea: HTMLTextAreaElement) => {
            textarea.addEventListener("input", () => ajusteTextareaAutoSize(textarea));
        });
    }, [element]);

    React.useEffect(() => {
        if (!editor) return;
        editor.on("selectionUpdate", handleSelect);
        editor.on("focus", closePopover);
        textareaAutoSize();
        return () => {
            editor.off("focus", closePopover);
        };
    }, [editor, textareaAutoSize]);
};

export default useAskAIEvent;
