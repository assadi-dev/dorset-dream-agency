import { Editor } from "@tiptap/react";
import { AIActionsGenerate } from "./type";
import { ListRestart, RectangleEllipsis, SpellCheck } from "lucide-react";
import { wait } from "@/lib/utils";

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

export const AI_ACTIONS_VALUES = { generate: "generate", rephrase: "rephrase", correct: "correct" };

export const aiActionsGenerate: AIActionsGenerate[] = [
    {
        label: "Générer une description",
        value: AI_ACTIONS_VALUES.generate,
        icon: RectangleEllipsis,
    },
    {
        label: "Reformuler",
        value: AI_ACTIONS_VALUES.rephrase,
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

export const fetchAiApi = (data: { action: string; text: string }, signaling: AbortSignal) => {
    try {
        const res = fetch("/api/ai-action/generate", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            signal: signaling,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(`An error is occur in fetchAiApi ${error.message}`);
        }
    }
};

export const fetchAiApiMock = async (data: { action: string; text: string }, signaling: AbortSignal) => {
    let timeout: NodeJS.Timeout;

    return new Promise((resolve) => {
        const response = {
            success: true,
            originalText: data.text,
            transformedText:
                " Titre : Maison exceptionnelle de 25 m² avec une remarquable commodité - 1 parking, 1 salle de bain\n\nDescription :\n\nDécouvrez cette magnifique maison de 25 m², située dans un quartier sécurisé et agréable. Cette propriété offre une excellente commodité avec son espace intérieur bien organisé et son parking privé.\n\nLa maison se distingue par sa belle architecture contemporaine et ses finitions de qualité. L'espace ouvert, lumineux et fonctionnel est idéal pour les activités quotidiennes et la vie familiale.\n\nLe sol en parquet et les murs blancs donnent un aspect élégant à l'intérieur. La cuisine moderne est équipée de tout ce dont vous avez besoin, tandis que le sal",
            action: data.action,
            model: "mistral:7b",
        };

        signaling.addEventListener("abort", () => {
            clearTimeout(timeout);

            signaling.removeEventListener("abort", () => {});
            throw new Error("Canceled");
        });

        timeout = setTimeout(() => {
            signaling.removeEventListener("abort", () => {});
            clearTimeout(timeout);
            resolve(response);
        }, 3500);
    });
};
