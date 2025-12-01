import { AskAIActionUnion } from "@/app/api/ai-actions/types/type";
import { LucidIconProps } from "@/types/global";
import { DocumentType, Editor, MarkType, NodeType, TextType } from "@tiptap/react";

export type RichTextButtonTitle =
    | "Gras"
    | "Italique"
    | "List"
    | "List ordonné"
    | "Alignement  à gauche"
    | "Centrer"
    | "Alignement à droite"
    | "Justifier"
    | "Vider"
    | "Annuler"
    | "Rétablir";

export type RichTextHandlerName =
    | "bold"
    | "italic"
    | "bulletList"
    | "orderedList"
    | "left"
    | "center"
    | "right"
    | "justify"
    | "undo"
    | "redo";
export type RichTextHandlerGroup = "word-format" | "text-align" | "list" | "action" | "other" | "file" | "undoRedo";

export type RichTextButtonProps = {
    icon: LucidIconProps;
    title: RichTextButtonTitle;
    handler: () => void;
    group: RichTextHandlerGroup;
};

export type HeaderActionsHandlerReturn = Record<RichTextHandlerName, RichTextButtonProps>;

export type TiptapContent = DocumentType<
    Record<string, any> | undefined,
    NodeType<
        string,
        Record<string, any> | undefined,
        any,
        (NodeType<any, any, any, any> | TextType<MarkType<any, any>>)[]
    >[]
>;

export type AIActionsGenerate = {
    label: string;
    value: string;
    icon: LucidIconProps;
};

export type AskAiDataEvent = {
    from: "toolbar" | "bubbleMenu";
    editor: Editor;
    text: string | null;
};

export type AskAiDataFetchingEvent = {
    action: AskAIActionUnion;
    prompt: string;
};

export type FetchAskAIApiReturn = {
    success: string;
    originalText: string;
    transformedText: string;
    action: string;
    model: string;
};

export interface LLMStreamOptions {
    action: AskAIActionUnion;
    prompt: string;
    conversationId: string;
    signal: AbortSignal;
}
export type OllamaMessage = {
    role: string;
    content: string;
};

export interface OllamaStreamChunk {
    model: string;
    created_at: string;
    response?: string;
    message?: OllamaMessage;
    done: boolean;
    context?: number[];
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_duration?: number;
    eval_count?: number;
    eval_duration?: number;
}

export interface OllamaChunk {
    model: string;
    created_at: string;
    response: string;
    message?: OllamaMessage;
    done: boolean;
}

export interface OllamaFinalMessage extends OllamaChunk {
    total_duration: number;
    load_duration: number;
    prompt_eval_count: number;
    prompt_eval_duration: number;
    eval_count: number;
    eval_duration: number;
}

export interface OllamaStreamOptions extends LLMStreamOptions {
    onChunk?: (chunk: string, fullText: string) => void;
    onComplete?: (fullText: string, metadata: OllamaStreamChunk) => void;
    onError?: (error: Error) => void;
}

export interface OpenRouterStreamOptions extends LLMStreamOptions {
    onChunk?: (chunk: string, fullText: string) => void;
    onComplete?: (fullText: string) => void;
    onError?: (error: Error) => void;
}

/**
 * Types pour l'API OpenRouter
 */
export interface OpenRouterMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface OpenRouterRequest {
    model: string;
    messages: OpenRouterMessage[];
    stream?: boolean;
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
}

export interface OpenRouterStreamChunk {
    id: string;
    model: string;
    choices: {
        index: number;
        delta: {
            role?: string;
            content?: string;
        };
        finish_reason: string | null;
    }[];
    created: number;
    object: string;
}

/**
 * Récupérer les modèles disponibles sur OpenRouter
 */
export interface OpenRouterModel {
    id: string;
    name: string;
    description?: string;
    context_length: number;
    pricing: {
        prompt: string;
        completion: string;
    };
}
