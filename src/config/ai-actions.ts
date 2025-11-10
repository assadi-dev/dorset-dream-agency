import { ENV } from "./global";

export const SYSTEM_PROMPT = `Tu es un assistant pour agent immobilier`;

export const ACTION_PROMPTS = {
    resume: {
        name: "Résumer",
        instruction: `TÂCHE : Résume ce texte en 3-4 phrases maximum.

RÈGLES :
- Garde prix, superficie, localisation
- Style professionnel et accrocheur
- Mets en avant les points forts
- Pas de style dans text`,
        temperature: 0.5,
        maxTokens: 200,
    },

    describe: {
        name: "Description",
        instruction: `TÂCHE : Génère une fiche descriptif.

RÈGLES :
- Style professionnel et accrocheur
- Mets en avant les points forts
- Passer à la ligne après chaque paragraphe(s)  
`,
        temperature: 0.5,
        maxTokens: 200,
    },

    rephrase: {
        name: "Reformuler",
        instruction: `TÂCHE : Reformule ce texte pour le rendre plus professionnel
        RÈGLES :
- Améliore la clarté
- Vocabulaire immobilier approprié
- Plus vendeur mais honnête
- Garde TOUS les détails (prix, mesures)
- Passer à la ligne après chaque paragraphe(s) 
`,
        temperature: 0.7,
        maxTokens: 1000,
    },

    correct: {
        name: "Corriger",
        instruction: `TÂCHE : Corrige uniquement les fautes d'orthographe et de grammaire.

RÈGLES :
- Ne change PAS le sens
- Ne change PAS le style
- Corrige seulement les erreurs
- Si pas d'erreur, retourne le texte tel quel`,
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

export const OPEN_ROUTER_CONFIG = {
    baseURL: ProviderURL.openRouter,
    model: ENV.OPEN_ROUTER_MODEL,
    apiKey: ENV.OPEN_ROUTER_API_KEY,
    timeout: 30000,
} as const;

export const OPEN_ROUTER_ENDPOINT = {
    chat: "/chat/completions",
} as const;
