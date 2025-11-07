import React from "react";
import { Editor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Card } from "@/components/ui/card";
import HeaderActionsButton from "./HeaderActionsButton";
import { RichTextHandlerGroup, RichTextHandlerName } from "../type";
import { useHeaderActionsHandler } from "../hooks/useRichtextActions";
import { isActionSelected } from "../strategy";

type BubbleMenuProps = {
    editor: Editor;
};
const BubbleMenuRow = ({ editor }: BubbleMenuProps) => {
    return (
        <BubbleMenu editor={editor} options={{ placement: "top", offset: 8, flip: true }}>
            <div className="flex gap-1  border rounded shadow bg-white px-3 py-1.5 ">
                <RowGroupActions group="word-format" editor={editor} />

                <RowGroupActions group="list" editor={editor} />

                <RowGroupActions group="text-align" editor={editor} />
            </div>
        </BubbleMenu>
    );
};

export default BubbleMenuRow;

const RowGroupActions = ({ group, editor }: { group: RichTextHandlerGroup; editor: Editor }) => {
    const { actions } = useHeaderActionsHandler({ editor });

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
