import CircularProgressWithLabelDemo, { CircularProgress } from "@/components/progress-08";
import { cn } from "@/lib/utils";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { AskAISchemaInfer } from "./schema";

type CharacterCountProps = { form: UseFormReturn<AskAISchemaInfer> };
const CharacterCount = ({ form }: CharacterCountProps) => {
    const textLength = form.watch("content")?.length ?? 0;
    const limit = textLength >= 200;
    return (
        <div
            className={cn("flex text-[0.70rem] text-slate-500 ", {
                "text-destructive": limit,
                "motion-preset-shake": limit,
            })}
        >
            {textLength}/<strong>200</strong>
        </div>
    );
};

export default CharacterCount;
