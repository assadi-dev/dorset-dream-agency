"use client";
import React from "react";
import { Bold, Italic, List, ListOrdered, Trash2, Undo, Redo } from "lucide-react";
import { Button } from "../../../ui/button";
import { Editor } from "@tiptap/react";
import HeaderActionsButton from "./HeaderActionsButton";
import { useHeaderActionsHandler } from "../hooks/useRichtextActions";
import { HeaderActionsHandlerReturn } from "../type";

type HeaderRichtextProps = {
    editor: Editor | null;
};
const HeaderRichtext = ({ editor }: HeaderRichtextProps) => {
    const { actions } = useHeaderActionsHandler({ editor });

    if (!editor) return null;

    const clearContent = () => {
        editor.chain().focus().clearContent().run();
    };

    return (
        <div className="flex gap-1 p-2 border-b bg-muted/30">
            {actions && <RowActionButtons actions={actions} editor={editor} />}
            <HeaderActionsButton icon={Trash2} label="Vider" handler={clearContent} isSelected={false} />
        </div>
    );
};

export default HeaderRichtext;

const RowActionButtons = ({ actions, editor }: { actions: HeaderActionsHandlerReturn; editor: Editor }) => {
    const RowTextActions = () => {
        return Object.entries(actions)
            .filter(([k, v]) => v.group == "text")
            .map(([key, item]) => {
                const isSelected = editor.isActive(key) ?? false;
                return (
                    <HeaderActionsButton
                        key={key}
                        icon={item.icon}
                        label={item.title}
                        handler={item.handler}
                        isSelected={isSelected}
                    />
                );
            });
    };

    return (
        <>
            <RowTextActions />
        </>
    );
};
