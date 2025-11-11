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
}: {
    provider: fetchProviderKeys;
    action: any;
    userText: string;
}) => {
    return fetchProvider[provider].fetch({ action, userText });
};

export const fetchFromOpenRouter = async ({ action, userText }: { action: any; userText: string }) => {
    const prompt = buildOpenRouterPrompt({ action, userText });
    const openRouterBody = snapshotOpenRouterBody(prompt, true);
    return fetchOpenRouter(openRouterBody);
};
export const fetchFromOllama = async ({ action, userText }: { action: any; userText: string }) => {
    const prompt = buildPromptFromOllama({ action, userText });
    const ollamaBody = snapshotOllamaBody(prompt, true);
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
