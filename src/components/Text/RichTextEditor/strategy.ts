import { Editor } from "@tiptap/react";
import { RichTextHandlerGroup, RichTextHandlerName } from "./type";

export const isActionSelected = (editor: Editor, action: RichTextHandlerName, group: RichTextHandlerGroup) => {
    const mapActions = {
        ["text-align"]: { handler: () => editor.isActive({ textAlign: action }) },
        ["word-format"]: { handler: () => editor.isActive(action) },
        ["list"]: { handler: () => editor.isActive(action) },
    };

    type ActionKeys = keyof typeof mapActions;
    return mapActions[group as ActionKeys]?.handler() ?? false;
};
