import {
    ACTION_PROMPTS,
    ACTION_PROMPTS_UNIONS,
    OLLAMA_API_ENDPOINT,
    OLLAMA_CONFIG,
    OPEN_ROUTER_CONFIG,
    OPEN_ROUTER_ENDPOINT,
    ProviderURL,
    SYSTEM_PROMPT,
} from "@/config/ai-actions";
import { ENV } from "@/config/global";
import { fetchWithAuthorization } from "@/lib/fetcher";
import { ChatConversationSchemaInfer, OllamaBodySchema, OpenRouterBodySchema } from "./schema";
import { OllamaBody, OllamaPromptReturn } from "./types/ollamaType";
import { OpenRouterRequest, OpenRouterReturn } from "./types/openRouterType";
import { MODEL_BY_PROVIDER } from "@/config/llm";
import { ModelProviderKeys } from "@/types/llm";
import { reportException } from "@/lib/logger";

type buildPromptArgs = {
    action: ACTION_PROMPTS_UNIONS;
    userText: string;
};

export const buildPrompt = ({ action, userText }: buildPromptArgs) => {
    const actionConfig = ACTION_PROMPTS[action];

    return {
        system: SYSTEM_PROMPT,
        user: actionConfig.instruction.replace("{TEXTE_UTILISATEUR}", userText),
        maxTokens: actionConfig.maxTokens,
    };
};

export const buildOpenRouterPrompt = ({ action, userText }: buildPromptArgs): OpenRouterReturn => {
    const actionConfig = ACTION_PROMPTS[action];

    return {
        model: OPEN_ROUTER_CONFIG.model,
        system: SYSTEM_PROMPT,
        user: `${actionConfig.instruction} Texte :\n 
        ${userText}
        `,
        maxTokens: actionConfig.maxTokens,
        temperature: actionConfig.temperature,
        role: "user",
    };
};
export const buildPromptFromOllama = ({ action, userText }: buildPromptArgs): OllamaPromptReturn => {
    const actionConfig = ACTION_PROMPTS[action];
    const fullPrompt = `${SYSTEM_PROMPT}
${actionConfig.instruction}\n
Texte :\n
${userText}`;

    return {
        model: OLLAMA_CONFIG.model,
        prompt: fullPrompt,
        stream: false,
        role: "user",
        options: {
            temperature: actionConfig.temperature,
            num_predict: actionConfig.maxTokens,
        },
    };
};

export const snapshotOllamaBody = (
    prompt: OllamaPromptReturn,
    history: ChatConversationSchemaInfer[],
    stream?: boolean,
) => {
    const messages = [...history];
    messages.push({ role: prompt.role, content: prompt.prompt ?? "" } as ChatConversationSchemaInfer);

    return {
        options: prompt.options,
        model: prompt.model,
        messages,
        stream: stream ?? false,
    } satisfies OllamaBody;
};

export const snapshotOpenRouterBody = (
    prompt: OpenRouterReturn,
    history: ChatConversationSchemaInfer[],
    stream?: boolean,
) => {
    const messages = [...history];
    messages.push({ role: prompt.role, content: prompt.user ?? "" });
    return {
        model: prompt.model,
        messages,
        stream: stream ?? false,
        temperature: prompt.temperature,
    } satisfies OpenRouterRequest;
};

export const fetchOpenRouter = async (content: OpenRouterRequest) => {
    try {
        const isValidate = OpenRouterBodySchema.safeParse(content);

        if (isValidate.error) throw isValidate.error;

        const TOKEN = ENV.OPEN_ROUTER_API_KEY;
        const Authorization = `Bearer ${TOKEN}`;
        const body = JSON.stringify(isValidate.data);
        return fetchWithAuthorization({
            input: ProviderURL.openRouter + OPEN_ROUTER_ENDPOINT.chat,
            Authorization,
            init: { method: "POST", body },
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(`An Error is occurred in fetchOpenRouter ${error.message}`);
            reportException(error);
        }
    }
};

export const fetchWithOllama = (content: OllamaBody) => {
    try {
        const isValidate = OllamaBodySchema.safeParse(content);

        if (isValidate.error) throw isValidate.error;

        const body = JSON.stringify(isValidate.data);

        return fetch(OLLAMA_CONFIG.baseURL + OLLAMA_API_ENDPOINT.chat, {
            method: "POST",
            body,
            signal: AbortSignal.timeout(OLLAMA_CONFIG.timeout),
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(`An Error is occurred in fetchWithOllama ${error.message}`);
            reportException(error);
        }
    }
};

export const obtainDefaultModel = () => {
    const provider = ENV.DEFAULT_LLM__MODEL_PROVIDER as ModelProviderKeys;
    const model = MODEL_BY_PROVIDER[provider];
    if (!model) return ENV.OLLAMA_MODEL;
    return model;
};
