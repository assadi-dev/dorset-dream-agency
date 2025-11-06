"use client";
import React from "react";
import { Bold, Italic, List, ListOrdered, Trash2, Undo, Redo } from "lucide-react";
import { Button } from "../../../ui/button";
import { Editor } from "@tiptap/react";
import HeaderActionsButton, { HeaderActionSeparator } from "./HeaderActionsButton";
import { useHeaderActionsHandler } from "../hooks/useRichtextActions";
import { HeaderActionsHandlerReturn, RichTextHandlerGroup, RichTextHandlerName } from "../type";
import { isActionSelected } from "../strategy";

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
            {actions && <HeaderActionSeparator />}
            <HeaderActionsButton icon={Trash2} label="Vider" handler={clearContent} isSelected={false} />
        </div>
    );
};

export default HeaderRichtext;

const RowActionButtons = ({ actions, editor }: { actions: HeaderActionsHandlerReturn; editor: Editor }) => {
    const RowGroupActions = ({ group }: { group: RichTextHandlerGroup }) => {
        return Object.entries(actions)
            .filter(([_, v]) => v.group === group)
            .map(([key, item]) => {
                const isSelected = isActionSelected(editor, key as RichTextHandlerName, item.group) ?? false;
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
            <RowGroupActions group="word-format" />
            <HeaderActionSeparator />
            <RowGroupActions group="list" />
            <HeaderActionSeparator />
            <RowGroupActions group="text-align" />
            <HeaderActionSeparator />
            <RowGroupActions group="action" />
        </>
    );
};
