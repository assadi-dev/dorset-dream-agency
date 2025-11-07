"use client";
import React from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type DescriptionPropertyProps = {
    description?: string | null;
};
const DescriptionProperty = ({ description }: DescriptionPropertyProps) => {
    const editor = useEditor({
        immediatelyRender: false,
        editable: false,
        extensions: [StarterKit],
        content: JSON.parse(description ?? ""),
    });

    const TEXT_STYLE_CLASS = `ProseMirror text-slate-500 my-3 break-words text-sm text-justify sm:text-left whitespace-pre-line rich-text-style`;
    return (
        <>
            <h2 className=" lg:text-2xl font-bold">Description</h2>
            <EditorContent editor={editor} className={TEXT_STYLE_CLASS} />
        </>
    );
};

export default DescriptionProperty;
