"use client";
import { Editor } from "@tiptap/react";
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Italic,
    List,
    ListOrdered,
    Redo,
    Undo,
} from "lucide-react";
import { RichTextButtonProps, RichTextHandlerName } from "../type";

type HeaderActionsButtonProps = { editor: Editor | null };
export const useHeaderActionsHandler = ({ editor }: HeaderActionsButtonProps) => {
    const actions = {
        bold: {
            icon: Bold,
            title: "Gras",
            handler: () => editor?.chain().focus().toggleBold().run(),
            group: "word-format",
        },

        italic: {
            icon: Italic,
            title: "Italique",
            handler: () => editor?.chain().focus().toggleItalic().run(),
            group: "word-format",
        },
        left: {
            icon: AlignLeft,
            title: "Alignement  à gauche",
            handler: () => editor?.chain().focus().setTextAlign("left").run(),
            group: "text-align",
        },
        center: {
            icon: AlignCenter,
            title: "Centrer",
            handler: () => editor?.chain().focus().setTextAlign("center").run(),
            group: "text-align",
        },
        right: {
            icon: AlignRight,
            title: "Alignement à droite",
            handler: () => editor?.chain().focus().setTextAlign("right").run(),
            group: "text-align",
        },
        justify: {
            icon: AlignJustify,
            title: "Justifier",
            handler: () => editor?.chain().focus().setTextAlign("justify").run(),
            group: "text-align",
        },
        bulletList: {
            icon: List,
            title: "List",
            handler: () => editor?.chain().focus().toggleBulletList().run(),
            group: "list",
        },
        orderedList: {
            icon: ListOrdered,
            title: "List ordonné",
            handler: () => editor?.chain().focus().toggleOrderedList().run(),
            group: "list",
        },
        undo: {
            icon: Undo,
            title: "Annuler",
            handler: () => editor?.chain().focus().undo().run(),
            group: "action",
        },
        redo: {
            icon: Redo,
            title: "Rétablir",
            handler: () => editor?.chain().focus().redo().run(),
            group: "action",
        },
    } satisfies Record<RichTextHandlerName, RichTextButtonProps>;

    return { actions };
};
