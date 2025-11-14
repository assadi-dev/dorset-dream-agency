import { Editor } from "@tiptap/react";
import {
    AIActionsGenerate,
    OllamaChunk,
    OllamaStreamChunk,
    OllamaStreamOptions,
    OpenRouterStreamOptions,
} from "./type";
import { ListRestart, RectangleEllipsis, SpellCheck } from "lucide-react";
import { delay } from "@/lib/utils";
import { OpenRouterRequest, OpenRouterStreamChunk } from "@/app/api/ai-actions/types/openRouterType";
import { EditorView } from "@tiptap/pm/view";
import { ENV } from "@/config/global";
import { API_INSTANCE } from "@/lib/api";
import { AskAIActionUnion } from "@/app/api/ai-actions/types/type";

type HandleAIActionArg = {
    editor: Editor;
    content: string;
};
export const insertContent = ({ editor, content }: HandleAIActionArg) => {
    const jsonNode = {
        type: "paragraph",
        content: [
            {
                type: "text",
                text: content,
            },
        ],
    };
    editor?.chain().focus().insertContent(jsonNode).run();
};

export const AI_ACTIONS_VALUES = {
    describe: "describe",
    rephrase: "rephrase",
    correct: "correct",
    continue: "continue",
};
export const PROMPT_INPUT_SIZE_LIMIT = 200;

export const aiActionsGenerate: AIActionsGenerate[] = [
    {
        label: "Générer une description",
        value: AI_ACTIONS_VALUES.describe,
        icon: RectangleEllipsis,
    },
    {
        label: "Continuer",
        value: AI_ACTIONS_VALUES.continue,
        icon: ListRestart,
    },
    {
        label: "Corriger",
        value: AI_ACTIONS_VALUES.correct,
        icon: SpellCheck,
    },
];

export const AskAICustomEvent = {
    show: "askAi:show",
    close: "askAi:close",
    fetching: "askAi:fetch",
    error: "askAi:error",
    stream: "askAi:stream",
    accept: "askAi:accept:text",
    decline: "askAi:cancel:text",
    clear: "askAi:clear",
    abort: "askAI:fetching:cancel",
};

export const fetchAiAction = (
    data: { action: string; prompt: string; conversationId: string; stream: boolean },
    signaling: AbortSignal,
) => {
    try {
        return fetch("/api/ai-actions/generate", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                "HTTP-Referer": window.location.origin,
            },
            signal: signaling,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`An error is occur in fetchAiApi ${error.message}`);
        }
    }
};

export const fetchAiApiMock = async (
    data: { action: string; text: string; conversationId: string },
    signal: AbortSignal,
) => {
    let timeout: NodeJS.Timeout;

    return new Promise((resolve) => {
        const response = {
            success: true,
            originalText: data.text,
            transformedText:
                " Maison exceptionnelle de 25 m² avec une remarquable commodité - 1 parking, 1 salle de bain\n\nDescription :\n\nDécouvrez cette magnifique maison de 25 m², située dans un quartier sécurisé et agréable. Cette propriété offre une excellente commodité avec son espace intérieur bien organisé et son parking privé.\n\nLa maison se distingue par sa belle architecture contemporaine et ses finitions de qualité. L'espace ouvert, lumineux et fonctionnel est idéal pour les activités quotidiennes et la vie familiale.\n\nLe sol en parquet et les murs blancs donnent un aspect élégant à l'intérieur. La cuisine moderne est équipée de tout ce dont vous avez besoin, tandis que le sal",
            action: data.action,
            model: "mistral:7b",
        };

        signal.addEventListener("abort", () => {
            clearTimeout(timeout);

            signal.removeEventListener("abort", () => {});
            throw new Error("Canceled");
        });

        timeout = setTimeout(() => {
            signal.removeEventListener("abort", () => {});
            clearTimeout(timeout);
            resolve(response);
        }, 3500);
    });
};

export const fetchOllamaStream = async ({
    action,
    prompt,
    signal,
    conversationId,
    onChunk,
    onComplete,
    onError,
}: OllamaStreamOptions) => {
    try {
        // Vérifier si déjà annulé
        if (signal?.aborted) {
            throw new Error("Canceled");
        }

        // Délai de 3 secondes avant de commencer
        await delay(3000, signal);

        // Vérifier à nouveau après le délai
        if (signal?.aborted) {
            throw new Error("Canceled");
        }
        const response = await fetchAiAction({ action, prompt, conversationId, stream: true }, signal);

        if (!response?.ok) {
            throw new Error(`An error is occur from fetchLLmStream : ${response?.status} ${response?.statusText}`);
        }

        if (!response.body) {
            throw new Error("Response body is null");
        }

        // Lecture du stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";
        let finalMetadata: OllamaStreamChunk | undefined;

        while (true) {
            if (signal?.aborted) {
                reader.cancel();
                throw new Error("Canceled");
            }

            const { done, value } = await reader.read();

            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter((line) => line.trim());
            for (const line of lines) {
                try {
                    const data: OllamaChunk = JSON.parse(line);
                    if (!data.done) {
                        // Ajouter la réponse au texte complet
                        fullResponse += data.message?.content;

                        // Appeler le callback avec le chunk
                        if (onChunk) {
                            onChunk(data.message?.content as string, fullResponse);
                        }
                    } else {
                        // C'est le message final avec les métadonnées
                        finalMetadata = data;
                    }
                } catch (parseError) {
                    console.error("Erreur de parsing JSON:", parseError);
                }
            }
        }

        if (onComplete) {
            onComplete(fullResponse, finalMetadata as OllamaStreamChunk);
        }
    } catch (error) {
        if (error instanceof Error) {
            // Si c'est une erreur d'annulation, la propager
            if (error.name === "AbortError" || error.message === "Canceled") {
                const cancelError = new Error("Canceled");
                if (onError) {
                    onError(cancelError);
                } else {
                    throw cancelError;
                }
                return;
            }
        }

        // Autres erreurs
        if (onError) {
            onError(error instanceof Error ? error : new Error(String(error)));
        } else {
            throw error;
        }
    }
};

/**
 * Appel à l'API OpenRouter avec streaming
 */
export async function fetchOpenRouterStream({
    action,
    prompt,
    signal,
    conversationId,
    onChunk,
    onComplete,
    onError,
}: OpenRouterStreamOptions): Promise<void> {
    try {
        // Vérifier si déjà annulé
        if (signal?.aborted) {
            throw new Error("Canceled");
        }

        // Délai de 3 secondes avant de commencer
        await delay(3000, signal);

        // Vérifier à nouveau après le délai
        if (signal?.aborted) {
            throw new Error("Canceled");
        }
        const response = await fetchAiAction({ action, prompt, conversationId, stream: true }, signal);
        if (!response?.ok) {
            const errorData = await response?.json().catch(() => null);
            throw new Error(
                `An error is occur from fetchAiAction: ${response?.status} ${response?.statusText}${
                    errorData?.error?.message ? ` - ${errorData.error.message}` : ""
                }`,
            );
        }

        if (!response.body) {
            throw new Error("Response body is null");
        }

        // Lire le stream
        const reader = response.body.getReader();

        const decoder = new TextDecoder();
        let fullResponse = "";
        let buffer = "";

        while (true) {
            // Vérifier l'annulation
            if (signal?.aborted) {
                reader.cancel();
                throw new Error("Canceled");
            }

            const { done, value } = await reader.read();

            if (done) break;

            // Décoder le chunk
            buffer += decoder.decode(value, { stream: true });

            // OpenRouter envoie les données au format SSE (Server-Sent Events)
            const lines = buffer.split("\n");
            buffer = lines.pop() || ""; // Garder la dernière ligne incomplète dans le buffer

            for (const line of lines) {
                const trimmedLine = line.trim();

                // Ignorer les lignes vides et les commentaires
                if (!trimmedLine || trimmedLine.startsWith(":")) continue;

                // Les données SSE commencent par "data: "
                if (trimmedLine.startsWith("data: ")) {
                    const data = trimmedLine.slice(6); // Enlever "data: "

                    // "[DONE]" indique la fin du stream
                    if (data === "[DONE]") {
                        break;
                    }

                    try {
                        const parsed: OpenRouterStreamChunk = JSON.parse(data);
                        const content = parsed.choices[0]?.delta?.content;

                        if (content) {
                            fullResponse += content;

                            // Appeler le callback avec le chunk
                            if (onChunk) {
                                onChunk(content, fullResponse);
                            }
                        }
                    } catch (parseError) {
                        console.error("Erreur de parsing JSON:", parseError);
                    }
                }
            }
        }

        // Appeler le callback de complétion
        if (onComplete) {
            onComplete(fullResponse);
        }
    } catch (error) {
        if (error instanceof Error) {
            // Si c'est une erreur d'annulation, la propager
            if (error.name === "AbortError" || error.message === "Canceled") {
                const cancelError = new Error("Canceled");
                if (onError) {
                    onError(cancelError);
                } else {
                    throw cancelError;
                }
                return;
            }
        }

        // Autres erreurs
        if (onError) {
            onError(error instanceof Error ? error : new Error(String(error)));
        } else {
            throw error;
        }
    }
}

export const handlePastText = (view: EditorView, event: ClipboardEvent) => {
    const text = event.clipboardData?.getData("text/plain") || "";

    if (!text) return false;

    // détecte si c’est probablement du markdown
    if (/[#*_`\[\]\(\)>-]/.test(text)) {
        event.preventDefault();

        // `editor` est parfois undefined au moment du collage → on vérifie
        const instance = view?.state?.schema ? view : null;
        if (!instance) return false;

        // On peut accéder à l'éditeur depuis view
        const tiptapEditor = (view as any).props.editor;
        const markdownStorage = tiptapEditor?.markdown;
        if (!markdownStorage) return false;

        const doc = markdownStorage.parser.parse(text);
        tiptapEditor.chain().focus().insertContent(doc.toJSON()).run();
        return true;
    }

    return false;
};

export const getEditorTextSelection = (editor: Editor) => {
    const { view, state } = editor;
    const { from, to } = view.state.selection;
    const text = state.doc.textBetween(from, to, "\n");
    return {
        from,
        to,
        text,
    };
};

export const generateConversionId = async (title: string) => {
    try {
        const res = await API_INSTANCE.post("ai-actions/conversation", { title });
        return {
            id: res.data._id,
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return {
            id: `conversation-${Date.now()}`,
        };
    }
};

export const saveAnswer = async (role: "assistant" | "user", conversationId: string, content: string) => {
    try {
        await API_INSTANCE.post("ai-actions/message", { role, conversationId, content });
        return {
            message: "AI answer has been save !",
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};

export const generatePrompt = (action: AskAIActionUnion, editor: Editor, userText: string): string => {
    try {
        const editorContent = editor.getText();
        let prompt = "";
        switch (action) {
            case "continue":
                prompt = editorContent + " \n\n continue ";
                break;
            case "rephrase":
                prompt = `Mon paragraphe : ${editorContent} \n texte à reformuler et remplacer dans le Mon paragraphe : ${userText}`;
                break;
            case "describe":
                prompt = userText;
                break;
            case "correct":
                prompt = userText;
                break;
        }

        return prompt;
    } catch (error) {
        return userText;
    }
};
