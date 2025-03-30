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
import PreviewVarianteUpload from "../views/PreviewVarianteUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { variantSchema } from "./propertySchema";
import { FileObj, GalleryResponse } from "../../../types";
import { ToastErrorSonner } from "@/components/notify/Sonner";
import { updateCover } from "./helpers";

export type UploadZoneForm = {
    name: string;
    files: Array<FileObj> | Array<GalleryResponse>;
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
            if (payload?.gallery) {
                const defaultValues = payload as VariantPayload;
                form.setValue("files", defaultValues?.gallery);
                form.setValue("name", defaultValues?.name);
            }
            if (payload?.files) {
                const defaultValues = payload as UploadZoneForm;
                form.setValue("files", defaultValues?.files);
                form.setValue("name", defaultValues?.name);
            }
        }
    }, [payload, form]);

    const { closeModal } = useModalState();
    const propertyForm = useFormContext();

    const submitVariant: SubmitHandler<UploadZoneForm> = async (values) => {
        const currentVariant = propertyForm.getValues("variants") || [];
        const variant = {
            id: uniqid(),
            name: values.name,
            files: values.files,
        };

        const addVariant = [variant, ...currentVariant];
        propertyForm.setValue("variants", addVariant);
        closeModal();
        window.location.reload();
    };

    const sizeValidator = (file: File) => {
        if (file.size > 500 * 1024) {
            return {
                code: "file-size-too-large",
                message: `la taille du fichier doit être inférieure à 500 KB`,
            };
        }
        return null;
    };

    const onDrop = React.useCallback(
        (acceptedFiles: Array<File>) => {
            // Do something with the files
            const currentFiles = form.getValues("files");

            const fileObj = acceptedFiles.map((file: File, index) => {
                const id = uniqid();
                return {
                    id,
                    name: file.name,
                    url: URL.createObjectURL(file),
                    file,
                    size: file.size,
                    isCover: false,
                    order: 0,
                };
            }) as FileObj[];
            const updated = [...fileObj, ...currentFiles] as FileObj[] | GalleryResponse[];
            const updateCover = updated.map((it, index) => {
                it.isCover = index == 0 ? true : false;

                return it;
            }) as FileObj[];
            updateCover[0].isCover = true;

            form.setValue("files", updateCover);
        },
        [form],
    );
    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/webp": [],
        },
        validator: sizeValidator,
    });

    const handleClickSetCover = async (file: FileObj) => {
        updateCover(form, file);
    };

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

    React.useEffect(() => {
        if (fileRejections.length) {
            {
                fileRejections.map(({ file, errors }) => {
                    errors.length &&
                        errors.map((err) => {
                            const ERROR_FILE = `Erreur d'upload sur le fichier ${file.name} pour la raison suivante : ${err.message}`;
                            ToastErrorSonner(ERROR_FILE);
                        });
                });
            }
        }
    }, [fileRejections]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitVariant)}
                className="w-[42vw] p-3 min-h-[38vh] flex flex-col justify-between gap-3"
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
                        <div className="p-3 grid grid-cols-[repeat(auto-fit,minmax(180px,0.5fr))] gap-1 justify-center">
                            {form.watch("files").length > 0 &&
                                form
                                    .getValues("files")
                                    .map((file) => (
                                        <PreviewVarianteUpload
                                            isCover={file.isCover}
                                            key={file?.id}
                                            file={file as FileObj}
                                            setCover={handleClickSetCover}
                                        />
                                    ))}
                        </div>
                    </ScrollArea>
                </div>

                <div className="mt-8 w-full">
                    <Button className="w-full p-5" type="submit">
                        Ajouter
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default UploadZoneVariant;
