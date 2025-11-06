"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import React from "react";
import { Editor } from "@tiptap/react";

type TextSizeSelector = {
    editor: Editor | null;
};
const TextSizeSelector = ({ editor }: TextSizeSelector) => {
    if (!editor) {
        return null;
    }

    const activeHeading = (length: number) => {
        for (let i = 1; i > length; i++) {
            if (editor.isActive("heading", { level: i })) return `${i}`;
        }
    };

    const getHeadingLevel = () => {
        activeHeading(6);
        return "normal";
    };
    return <div></div>;
};

export default TextSizeSelector;
