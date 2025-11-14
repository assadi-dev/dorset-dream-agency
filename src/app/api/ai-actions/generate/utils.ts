import { ChatConversationSchemaInfer } from "../schema";
import {
    buildOpenRouterPrompt,
    buildPromptFromOllama,
    fetchOpenRouter,
    fetchWithOllama,
    snapshotOllamaBody,
    snapshotOpenRouterBody,
} from "../utils";

export const generateFromProvider = ({
    provider,
    action,
    userText,
    history,
}: {
    provider: fetchProviderKeys;
    action: any;
    userText: string;
    history: ChatConversationSchemaInfer[];
}) => {
    return fetchProvider[provider].fetch({ action, userText, history });
};

export const fetchFromOpenRouter = async ({
    action,
    userText,
    history,
}: {
    action: any;
    userText: string;
    history: ChatConversationSchemaInfer[];
}) => {
    const prompt = buildOpenRouterPrompt({ action, userText });
    const openRouterBody = snapshotOpenRouterBody(prompt, history, true);
    return fetchOpenRouter(openRouterBody);
};
export const fetchFromOllama = async ({
    action,
    userText,
    history,
}: {
    action: any;
    userText: string;
    history: ChatConversationSchemaInfer[];
}) => {
    const prompt = buildPromptFromOllama({ action, userText });
    const ollamaBody = snapshotOllamaBody(prompt, history, true);
    console.log(ollamaBody);

    return fetchWithOllama(ollamaBody);
};

export type fetchProviderKeys = keyof typeof fetchProvider;

export const fetchProvider = {
    ollama: {
        fetch: fetchFromOllama,
    },
    openRouter: {
        fetch: fetchFromOpenRouter,
    },
};
