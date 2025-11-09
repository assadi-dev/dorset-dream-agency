import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { ArrowUp, Send, SparklesIcon } from "lucide-react";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { aiActionsGenerate, AskAICustomEvent } from "../../utils";
import { AIActionsGenerate } from "../../type";
import { cn } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { askAISchema, AskAISchemaInfer } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { dispatchEvent } from "@/lib/event";
import useAskAIEvent from "../../hooks/useAskAIEvent";
import AskAiCard from "./AskAiCard";

type AIPromptInputProps = {
    editor: Editor;
    text?: string | null;
};
const AIPromptInput = ({ text, editor }: AIPromptInputProps) => {
    return (
        <AskAiCard>
            <AskAiForm editor={editor} defaultValues={{ content: text ?? "" }} />
        </AskAiCard>
    );
};

export default AIPromptInput;

export const AISelectPromptAction = ({
    error,
    onSelected,
}: AIPromptInputProps & { error: boolean; onSelected?: (value: AIActionsGenerate | null) => void }) => {
    const ItemHoverStyle = "hover:bg-primary hover:text-primary-foreground text-sm";
    const [value, setValue] = React.useState<AIActionsGenerate | null>(null);

    const handleSelect = (item: AIActionsGenerate) => {
        onSelected && onSelected(item);
        setValue(item);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={cn({ border: error, "border-destructive": error })}>
                <Button variant="ghost" size={"sm"} className="flex items-center">
                    {value ? <SelectedAction action={value} /> : <Placeholder />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-[25vw]">
                {aiActionsGenerate.map((v) => {
                    const Icon = v.icon;
                    return (
                        <DropdownMenuItem key={v.value} className={ItemHoverStyle} onClick={() => handleSelect(v)}>
                            <Icon className="h-4 w-4 mr-1" />
                            {v.label}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const Placeholder = () => (
    <>
        <SparklesIcon className="h-1.5 w-1.5" /> Actions
    </>
);
export const SelectedAction = ({ action }: { action: AIActionsGenerate }) => {
    const Icon = action.icon;
    return (
        <>
            <Icon className="h-4 w-4 mr-1" /> {action.label}
        </>
    );
};

export const AskAiForm = ({ editor, defaultValues }: { editor: Editor; defaultValues: AskAISchemaInfer }) => {
    const formNodeRef = React.useRef<HTMLFormElement | null>(null);
    const form = useForm<AskAISchemaInfer>({
        resolver: zodResolver(askAISchema),
        defaultValues: {
            ...defaultValues,
            selected: null,
        },
    });

    const {
        formState: { errors },
    } = form;
    useAskAIEvent({ element: formNodeRef.current, editor, form });

    const submitAction: SubmitHandler<AskAISchemaInfer> = async (values) => {
        if (errors.content || errors.selected) return;
        dispatchEvent(AskAICustomEvent.fetching, { action: values.selected, prompt: values.content });
    };

    const selectAction = (action: AIActionsGenerate | null) => {
        if (!action) return;
        form.setValue("selected", action.value);
    };

    const errorStyle = {
        border: errors.content ? true : false,
        "border-destructive": errors.content ? true : false,
    } as const;

    return (
        <form ref={formNodeRef}>
            <div className="max-h-[15vh]">
                <textarea
                    className={cn(
                        "ai-chat-textarea",
                        "px-2 pt-2 text-sm rounded-md resize-none w-full outline-none",
                        errorStyle,
                    )}
                    id="content"
                    placeholder=" Demander à l'IA ce que vous voulez faire"
                    {...form.register("content")}
                ></textarea>
            </div>
            <div className="grid grid-cols-2 pr-3 bg-white">
                <div>
                    <AISelectPromptAction
                        editor={editor}
                        error={errors.selected ? true : false}
                        onSelected={selectAction}
                    />{" "}
                </div>
                <Button
                    type="button"
                    className="justify-self-end rounded-full "
                    variant={"ghost"}
                    size={"icon"}
                    onClick={form.handleSubmit(submitAction)}
                >
                    <ArrowUp className="h-4 w-4" />{" "}
                </Button>
            </div>
        </form>
    );
};
