"use client";
import SubmitButton from "@/components/forms/SubmitButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Edit, Lock, Pen, Plus, PlusCircle, Trash, Unlink, Unlock } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldSchemaInfer, ReleaseFormInfer, releaseFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import { parseInitialDescription } from "../../../gestion-des-biens-immobiliers/helpers";
import { extensions } from "@/components/Text/RichTextEditor/extensions";
import { cn, wait } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import EmptyRelease from "./EmptyRelease";
import { Input } from "@/components/ui/input";

type ReleaseForm = {
    defaultValues?: Partial<ReleaseFormInfer>;
    onSubmit: (values: ReleaseFormInfer) => Promise<void>;
};
const ReleaseForm = ({ defaultValues, onSubmit }: ReleaseForm) => {
    const [isSubmitting, startSubmitting] = React.useTransition();

    const form = useForm<ReleaseFormInfer>({
        resolver: zodResolver(releaseFormSchema),
        defaultValues: {
            ...defaultValues,
        },
    });

    const handleSubmit: SubmitHandler<ReleaseFormInfer> = async (values) => {
        startSubmitting(async () => {
            try {
                await wait(1000);
                await onSubmit(values);
                ToastSuccessSonner("Texte release généré avec succès");
            } catch (error) {
                if (error instanceof Error) {
                    ToastErrorSonner("Erreur lors de la génération de texte de la release");
                }
            }
        });
    };

    const fieldsWatch = form.watch("fields");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex justify-between items-center mb-5 px-5">
                    <VersionInput form={form} />
                    <div className="flex justify-end items-center">
                        <SubmitButton isLoading={isSubmitting}>Enregistrer</SubmitButton>
                    </div>
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
                    {fieldsWatch.length === 0 ? (
                        <EmptyRelease />
                    ) : (
                        fieldsWatch.map((f) => <ReleaseFieldPreview key={f.id} field={f} />)
                    )}
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
            <div className="flex justify-between items-center mb-3 min-h-11">
                <p className="text-lg font-semibold ">{field.name}</p>
                <div className="hidden group-hover:flex group-hover:motion-preset-fade-lg justify-end gap-2">
                    <Button variant="outline" size="icon" type="button">
                        <Edit className="h-2 w-2" />
                    </Button>
                    <Button variant="destructive" size="icon" type="button">
                        <Trash className="h-2 w-2" />
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

export const VersionInput = ({ form }: { form: any }) => {
    const [state, dispatch] = React.useReducer((prev: any, next: any) => ({ ...prev, ...next }), {
        enabled: false,
        value: form.getValues("version") ?? "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch({ value });
    };

    const toggleEnableInput = () => {
        dispatch({ enabled: !state.enabled });
    };
    const handleClickValidate = () => {
        form.setValue("version", state.value);
        toggleEnableInput();
    };

    return (
        <div className="flex gap-2 items-center group">
            {state.enabled ? (
                <div className="">
                    <Input
                        value={state.value}
                        onChange={handleChange}
                        className="px-5 py-1 text-x"
                        placeholder="Numero de version"
                    />
                </div>
            ) : (
                <div>version : {form.watch("version")}</div>
            )}
            <div className="flex gap-1">
                {state.enabled ? (
                    <Button type="button" size="icon" variant="default" onClick={handleClickValidate}>
                        <Check className="h-2 w-2" />
                    </Button>
                ) : (
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={toggleEnableInput}
                        className="hidden group-hover:flex"
                    >
                        <Pen className="h-2 w-2" />
                    </Button>
                )}
            </div>
        </div>
    );
};
