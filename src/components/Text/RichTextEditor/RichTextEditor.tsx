"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ScrollArea } from "../../ui/scroll-area";
import HeaderRichtext from "./components/HeaderRichtext";
import { TiptapContent } from "./type";
import TextAlign from "@tiptap/extension-text-align";

interface RichTextEditorProps {
    content: string;
    onChange: (content: TiptapContent) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            TextAlign.configure({
                defaultAlignment: "left",
                types: ["heading", "paragraph"],
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4",
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            <HeaderRichtext editor={editor} />
            <ScrollArea className="max-h-[35vh]">
                <EditorContent editor={editor} className="bg-card" />
            </ScrollArea>
        </div>
    );
}
