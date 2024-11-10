"use client";
import FormFieldInput from "@/components/forms/FormFieldInput";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import useModalState from "@/hooks/useModalState";
import { cn } from "@/lib/utils";
import { ImagePlus, Trash2 } from "lucide-react";
import React from "react";
import { FieldValues, SubmitHandler, useForm, useFormContext, UseFormReturn } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import uniqid from "uniqid";
import PreviewVarianteUpload from "./PreviewVarianteUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { variantSchema } from "./propertySchema";
import { GalleryResponse } from "../../../types";

export type UploadZoneForm = {
    name: string;
    files: Array<File> | Array<GalleryResponse>;
};

export type VariantPayload = { name: string; gallery: GalleryResponse[] };

const UploadZoneVariant = () => {
    const form = useForm<UploadZoneForm>({
        resolver: zodResolver(variantSchema),
        defaultValues: {
            name: "",
            files: [],
        },
    });

    const { payload } = useModalState();

    React.useEffect(() => {
        if (payload && form) {
            const defaultValues = payload as VariantPayload;
            form.setValue("name", defaultValues?.name);
            form.setValue("files", defaultValues?.gallery);
        }
    }, [payload, form]);

    const { closeModal } = useModalState();
    const propertyForm = useFormContext();

    const submitVariant: SubmitHandler<UploadZoneForm> = async (values) => {
        const currentVariant = propertyForm.getValues("variants");
        const variant = {
            id: uniqid(),
            name: values.name,
            files: values.files,
        };

        const addVariant = [variant, ...currentVariant];
        propertyForm.setValue("variants", addVariant);
        closeModal();
    };

    const onDrop = React.useCallback((acceptedFiles: Array<File>) => {
        // Do something with the files
        form.setValue("files", acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const CLASS_DRAG_ACTIVE = isDragActive ? "border-cyan-600 bg-cyan-200 transition text-cyan-600" : "";
    const DROPZONE_TEXT = isDragActive ? "Vous pouvez lâcher" : "Cliquez ou glissez vos photos ici";

    /*   
    Récupération des fichier par copier collé
     const handlePast = async (event: React.ClipboardEvent) => {
        event.preventDefault();
        if (!event.clipboardData.files.length) {
            return;
        }
        const acceptedFiles: Array<File> = [];
        for (const file of event.clipboardData.files) {
            const fileObject = await file;
            acceptedFiles.push(fileObject);
        }

        form.setValue("files", acceptedFiles);
    }; */

    const clearAllFile = () => {
        form.setValue("files", []);
        form.clearErrors();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitVariant)}
                className="w-[32vw] p-3 min-h-[25vh] flex flex-col justify-between gap-3"
                /*  onPaste={handlePast} */
            >
                <FormFieldInput
                    control={form.control}
                    name="name"
                    label="Nom"
                    placeholder="Ex: Aqua Turquoise,Aqua Violet"
                />

                <div className="Dropzone-presentation">
                    <div
                        {...getRootProps()}
                        className={cn(
                            "border border-primary border-dashed rounded-xl h-[16vh] grid place-items-center  hover:cursor-pointer text-[rgba(0,0,0,0.6)]",
                            CLASS_DRAG_ACTIVE,
                        )}
                    >
                        <div className="grid place-items-center gap-1">
                            <ImagePlus />
                            <p>{DROPZONE_TEXT}</p>
                            {!isDragActive && (
                                <small className="text-xs">Vous pouvez copier collé vos photos dans la zone</small>
                            )}
                        </div>
                        <input {...getInputProps()} />
                    </div>

                    <div className="p-2 text-red-500">{form.formState.errors.files?.message}</div>
                </div>

                <div className="Dropzone-preview">
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            className="text-xs active:scale-90 transition-all duration-75"
                            onClick={clearAllFile}
                        >
                            <Trash2 className="w-4 h-4 mr-1" /> Tout Retirer
                        </Button>
                    </div>
                    <ScrollArea className="mt-4 h-[25vh] bg-slate-100 rounded-xl pb-3">
                        <div className="p-3 grid grid-cols-[repeat(auto-fit,minmax(100px,135px))] gap-1 justify-center">
                            {form.watch("files").map((file) => (
                                <PreviewVarianteUpload key={uniqid()} file={file} />
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <div className="mt-8 w-full">
                    <Button className="w-full p-5">Ajouter</Button>
                </div>
            </form>
        </Form>
    );
};

export default UploadZoneVariant;
