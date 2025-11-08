import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { Send, SparklesIcon } from "lucide-react";
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

type AIPromptInputProps = {
    editor: Editor;
};
const AIPromptInput = ({ editor }: AIPromptInputProps) => {
    const form = useForm<AskAISchemaInfer>({
        resolver: zodResolver(askAISchema),
        defaultValues: {
            selected: null,
            content: "",
        },
    });
    const {
        formState: { errors },
    } = form;

    const submitAction: SubmitHandler<AskAISchemaInfer> = async (values) => {
        if (errors.content || errors.selected) return;

        console.log(values);
        dispatchEvent(AskAICustomEvent.close, null);
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
        <div className="w-2/3 left-1/2 translate-x-[-50%] mx-auto rounded-lg shadow-lg bg-white border  absolute bottom-5  p-1  text-sm text-slate-500 motion-preset-slide-up-sm motion-duration-300 ">
            <form>
                <div className="">
                    <textarea
                        className={cn("px-2 pt-2 text-sm rounded-md resize-none w-full outline-none ", errorStyle)}
                        id="content"
                        placeholder="Demander à l'IA ce que vous voulez faire"
                        {...form.register("content")}
                    ></textarea>
                </div>
                <div className="grid grid-cols-2 pr-3">
                    <div>
                        <AISelectPromptAction
                            editor={editor}
                            error={errors.selected ? true : false}
                            onSelected={selectAction}
                        />{" "}
                    </div>
                    <Button
                        type="button"
                        className="justify-self-end"
                        variant={"ghost"}
                        size={"icon"}
                        onClick={form.handleSubmit(submitAction)}
                    >
                        <Send className="h-4 w-4" />{" "}
                    </Button>
                </div>
            </form>
        </div>
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
            <DropdownMenuContent align="start" className="w-[25vw]">
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
