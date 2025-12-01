import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { Markdown, MarkdownOptions } from "tiptap-markdown-3";

export const MARKDOWN_CONFIGURE: MarkdownOptions = {
    html: true,
    tightLists: true,
    tightListClass: "tight",
    bulletListMarker: "-",
    linkify: true,
    breaks: true,
    transformPastedText: true,
    transformCopiedText: true,
};

export const TEXT_ALIGN_CONFIGURE = {
    types: ["heading", "paragraph"],
};

export const TEXT_UNDERLINE = {
    HTMLAttributes: {
        class: "text-underline",
    },
};

export const extensions = [
    StarterKit,
    Markdown.configure(MARKDOWN_CONFIGURE),
    TextAlign.configure(TEXT_ALIGN_CONFIGURE),
    Underline.configure(TEXT_UNDERLINE),
];
