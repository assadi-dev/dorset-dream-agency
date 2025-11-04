import { ENV } from "./global";

export const SYSTEM_PROMPT = `Vous êtes un assistant IA spécialisé pour les agents immobiliers...`;

export const ACTION_PROMPTS = {
    resume: {
        name: "Résumer",
        instruction: `Tâche : Créer un résumé concis du texte suivant...`,
        temperature: 0.5,
        maxTokens: 200,
    },

    rephrase: {
        name: "Reformuler",
        instruction: `Tâche : Reformuler le texte...`,
        temperature: 0.7,
        maxTokens: 1000,
    },

    correct: {
        name: "Corriger",
        instruction: `Tâche : Corriger les erreurs...`,
        temperature: 0.3,
        maxTokens: 1000,
    },
} as const;

export type ACTION_PROMPTS_UNIONS = keyof typeof ACTION_PROMPTS;

export const ProviderURL = {
    ollama: ENV.OLLAMA_URL,
    lmStudio: ENV.LM_STUDIO_URL,
    openRouter: ENV.OPEN_ROUTER_URL,
} as const;

export const OLLAMA_CONFIG = {
    baseURL: ProviderURL.ollama || "http://localhost:11434/api",
    model: ENV.OLLAMA_MODEL,
    timeout: 30000, // 30 secondes
} as const;

export const OLLAMA_API_ENDPOINT = {
    chat: "/chat",
    generate: "/generate",
} as const;
