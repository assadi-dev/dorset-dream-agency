import { Editor } from "@tiptap/react";
import { RichTextHandlerGroup, RichTextHandlerName } from "./type";

export const isActionSelected = (editor: Editor, action: RichTextHandlerName, group: RichTextHandlerGroup) => {
    const mapActions = {
        ["text-align"]: { isActive: editor.isActive({ textAlign: action }) },
        ["word-format"]: { isActive: editor.isActive(action) },
        ["list"]: { isActive: editor.isActive(action) },
    };

    type ActionKeys = keyof typeof mapActions;
    return mapActions[group as ActionKeys]?.isActive ?? false;
};
