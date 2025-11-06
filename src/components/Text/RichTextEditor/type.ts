import { LucidIconProps } from "@/types/global";
import { DocumentType, Editor, MarkType, NodeType, TextType } from "@tiptap/react";

export type RichTextButtonTitle = "Gras" | "Italique" | "List" | "List ordonné" | "Vider" | "Annuler" | "Rétablir";

export type RichTextHandlerName = "bold" | "italic" | "bulletList" | "orderedList" | "undo" | "redo";
export type RichTextHandlerGroup = "text" | "list" | "action" | "other" | "file";

export type RichTextButtonProps = {
    icon: LucidIconProps;
    title: RichTextButtonTitle;
    handler: () => void;
    group: RichTextHandlerGroup;
};

export type HeaderActionsHandlerReturn = Record<RichTextHandlerName, RichTextButtonProps>;

export type TiptapContent =
    | DocumentType<
          Record<string, any> | undefined,
          NodeType<
              string,
              Record<string, any> | undefined,
              any,
              (NodeType<any, any, any, any> | TextType<MarkType<any, any>>)[]
          >[]
      >
    | string;
