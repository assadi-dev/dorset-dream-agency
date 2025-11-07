"use client";
import React from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { parseInitialDescription } from "@/app/(private)/tableau-de-board/gestion-des-biens-immobiliers/helpers";
import { cn } from "@/lib/utils";

type DescriptionPropertyProps = {
    description?: string | null;
};
const DescriptionProperty = ({ description }: DescriptionPropertyProps) => {
    const parseDescription = parseInitialDescription(description ?? "");

    const editor = useEditor({
        immediatelyRender: false,
        editable: false,
        extensions: [StarterKit],
        content: parseDescription,
    });

    const TEXT_STYLE_CLASS = `ProseMirror text-slate-500 my-3 break-words text-sm text-justify sm:text-left whitespace-pre-line rich-text-style`;
    return (
        <>
            <h2 className=" lg:text-2xl font-bold">Description</h2>
            <EditorContent
                editor={editor}
                className={cn(TEXT_STYLE_CLASS, "[&_p]:whitespace-pre-line [&_p]:break-words")}
            />
        </>
    );
};

export default DescriptionProperty;
