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
    // editor?.chain().focus().insertContent(jsonNode).run();
    const { from, to } = editor.state.selection;
    const endCoords = editor.view.coordsAtPos(to);
    const startCoords = editor.view.coordsAtPos(from);
    const centerX = (startCoords.left + endCoords.right) / 2;
    console.log(centerX);
};
