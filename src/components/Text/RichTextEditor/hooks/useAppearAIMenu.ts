import React from "react";
import { AskAICustomEvent } from "../utils";
import { subscribe } from "@/lib/event";
import { Editor } from "@tiptap/react";

type StateProps = {
    isOpen: boolean;
    editor: Editor | null;
};

type UseAppearAIMenuProps = {
    editor: Editor | null;
};
const useAppearAIMenu = ({ editor }: UseAppearAIMenuProps) => {
    const [reducer, dispatch] = React.useReducer(
        (prev: StateProps, next: Partial<StateProps>) => ({ ...prev, ...next }),
        {
            isOpen: false,
            editor: null,
        },
    );

    React.useEffect(() => {
        if (editor) dispatch({ editor: editor });

        subscribe(AskAICustomEvent.show, () => {
            dispatch({
                isOpen: true,
            });
        });

        subscribe(AskAICustomEvent.close, () => {
            dispatch({
                isOpen: false,
            });
        });
    }, [editor]);

    return {
        isOpen: reducer.isOpen,
        editor: reducer.editor,
    };
};

export default useAppearAIMenu;
