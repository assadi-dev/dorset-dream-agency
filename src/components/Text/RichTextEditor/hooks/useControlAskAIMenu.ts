import React from "react";
import { AskAICustomEvent, fetchAiApiMock, insertContent } from "../utils";
import { dispatchEvent, subscribe, unsubscribe } from "@/lib/event";
import { Editor } from "@tiptap/react";
import { AskAiDataEvent, AskAiDataFetchingEvent } from "../type";

type ReducerProps = {
    isOpen: boolean;
    editor: Editor | null;
    text: string | null;
    isFetching: boolean;
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
            isFetching: false,
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

    const controller = new AbortController();

    const fetchAi = React.useCallback(
        async (event: unknown) => {
            dispatch({ isOpen: false, isFetching: true });
            if (event instanceof CustomEvent) {
                const data = event.detail as AskAiDataFetchingEvent;
                const signaling = controller.signal;
                const res = await fetchAiApiMock(data, signaling);
                const content = res?.transformedText ?? "";
                if (editor) insertContent({ editor, content });

                dispatch({ isFetching: false });
            }
        },
        [controller.signal, editor],
    );

    React.useEffect(() => {
        if (editor) dispatch({ editor: editor });

        subscribe(AskAICustomEvent.show, toggleIsOpen);
        subscribe(AskAICustomEvent.close, close);
        subscribe(AskAICustomEvent.fetching, fetchAi);
        return () => {
            unsubscribe(AskAICustomEvent.show, toggleIsOpen);
            unsubscribe(AskAICustomEvent.close, close);
            unsubscribe(AskAICustomEvent.fetching, fetchAi);
        };
    }, [editor, toggleIsOpen, close]);

    return {
        isOpen: reducer.isOpen,
        editor: reducer.editor,
        text: reducer.text,
        isFetching: reducer.isFetching,
    };
};

export default useControlAskAIMenu;
