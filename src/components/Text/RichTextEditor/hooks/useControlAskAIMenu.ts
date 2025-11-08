import React from "react";
import { AskAICustomEvent } from "../utils";
import { subscribe, unsubscribe } from "@/lib/event";
import { Editor } from "@tiptap/react";

type StateProps = {
    isOpen: boolean;
    editor: Editor | null;
};

type UseAppearAIMenuProps = {
    editor: Editor | null;
};
const useControlAskAIMenu = ({ editor }: UseAppearAIMenuProps) => {
    const [reducer, dispatch] = React.useReducer(
        (prev: StateProps, next: Partial<StateProps>) => ({ ...prev, ...next }),
        {
            isOpen: false,
            editor: null,
        },
    );

    const toggleIsOpen = React.useCallback(() => {
        dispatch({
            isOpen: !reducer.isOpen,
        });
    }, [reducer.isOpen]);
    const close = React.useCallback(() => {
        dispatch({
            isOpen: false,
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
    };
};

export default useControlAskAIMenu;
