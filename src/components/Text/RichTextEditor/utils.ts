import { Editor } from "@tiptap/react";

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
    editor?.chain().focus().insertContent(jsonNode).run();
};
