import React from "react";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import HeaderActionsButton from "./HeaderActionsButton";
import { RichTextHandlerGroup, RichTextHandlerName } from "../type";
import { useHeaderActionsHandler } from "../hooks/useRichtextActions";
import { isActionSelected } from "../strategy";
import { AskAiBubleAction } from "./AskAIButton/AskAiButton";

type BubbleMenuRowProps = {
    editor: Editor;
};
const BubbleMenuRow = ({ editor }: BubbleMenuRowProps) => {
    const BubbleMenuRef = React.useRef<any>();

    return (
        <BubbleMenu ref={BubbleMenuRef} editor={editor} options={{ placement: "top", offset: 8, flip: true }}>
            <div className="flex gap-1  border rounded shadow bg-white px-3 py-1.5 ">
                {BubbleMenuRef.current && <AskAiBubleAction editor={editor} bubbleMenuRef={BubbleMenuRef.current} />}
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
