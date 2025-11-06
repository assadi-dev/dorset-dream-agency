"use client";
import React from "react";
import { Bold, Italic, List, ListOrdered, Trash2, Undo, Redo } from "lucide-react";
import { Button } from "../../ui/button";
import { Editor } from "@tiptap/react";

type HeaderRichtextProps = {
    editor: Editor | null;
};
const HeaderRichtext = ({ editor }: HeaderRichtextProps) => {
    if (!editor) return null;

    const clearContent = () => {
        editor.chain().focus().clearContent().run();
    };

    return (
        <div className="flex gap-1 p-2 border-b bg-muted/30">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "bg-muted" : ""}
            >
                <Bold className="h-4 w-4" />
            </Button>
            <HeaderActionSeparator />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "bg-muted" : ""}
            >
                <Italic className="h-4 w-4" />
            </Button>
            <HeaderActionSeparator />

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "bg-muted" : ""}
            >
                <List className="h-4 w-4" />
            </Button>
            <HeaderActionSeparator />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "bg-muted" : ""}
            >
                <ListOrdered className="h-4 w-4" />
            </Button>
            <HeaderActionSeparator />
            <Button type="button" variant="ghost" size="sm" onClick={clearContent} title="Nettoyer le texte">
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default HeaderRichtext;

export const HeaderActionSeparator = () => {
    return <div className="h-6 w-px bg-border mx-1" />;
};
