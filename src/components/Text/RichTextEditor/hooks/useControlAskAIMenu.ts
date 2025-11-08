import React from "react";
import { AskAICustomEvent } from "../utils";
import { subscribe, unsubscribe } from "@/lib/event";
import { Editor } from "@tiptap/react";
import { AskAiDataEvent } from "../type";

type ReducerProps = {
    isOpen: boolean;
    editor: Editor | null;
    text: string | null;
};

type UseAppearAIMenuProps = {
    editor: Editor | null;
};
const useControlAskAIMenu = ({ editor }: UseAppearAIMenuProps) => {
    const [reducer, dispatch] = React.useReducer(
        (prev: ReducerProps, next: Partial<ReducerProps>) => ({ ...prev, ...next }),
        {
            isOpen: false,
            editor: null,
            text: null,
        },
    );

    const toggleIsOpen = React.useCallback(
        (event: unknown) => {
            let text: string | null = null;
            if (event instanceof CustomEvent) {
                const data = event.detail as AskAiDataEvent;
                text = data.text;
            }

            dispatch({
                isOpen: !reducer.isOpen,
                text,
            });
        },
        [reducer.isOpen],
    );
    const close = React.useCallback(() => {
        dispatch({
            isOpen: false,
            text: null,
        });
    }, []);

    React.useEffect(() => {
        if (editor) dispatch({ editor: editor });

        subscribe(AskAICustomEvent.show, toggleIsOpen);
        subscribe(AskAICustomEvent.close, close);
        return () => {
            unsubscribe(AskAICustomEvent.show, toggleIsOpen);
            unsubscribe(AskAICustomEvent.close, close);
        };
    }, [editor, toggleIsOpen, close]);

    return {
        isOpen: reducer.isOpen,
        editor: reducer.editor,
        content: reducer.text,
    };
};

export default useControlAskAIMenu;
