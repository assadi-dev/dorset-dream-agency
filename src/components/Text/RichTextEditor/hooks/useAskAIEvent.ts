"use client";
import React from "react";
import { AskAICustomEvent, insertContent } from "../utils";
import { dispatchEvent, subscribe, unsubscribe } from "@/lib/event";
import { Editor } from "@tiptap/react";
import { Transaction } from "@tiptap/pm/state";
import { UseFormReturn } from "react-hook-form";
import { AskAISchemaInfer } from "../components/AskAIButton/schema";
import { AskAiDataEvent } from "../type";

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

    const listenOpenModal = React.useCallback(
        (event: unknown) => {
            let text: string | null = null;
            if (event instanceof CustomEvent) {
                text = "Hello world";
                text && insertContent({ editor, content: text });
            }
        },
        [editor],
    );

    const cleanListener = React.useCallback(() => {
        editor.off("focus", closePopover);
        unsubscribe(AskAICustomEvent.stream, listenOpenModal);
    }, [editor, listenOpenModal]);

    React.useEffect(() => {
        if (!editor) return;
        editor.on("focus", closePopover);
        textareaAutoSize();
        subscribe(AskAICustomEvent.stream, listenOpenModal);
        return () => {
            cleanListener();
        };
    }, [editor, textareaAutoSize, listenOpenModal, cleanListener]);
};

export default useAskAIEvent;
