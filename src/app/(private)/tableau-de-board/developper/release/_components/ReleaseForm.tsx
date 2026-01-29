"use client";
import SubmitButton from "@/components/forms/SubmitButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Plus, PlusCircle, Trash } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { FieldSchemaInfer, ReleaseFormInfer, releaseFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import { parseInitialDescription } from "../../../gestion-des-biens-immobiliers/helpers";
import { extensions } from "@/components/Text/RichTextEditor/extensions";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type ReleaseForm = {
    defaultValues: Partial<ReleaseFormInfer>;
};
const ReleaseForm = ({ defaultValues }: ReleaseForm) => {
    const form = useForm<ReleaseFormInfer>({
        resolver: zodResolver(releaseFormSchema),
        defaultValues: {
            ...defaultValues,
            fields: [
                {
                    id: "123456",
                    name: "✨ Nouvelles fonctionnalités",
                    value: "- Ajout de l'action dupliquer dans la page gestion des biens immobiliers \n - Affichage des variantes au clique sur les noms de biens immo ",
                },
            ],
        },
    });

    const fieldsWatch = form.watch("fields");

    return (
        <Form {...form}>
            <form>
                <div className="flex justify-end items-center mb-5 px-5">
                    <SubmitButton isLoading={true} type="button">
                        Enregistrer
                    </SubmitButton>
                </div>
                <Button
                    variant="link"
                    type="button"
                    className="relative py-2 px-11 group  rounded-lg p-3 flex gap-2 items-center text-xs lg:text-sm active:opacity-50 "
                >
                    <PlusCircle className="h-4 w-4" />

                    <span>Ajouter une entrée</span>
                </Button>
                <ScrollArea className="flex flex-col gap-3 h-[55vh] p-5 rounded-lg">
                    {fieldsWatch.map((f) => (
                        <ReleaseFieldPreview key={f.id} field={f} />
                    ))}
                </ScrollArea>
            </form>
        </Form>
    );
};

export default ReleaseForm;

export const ReleaseFieldPreview = ({ field }: { field: FieldSchemaInfer }) => {
    const parseDescription = parseInitialDescription(field.value ?? "");
    const TEXT_STYLE_CLASS = `ProseMirror text-slate-500 my-3 break-words text-sm text-justify sm:text-left whitespace-pre-line rich-text-style`;

    const editor = useEditor({
        immediatelyRender: false,
        editable: false,
        extensions: extensions,
        content: parseDescription,
    });
    return (
        <Card className="mb-3 p-3 relative group">
            <div className="flex justify-between items-center mb-3">
                <p className="text-lg font-semibold ">{field.name}</p>
                <div className="flex group-hover:flex group-hover:motion-preset-fade-lg justify-end gap-2">
                    <Button variant="outline" size="icon">
                        <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="destructive" size="icon">
                        <Trash className="h-3 w-3" />
                    </Button>
                </div>
            </div>
            <div className="border bg-secondary px-3 py-1 rounded-lg">
                <EditorContent
                    editor={editor}
                    className={cn(TEXT_STYLE_CLASS, "[&_p]:whitespace-pre-line [&_p]:break-words")}
                />
            </div>
        </Card>
    );
};
