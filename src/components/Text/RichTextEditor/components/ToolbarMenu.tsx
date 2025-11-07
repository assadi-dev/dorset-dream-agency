"use client";
import React from "react";
import { Bold, Italic, List, ListOrdered, Trash2, Undo, Redo } from "lucide-react";
import { Button } from "../../../ui/button";
import { Editor } from "@tiptap/react";
import HeaderActionsButton, { HeaderActionSeparator } from "./HeaderActionsButton";
import { useHeaderActionsHandler } from "../hooks/useRichtextActions";
import { HeaderActionsHandlerReturn, RichTextHandlerGroup, RichTextHandlerName } from "../type";
import { isActionSelected } from "../strategy";
import AskAiButton from "./askAiButton";

type ToolbarMenuProps = {
    editor: Editor | null;
};
const ToolbarMenu = ({ editor }: ToolbarMenuProps) => {
    const { actions } = useHeaderActionsHandler({ editor });

    if (!editor) return null;

    const clearContent = () => {
        editor.chain().focus().clearContent().run();
    };

    return (
        <div className="flex gap-1 p-2 border-b bg-muted/30 items-center">
            <div className="flex gap-1 items-center">
                {actions && <RowActionButtons actions={actions} editor={editor} />}
                {actions && <HeaderActionSeparator />}
                <HeaderActionsButton icon={Trash2} label="Vider" handler={clearContent} isSelected={false} />
            </div>
            <div className="flex-1 flex justify-end items-center">
                <RowGroupActions group="undoRedo" editor={editor} actions={actions} />
            </div>
        </div>
    );
};

export default ToolbarMenu;

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
            <AskAiButton editor={editor} />
            <HeaderActionSeparator />
            <RowGroupActions group="word-format" editor={editor} actions={actions} />
            <HeaderActionSeparator />
            <RowGroupActions group="list" editor={editor} actions={actions} />
            <HeaderActionSeparator />
            <RowGroupActions group="text-align" editor={editor} actions={actions} />
        </>
    );
};
