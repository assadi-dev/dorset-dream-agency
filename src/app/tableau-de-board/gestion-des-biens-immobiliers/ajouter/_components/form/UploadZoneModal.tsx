"use client";
import FormFieldInput from "@/components/forms/FormFieldInput";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import useModalState from "@/hooks/useModalState";
import { arrayFill, cn } from "@/lib/utils";
import { ImagePlus } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import uniqid from "uniqid";
import PreviewVarianteUpload from "./PreviewVarianteUpload";

type UploadZoneForm = {
    name: string;
    files: Array<File>;
};
const UploadZoneModal = () => {
    const form = useForm<UploadZoneForm>({
        defaultValues: {
            name: "",
            files: [],
        },
    });

    const { closeModal } = useModalState();
    const propertyForm = useFormContext();

    const submitVariant: SubmitHandler<UploadZoneForm> = async (values) => {
        // TODO: implement the logic to upload the file

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

    const onDrop = React.useCallback((acceptedFiles) => {
        // Do something with the files
        form.setValue("files", acceptedFiles);
        console.log(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const CLASS_DRAG_ACTIVE = isDragActive ? "border-cyan-600 bg-cyan-200 transition text-cyan-600" : "";
    const DROPZONE_TEXT = isDragActive ? "Vous pouvez lâcher" : "Cliquez ou glissez vos photos ici";

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

        console.log(acceptedFiles);

        form.setValue("files", acceptedFiles);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitVariant)}
                className="w-[32vw] p-3 min-h-[25vh] flex flex-col justify-between gap-3"
                onPaste={handlePast}
            >
                <FormFieldInput
                    control={form.control}
                    name="name"
                    label="Nom"
                    placeholder="Ex: Aqua Turquoise,Aqua Violet"
                />
                <div
                    {...getRootProps()}
                    className={cn(
                        "border border-primary border-dashed rounded-xl h-[16vh] grid place-items-center mb-3 hover:cursor-pointer text-[rgba(0,0,0,0.6)]",
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
                <ScrollArea className="mt-4 h-[25vh] bg-slate-100 rounded-xl pb-3">
                    <div className="p-3 grid grid-cols-[repeat(auto-fit,minmax(100px,135px))] gap-1 justify-center">
                        {form.watch("files").map((file) => (
                            <PreviewVarianteUpload key={file.name} file={file} />
                        ))}
                    </div>
                </ScrollArea>

                <div className="mt-8 flex justify-center">
                    <Button>Ajouter</Button>
                </div>
            </form>
        </Form>
    );
};

export default UploadZoneModal;
