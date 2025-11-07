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

export const RowGroupActions = ({
    group,
    actions,
    editor,
}: {
    editor: Editor;
    group: RichTextHandlerGroup;
    actions: HeaderActionsHandlerReturn;
}) => {
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

export const RowActionButtons = ({ actions, editor }: { actions: HeaderActionsHandlerReturn; editor: Editor }) => {
    return (
        <>
            <RowGroupActions group="word-format" editor={editor} actions={actions} />
            <HeaderActionSeparator />
            <RowGroupActions group="list" editor={editor} actions={actions} />
            <HeaderActionSeparator />
            <RowGroupActions group="text-align" editor={editor} actions={actions} />
            <HeaderActionSeparator />
            <RowGroupActions group="action" editor={editor} actions={actions} />
        </>
    );
};
