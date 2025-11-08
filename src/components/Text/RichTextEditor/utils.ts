import { Editor } from "@tiptap/react";
import { AIActionsGenerate } from "./type";
import { ListRestart, RectangleEllipsis, SpellCheck } from "lucide-react";

type HandleAIActionArg = {
    editor: Editor;
    action: string;
};
export const handleAIAction = ({ editor, action }: HandleAIActionArg) => {
    const jsonNode = {
        type: "paragraph",
        content: [
            {
                type: "text",
                text: "Example Text",
            },
        ],
    };
    // editor?.chain().focus().insertContent(jsonNode).run();
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
        label: "Générer une description",
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
    accept: "askAi:accept",
    cancel: "askAi:cancel",
    clear: "askAi:clear",
};
