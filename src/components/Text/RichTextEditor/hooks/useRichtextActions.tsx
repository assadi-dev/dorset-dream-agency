"use client";
import { Editor } from "@tiptap/react";
import { Bold, Italic, List, ListOrdered, Redo, Undo } from "lucide-react";
import { RichTextButtonProps, RichTextHandlerName } from "../type";

type HeaderActionsButtonProps = { editor: Editor | null };
export const useHeaderActionsHandler = ({ editor }: HeaderActionsButtonProps) => {
    const actions = {
        bold: {
            icon: Bold,
            title: "Gras",
            handler: () => editor?.chain().focus().toggleBold().run(),
        },

        italic: {
            icon: Italic,
            title: "Italique",
            handler: () => editor?.chain().focus().toggleItalic().run(),
        },
        bulletList: {
            icon: List,
            title: "List",
            handler: () => editor?.chain().focus().toggleBulletList().run(),
        },
        orderedList: {
            icon: ListOrdered,
            title: "List ordonné",
            handler: () => editor?.chain().focus().toggleOrderedList().run(),
        },
        undo: {
            icon: Undo,
            title: "Annuler",
            handler: () => editor?.chain().focus().undo().run(),
        },
        redo: {
            icon: Redo,
            title: "Rétablir",
            handler: () => editor?.chain().focus().redo().run(),
        },
    } satisfies Record<RichTextHandlerName, RichTextButtonProps>;

    return { actions };
};
