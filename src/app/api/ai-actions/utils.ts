import {
    ACTION_PROMPTS,
    ACTION_PROMPTS_UNIONS,
    OLLAMA_API_ENDPOINT,
    OLLAMA_CONFIG,
    ProviderURL,
    SYSTEM_PROMPT,
} from "@/config/ai-actions";
import { ENV } from "@/config/global";
import { fetchWithAuthorization } from "@/lib/fetcher";
import { OllamaBodySchema, OpenRouterBodySchema } from "./schema";
import { OllamaBody } from "./types/ollamaType";
import { Message } from "./types/openRouterType";

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
export const buildPromptFromOllama = ({ action, userText }: buildPromptArgs) => {
    const actionConfig = ACTION_PROMPTS[action];

    const fullPrompt = `${SYSTEM_PROMPT}
${actionConfig.instruction}\n
Texte :\n
${userText}`;

    return {
        model: OLLAMA_CONFIG.model,
        prompt: fullPrompt,
        stream: false,
        options: {
            temperature: actionConfig.temperature,
            num_predict: actionConfig.maxTokens,
        },
    };
};

export const fetchOpenRouter = async (content: Message) => {
    try {
        const isValidate = OpenRouterBodySchema.safeParse(content);

        if (isValidate.error) throw isValidate.error;

        const TOKEN = ENV.OPEN_ROUTER_API_KEY;
        const Authorization = `Bearer ${TOKEN}`;
        const body = JSON.stringify(isValidate.data);
        return fetchWithAuthorization({
            input: ProviderURL.openRouter,
            Authorization,
            init: { method: "POST", body },
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(`An Error is occurred in fetchOpenRouter ${error.message}`);
        }
    }
};

export const fetchWithOllama = (content: OllamaBody) => {
    try {
        const isValidate = OllamaBodySchema.safeParse(content);

        if (isValidate.error) throw isValidate.error;

        const body = JSON.stringify(isValidate.data);

        return fetch(OLLAMA_CONFIG.baseURL + OLLAMA_API_ENDPOINT.generate, {
            method: "POST",
            body,
            signal: AbortSignal.timeout(OLLAMA_CONFIG.timeout),
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(`An Error is occurred in fetchWithOllama ${error.message}`);
        }
    }
};
