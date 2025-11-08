"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { TiptapContent } from "./type";
import TextAlign from "@tiptap/extension-text-align";
import BubbleMenuRow from "./components/BubbleMenu";
import ToolbarMenu from "./components/ToolbarMenu";
import AIPromptInput from "./components/AskAIButton/AIPromptInput";
import useControlAskAIMenu from "./hooks/useControlAskAIMenu";
import AskAiFetching from "./components/AskAIButton/AskAiFetching";

interface RichTextEditorProps {
    content: TiptapContent | null;
    onChange: (content: TiptapContent | null) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-full  focus:outline-none min-h-[300px] px-4",
            },
        },
    });

    const { isOpen, isFetching, text } = useControlAskAIMenu({ editor });

    if (!editor) {
        return null;
    }

    return (
        <div className="border rounded-lg overflow-hidden relative">
            <ToolbarMenu editor={editor} />
            <ScrollArea className="h-[45vh] pb-2">
                <BubbleMenuRow editor={editor} />
                <EditorContent editor={editor} className="bg-card cursor-text relative" />
                {isOpen && <AIPromptInput editor={editor} text={text} />}
                {isFetching && <AskAiFetching />}

                <ScrollBar className="h-0.5" orientation="vertical" />
            </ScrollArea>
        </div>
    );
}
