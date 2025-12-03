/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
    AskAICustomEvent,
    fetchOllamaStream,
    fetchOpenRouterStream,
    generateConversionId,
    generatePrompt,
    saveAnswer,
} from "../utils";
import { subscribe, unsubscribe } from "@/lib/event";
import { Editor } from "@tiptap/react";
import { AskAiDataEvent, AskAiDataFetchingEvent } from "../type";
import { ToastErrorSonner, ToastInfoSonner } from "@/components/notify/Sonner";
import { reportException } from "@/lib/logger";

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
    const conversationIdRef = React.useRef<string | null>(null);

    const [reducer, dispatch] = React.useReducer(
        (prev: ReducerProps, next: Partial<ReducerProps>) => ({ ...prev, ...next }),
        {
            isOpen: false,
            editor: null,
            text: null,
            isFetching: false,
        },
    );

    const initConversations = React.useCallback(async () => {
        if (conversationIdRef.current) return conversationIdRef.current;
        const title = `generate-description-conversation-${Date.now()}`;
        const response = await generateConversionId(title);
        conversationIdRef.current = response.id;
    }, []);

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
                    if (!conversationIdRef.current) throw Error(`Conversation id missing !`);
                    await saveAnswer("user", conversationIdRef.current, data.prompt);
                    if (!editor) throw Error("Editor no initialize !");
                    const prompt = generatePrompt(data.action, editor, data.prompt);

                    await fetchOpenRouterStream({
                        action: data.action,
                        prompt: prompt,
                        conversationId: conversationIdRef.current,
                        signal,
                        onChunk: (chunk, fullText) => {
                            if (!editor || signal.aborted) return;

                            // if (data.action === "describe") editor.commands.setContent(fullText);
                        },

                        onComplete(fullText) {
                            if (!editor || signal.aborted) return;

                            if (data.action === "describe") editor.commands.setContent(fullText);
                            if (data.action == "correct" || data.action === "rephrase") {
                                editor.chain().focus().insertContent(fullText).run();
                            }
                            if (data.action == "continue") editor.commands.insertContent(fullText);

                            if (conversationIdRef.current) saveAnswer("assistant", conversationIdRef.current, fullText);
                            dispatch({ isFetching: false });
                        },
                        onError: (error: Error) => {
                            console.error("Erreur de streaming:", error);
                            reportException(error);
                            if (error.message === "Canceled") {
                                console.error("Génération annulée par l'utilisateur");
                                abortControllerRef.current = null;
                            }
                            dispatch({ isFetching: false });
                        },
                    });
                }
            } catch (error) {
                if (error instanceof Error) {
                    reportException(error);
                    ToastErrorSonner(error.message);
                }
                dispatch({ isFetching: false });
            }
        },
        [editor],
    );

    React.useEffect(() => {
        if (editor) dispatch({ editor: editor });
        initConversations();
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
