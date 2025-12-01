/**
 * Types pour le mock LLM
 */
export interface LLMStreamOptions {
    prompt: string;
    signal?: AbortSignal;
    onChunk?: (chunk: string, fullText: string) => void;
    onComplete?: (fullText: string) => void;
    onError?: (error: Error) => void;
}

export interface OllamaChunk {
    model: string;
    created_at: string;
    response: string;
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

export interface OllamaStreamOptions {
    model?: string;
    prompt: string;
    signal?: AbortSignal;
    onChunk?: (chunk: OllamaChunk, fullText: string) => void;
    onComplete?: (fullText: string, metadata: OllamaFinalMessage) => void;
    onError?: (error: Error) => void;
}

/**
 * Réponses mockées basées sur des mots-clés
 */
const MOCK_RESPONSES: Record<string, string> = {
    résumer:
        "Voici un résumé concis du texte : Les points principaux incluent l'importance de la clarté, la structure logique et l'engagement du lecteur. Le document met en avant trois aspects essentiels qui permettent d'améliorer significativement la qualité de l'écriture.",

    corriger:
        "J'ai corrigé les erreurs grammaticales et orthographiques. Voici la version améliorée : Le texte est maintenant plus fluide et professionnel. Les fautes de frappe ont été éliminées et la ponctuation ajustée pour une meilleure lisibilité.",

    améliorer:
        "Voici une version améliorée de votre texte : J'ai enrichi le vocabulaire, restructuré certaines phrases pour plus de clarté, et ajouté des transitions pour fluidifier la lecture. Le ton est maintenant plus engageant et professionnel.",

    traduire:
        "Here is the translation: This text has been carefully translated while preserving the original meaning and tone. The structure has been adapted to sound natural in English.",

    expliquer:
        "Laissez-moi vous expliquer ce concept : En termes simples, il s'agit d'un processus qui permet de transformer des données brutes en informations exploitables. Cela implique plusieurs étapes clés : la collecte, le traitement, l'analyse et la présentation des résultats.",

    continuer:
        "Pour continuer ce texte : Les implications de cette découverte sont nombreuses et touchent plusieurs domaines. D'une part, cela ouvre de nouvelles perspectives de recherche. D'autre part, les applications pratiques pourraient révolutionner notre approche actuelle.",

    default:
        "Voici ma réponse à votre demande : J'ai analysé votre texte et je peux vous proposer plusieurs améliorations. Tout d'abord, la structure pourrait être optimisée. Ensuite, certains passages mériteraient d'être développés pour plus de clarté. Enfin, le style pourrait être harmonisé pour une meilleure cohérence d'ensemble.",
};

/**
 * Fonction utilitaire pour les délais avec support d'annulation
 */
function delay(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        // Vérifier si déjà annulé
        if (signal?.aborted) {
            reject(new Error("Canceled"));
            return;
        }

        const timeout = setTimeout(resolve, ms);

        // Écouter l'événement d'annulation
        const onAbort = () => {
            clearTimeout(timeout);
            reject(new Error("Canceled"));
        };

        signal?.addEventListener("abort", onAbort);

        // Nettoyer l'écouteur après le délai
        setTimeout(() => {
            signal?.removeEventListener("abort", onAbort);
        }, ms);
    });
}

/**
 * Détermine la réponse appropriée basée sur le prompt
 */
function getResponseForPrompt(prompt: string): string {
    const promptLower = prompt.toLowerCase();

    for (const [key, value] of Object.entries(MOCK_RESPONSES)) {
        if (promptLower.includes(key)) {
            return value;
        }
    }

    return MOCK_RESPONSES.default;
}

/**
 * Mock qui simule le streaming d'une réponse LLM (Mistral/Ollama)
 */
export async function mockLLMStream({ prompt, signal, onChunk, onComplete, onError }: LLMStreamOptions): Promise<void> {
    const response = getResponseForPrompt(prompt);

    try {
        // Vérifier si déjà annulé avant de commencer
        if (signal?.aborted) {
            throw new Error("Canceled");
        }

        // Délai de 3 secondes avant de commencer le fetch
        await delay(3000, signal);

        // Simuler un délai initial supplémentaire (temps de traitement du modèle)
        await delay(300 + Math.random() * 300, signal);

        // Découper la réponse en mots
        const words = response.split(" ");
        let fullResponse = "";

        // Streamer chaque mot avec un délai aléatoire
        for (let i = 0; i < words.length; i++) {
            // Vérifier l'annulation à chaque itération
            if (signal?.aborted) {
                throw new Error("Canceled");
            }

            const word = words[i];
            const chunk = i === 0 ? word : " " + word;
            fullResponse += chunk;

            // Appeler le callback avec le chunk
            if (onChunk) {
                onChunk(chunk, fullResponse);
            }

            // Délai variable pour simuler le streaming réaliste
            const baseDelay = 30;
            const wordLengthFactor = word.length * 5;
            const randomFactor = Math.random() * 20;

            await delay(baseDelay + wordLengthFactor + randomFactor, signal);
        }

        // Appeler le callback de complétion
        if (onComplete) {
            onComplete(fullResponse);
        }
    } catch (error) {
        if (onError) {
            onError(error instanceof Error ? error : new Error(String(error)));
        } else {
            // Re-throw si pas de handler d'erreur
            throw error;
        }
    }
}

/**
 * Version alternative qui simule le format de réponse d'Ollama
 */
export async function mockOllamaStream({
    model = "mistral",
    prompt,
    signal,
    onChunk,
    onComplete,
    onError,
}: OllamaStreamOptions): Promise<void> {
    const response = getResponseForPrompt(prompt);

    try {
        // Vérifier si déjà annulé
        if (signal?.aborted) {
            throw new Error("Canceled");
        }

        // Délai de 3 secondes avant de commencer
        await delay(3000, signal);

        // Délai initial supplémentaire
        await delay(400, signal);

        const words = response.split(" ");
        let fullResponse = "";
        let totalTokens = 0;

        for (let i = 0; i < words.length; i++) {
            // Vérifier l'annulation
            if (signal?.aborted) {
                throw new Error("Canceled");
            }

            const word = words[i];
            const chunk = i === 0 ? word : " " + word;
            fullResponse += chunk;
            totalTokens++;

            // Format similaire à Ollama
            const ollamaChunk: OllamaChunk = {
                model: model,
                created_at: new Date().toISOString(),
                response: chunk,
                done: false,
            };

            if (onChunk) {
                onChunk(ollamaChunk, fullResponse);
            }

            await delay(40 + Math.random() * 30, signal);
        }

        // Message final avec métadonnées
        const finalMessage: OllamaFinalMessage = {
            model: model,
            created_at: new Date().toISOString(),
            response: "",
            done: true,
            total_duration: Math.floor(Math.random() * 2000000000 + 1000000000),
            load_duration: Math.floor(Math.random() * 100000000),
            prompt_eval_count: prompt.split(" ").length,
            prompt_eval_duration: Math.floor(Math.random() * 500000000),
            eval_count: totalTokens,
            eval_duration: Math.floor(Math.random() * 1500000000 + 500000000),
        };

        if (onComplete) {
            onComplete(fullResponse, finalMessage);
        }
    } catch (error) {
        if (onError) {
            onError(error instanceof Error ? error : new Error(String(error)));
        } else {
            throw error;
        }
    }
}

/**
 * Simule un appel HTTP streaming (comme fetch avec ReadableStream)
 */
export async function mockStreamingFetch(prompt: string, signal?: AbortSignal): Promise<Response> {
    const response = getResponseForPrompt(prompt);

    // Créer un ReadableStream mock
    const stream = new ReadableStream({
        async start(controller) {
            try {
                // Vérifier l'annulation
                if (signal?.aborted) {
                    controller.error(new Error("Canceled"));
                    return;
                }

                // Délai de 3 secondes
                await delay(3000, signal);

                const words = response.split(" ");

                for (let i = 0; i < words.length; i++) {
                    // Vérifier l'annulation à chaque itération
                    if (signal?.aborted) {
                        controller.error(new Error("Canceled"));
                        return;
                    }

                    const word = words[i];
                    const chunk = i === 0 ? word : " " + word;

                    controller.enqueue(new TextEncoder().encode(chunk));
                    await delay(50 + Math.random() * 30, signal);
                }

                controller.close();
            } catch (error) {
                controller.error(error);
            }
        },
    });

    return new Response(stream);
}
