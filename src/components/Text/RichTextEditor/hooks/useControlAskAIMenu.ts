/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { AskAICustomEvent, fetchAiApiMock, insertContent } from "../utils";
import { dispatchEvent, subscribe, unsubscribe } from "@/lib/event";
import { Editor } from "@tiptap/react";
import { AskAiDataEvent, AskAiDataFetchingEvent } from "../type";
import { ToastErrorSonner, ToastInfoSonner } from "@/components/notify/Sonner";

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
    const controller = React.useRef<AbortController>();

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

    const abortSignal = () => {
        if (!controller.current) return;
        controller.current.abort();
        ToastInfoSonner({ description: `Action annuler` }, 5000);
        dispatch({ isFetching: false });
    };

    const fetchAi = React.useCallback(
        async (event: unknown) => {
            try {
                controller.current = new AbortController();
                dispatch({ isOpen: false, isFetching: true });
                if (event instanceof CustomEvent) {
                    const data = event.detail as AskAiDataFetchingEvent;
                    const signaling = controller.current.signal;
                    const res = (await fetchAiApiMock(data, signaling)) as any;
                    const content = res?.transformedText ?? "";
                    if (editor) insertContent({ editor, content });
                    dispatch({ isFetching: false });
                }
            } catch (error) {
                dispatch({ isFetching: false });
                if (error instanceof Error) {
                    ToastErrorSonner(error.message);
                }
            }
        },
        [editor],
    );

    React.useEffect(() => {
        if (editor) dispatch({ editor: editor });
        subscribe(AskAICustomEvent.show, toggleIsOpen);
        subscribe(AskAICustomEvent.close, close);
        subscribe(AskAICustomEvent.fetching, fetchAi);
        subscribe(AskAICustomEvent.abort, abortSignal);

        return () => {
            unsubscribe(AskAICustomEvent.show, toggleIsOpen);
            unsubscribe(AskAICustomEvent.close, close);
            unsubscribe(AskAICustomEvent.fetching, fetchAi);
            unsubscribe(AskAICustomEvent.abort, abortSignal);
        };
    }, [editor, toggleIsOpen, close]);

    return {
        isOpen: reducer.isOpen,
        editor: reducer.editor,
        text: reducer.text,
        isFetching: reducer.isFetching,
        cancel: () => controller.current?.abort(),
    };
};

export default useControlAskAIMenu;
