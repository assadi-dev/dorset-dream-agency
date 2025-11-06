import { LucidIconProps } from "@/types/global";
import { Editor } from "@tiptap/react";

export type RichTextButtonTitle = "Gras" | "Italique" | "List" | "List ordonné" | "Vider" | "Annuler" | "Rétablir";

export type RichTextHandlerName = "bold" | "italic" | "bulletList" | "orderedList" | "undo" | "redo";
export type RichTextHandlerGroup = "text" | "list" | "action" | "other" | "file";

export type RichTextButtonProps = {
    icon: LucidIconProps;
    title: RichTextButtonTitle;
    handler: () => void;
    group: RichTextHandlerGroup;
};

export type HeaderActionsHandlerReturn = Record<RichTextHandlerName, RichTextButtonProps>;
