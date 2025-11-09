/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { AskAICustomEvent, fetchAiApiMock, insertContent } from "../utils";
import { subscribe, unsubscribe } from "@/lib/event";
import { Editor } from "@tiptap/react";
import { AskAiDataEvent, AskAiDataFetchingEvent } from "../type";
import { ToastErrorSonner, ToastInfoSonner } from "@/components/notify/Sonner";
import { mockLLMStream } from "../ollamaMock";

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
    const abortControllerRef = React.useRef<AbortController | null>(null);

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
        if (!abortControllerRef.current) return;
        abortControllerRef.current.abort();
        ToastInfoSonner({ description: `Génération annulée par l'utilisateur` }, 5000);
        dispatch({ isFetching: false });
    };

    const fetchAi = React.useCallback(
        async (event: unknown) => {
            try {
                dispatch({ isOpen: false, isFetching: true });
                abortControllerRef.current = new AbortController();
                if (event instanceof CustomEvent) {
                    const data = event.detail as AskAiDataFetchingEvent;
                    const signal = abortControllerRef.current.signal;
                    await mockLLMStream({
                        prompt: data.text ?? "",
                        signal,
                        onChunk: (chunk: string, fullText: string) => {
                            console.log(chunk);
                            if (editor) {
                                editor.chain().focus().insertContent(chunk).run();
                            }
                        },
                        onComplete(fullText) {
                            dispatch({ isFetching: false });
                        },
                        onError: (error: Error) => {
                            console.error("Erreur de streaming:", error);
                            if (error.message === "Canceled") {
                                console.log("Génération annulée par l'utilisateur");
                                abortControllerRef.current = null;
                            }
                            dispatch({ isFetching: false });
                        },
                    });
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
        cancel: () => abortControllerRef.current?.abort(),
    };
};

export default useControlAskAIMenu;
