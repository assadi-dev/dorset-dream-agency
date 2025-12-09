import { ENV } from "./global";

export const SYSTEM_PROMPT = `Tu es un assistant pour agent immobilier`;

export const ACTION_PROMPTS = {
    resume: {
        name: "Résumer",
        instruction: `Tu est un expert en écriture de synthèse et lecture de contenu. tu vas recevoir un  texte écrite par un utilisateur. Ce texte peut contenir plusieurs données caractéristiques concernant la propriété à décrire ou developer.  
   
        TÂCHE :
        - Résume ce texte en 3-4 phrases maximum.
        - Le Tout en 1 paragraph.

IMPORTANT :
- Garde prix, superficie, localisation
- Style professionnel et accrocheur
- Mets en avant les points forts
- Réponds de manière complète et termine toutes les phrases. Ne coupe pas la génération avant la fin.
- Répond entièrement  en français , meme si le text original ne l'est pas.
`,
        temperature: 0.5,
        maxTokens: 400,
    },

    describe: {
        name: "Description",
        instruction: `
        Tu est un expert en écriture de synthèse et lecture de contenu. tu vas recevoir un  texte écrite par un utilisateur. Ce texte peut contenir plusieurs données caractéristiques concernant la propriété à décrire ou developer.
        TÂCHE :
         - Génère une fiche descriptif avec les caractéristiques reçus ou extrais dans le texte.
         - séparer le paragraphe avec les saut de ligne

IMPORTANT :
- Style professionnel et accrocheur
- Mets en avant les points forts
- Passer à la ligne après chaque paragraphe(s)
- Réponds de manière complète et termine toutes les phrases. Ne coupe pas la génération avant la fin.
- Répond entièrement  en français , meme si le text original ne l'est pas.
- N'oublie pas les saut de ligne .
`,
        temperature: 0.5,
        maxTokens: 4200,
    },

    rephrase: {
        name: "Reformuler",
        instruction: `Tu est un expert en écriture de synthèse et lecture de contenu. tu vas recevoir un  texte écrite par un utilisateur. Ce texte peut contenir plusieurs données caractéristiques concernant la propriété à décrire ou developer.

        TÂCHE :
         - Reformule ce texte pour le rendre plus professionnel
        IMPORTANT :
- Améliorer la clarté et la fluidité rédactionnelle
- Vocabulaire immobilier approprié
- Plus vendeur mais honnête
- Conserver absolument tous les détails présents (prix, chiffres, mesures, superficies, équipements, etc.)
- Aérer la mise en forme : sauter une ligne entre chaque paragraphe.
- Réponds de manière complète et termine toutes les phrases. Ne coupe pas la génération avant la fin.
- Répond entièrement  en français , meme si le text original ne l'est pas.
`,
        temperature: 0.7,
        maxTokens: 400,
    },

    continue: {
        name: "Rallonger",
        instruction: `Corrige et poursuis le texte suivant sans réécrire ni paraphraser les parties déjà fournies. Continue le texte de manière fluide, naturelle et cohérente.
        IMPORTANT :
- Améliorer la clarté et la fluidité rédactionnelle.
- Utiliser un vocabulaire professionnel du secteur immobilier.
- Ton vendeur, attractif, mais honnête et factuel.
- Conserver absolument tous les détails présents (prix, chiffres, mesures, superficies, équipements, etc.).
- Ne pas répéter, reformuler ou dupliquer les phrases déjà écrites.
- Poursuivre uniquement à partir du dernier élément du texte.
- Aérer la mise en forme : sauter une ligne entre chaque paragraphe.
- Réponds de manière complète et termine toutes les phrases. Ne coupe pas la génération avant la fin.
- Répond entièrement  en français , meme si le text original ne l'est pas.
`,
        temperature: 0.7,
        maxTokens: 1000,
    },

    correct: {
        name: "Corriger",
        instruction: `Tu est un expert en écriture de synthèse et lecture de contenu. tu vas recevoir un  texte écrite par un utilisateur. Ce texte peut contenir plusieurs données caractéristiques concernant la propriété à décrire ou developer.
        TÂCHE :
        - Corrige  les fautes d'orthographe.
        - Corrige  les fautes de  grammaire.
        - Corrige les fautes de syntaxes.

IMPORTANT :
- Ne change PAS le sens
- Ne change PAS le style
- Corrige seulement les erreurs
- Améliorer la clarté et la fluidité rédactionnelle si nécessaire
- Si pas d'erreur, retourne le texte tel quel sans rien ajouter
- Améliorer la clarté et la fluidité rédactionnelle
- Répond entièrement  en français , meme si le text original ne l'est pas.

`,
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
