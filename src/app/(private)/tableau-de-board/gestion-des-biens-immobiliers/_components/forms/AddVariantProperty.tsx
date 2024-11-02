"use client";
import useModalState from "@/hooks/useModalState";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddVariantSchema, AddVariantSchemaType } from "./schema";
import FormFieldInput from "@/components/forms/FormFieldInput";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PreviewVarianteUpload from "../../ajouter/_components/form/PreviewVarianteUpload";
import { cn, wait } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { createVariantGalleryApi } from "../../ajouter/_components/form/helpers";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROPERTY_QUERY_KEY } from "../../helpers";
import SubmitButton from "@/components/forms/SubmitButton";

const AddVariantProperty = () => {
    const { payload, closeModal } = useModalState();
    const queryClient = useQueryClient();
    const mutation = useMutation({ mutationFn: createVariantGalleryApi });

    const form = useForm<AddVariantSchemaType>({
        resolver: zodResolver(AddVariantSchema),
        defaultValues: {
            propertyID: payload.propertyID,
            name: "",
            files: [],
        },
    });

    const clearAllFile = () => {
        form.setValue("files", []);
        form.clearErrors();
    };

    const onDrop = React.useCallback((acceptedFiles: Array<File>) => {
        // Do something with the files
        form.setValue("files", acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const CLASS_DRAG_ACTIVE = isDragActive ? "border-cyan-600 bg-cyan-200 transition text-cyan-600" : "";
    const DROPZONE_TEXT = isDragActive ? "Vous pouvez lâcher" : "Cliquez ou glissez vos photos ici";

    const submitVariant: SubmitHandler<AddVariantSchemaType> = async (values) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("propertyID", values.propertyID as string);

            if (values.files.length > 0) {
                for (const file of values.files) {
                    formData.append("files", file);
                }
            }

            await mutation.mutateAsync(formData, {
                onSuccess: () => {
                    queryClient.refetchQueries({ queryKey: [PROPERTY_QUERY_KEY.LIST_IMMOBILIER_GESTION] });
                    ToastSuccessSonner(`La variante ${values.name} vient d’être ajouté`);
                    closeModal();
                },
            });
        } catch (error: any) {
            ToastErrorSonner(`l'ajout de la variant à été interrompu cause:${error.message}`);
        }
    };

    const LABEL_SUBMIT = mutation.isPending ? "Traitement en cours" : "Ajouter";

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
                                <PreviewVarianteUpload key={file.name} file={file} />
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <div className="mt-8 flex justify-center">
                    <SubmitButton className="w-full p-5" isLoading={mutation.isPending}>
                        {LABEL_SUBMIT}
                    </SubmitButton>
                </div>
            </form>
        </Form>
    );
};

export default AddVariantProperty;
