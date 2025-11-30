"use client";
import FormFieldInput from "@/components/forms/FormFieldInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import useModalState from "@/hooks/useModalState";
import { cn } from "@/lib/utils";
import { Check, ImagePlus, Trash2 } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import uniqid from "uniqid";
import PreviewVarianteUpload from "./PreviewVarianteUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { VariantFormType, variantSchema } from "../form/propertySchema";
import { ActionComponentListArgs, FileObj, GalleryResponse } from "../../../types";
import { ToastErrorSonner } from "@/components/notify/Sonner";
import { updateCover, VARIANT_EVENT_CUSTOM_NAME } from "../form/helpers";
import useRouteRefresh from "@/hooks/useRouteRefresh";
import { dispatchEvent } from "@/lib/event";
import VariantSelectActions from "./VariantSelectActions";

export type UploadZoneForm = {
    id?: number | string | null;
    name: string;
    files: Array<FileObj> | Array<GalleryResponse>;
    toRemove?: string[];
};

export type VariantPayload = { id?: number | string | null; name: string; files: GalleryResponse[] };

const EditUploadZoneVariant = () => {
    const { refreshWithParams, refresh } = useRouteRefresh();

    const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);
    const [selectMode, setSelectMode] = React.useReducer((state: boolean) => !state, false);

    const handleSelect = (id: string) => {
        const newSelectedFiles = selectedFiles.includes(id)
            ? selectedFiles.filter((fileId) => fileId !== id)
            : [...selectedFiles, id];
        setSelectedFiles(newSelectedFiles);
    };

    const form = useForm<UploadZoneForm>({
        resolver: zodResolver(variantSchema),
        defaultValues: {
            id: null,
            name: "",
            files: [],
            toRemove: [],
        },
    });

    const { payload } = useModalState();

    React.useEffect(() => {
        if (payload && form) {
            if (payload?.files) {
                const defaultValues = payload as VariantPayload;
                form.setValue("id", defaultValues?.id);
                form.setValue("files", defaultValues?.files);
                form.setValue("name", defaultValues?.name);
            }
            if (payload?.files) {
                const defaultValues = payload as UploadZoneForm;
                form.setValue("id", defaultValues?.id);
                form.setValue("files", defaultValues?.files);
                form.setValue("name", defaultValues?.name);
            }
        }
    }, [payload, form]);

    const { closeModal } = useModalState();
    const propertyForm = useFormContext();

    const submitVariant: SubmitHandler<UploadZoneForm> = async (values) => {
        const variantsCollections = propertyForm.getValues("variants");
        const variantsUpdated = variantsCollections.map((v: any) => {
            if (v.id == values.id) {
                v.name = values.name;
                v.files = values.files;
                v.toRemove = values.toRemove;
            }
            return v;
        });

        propertyForm.setValue("variants", variantsUpdated);
        closeModal();
        // refreshWithParams();
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
            const fileObj = acceptedFiles.map((file: File) => {
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
            form.setValue("files", updated);
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
        const currentFiles = form.getValues("files");
        form.setValue("files", []);
        form.clearErrors();
        const toRemove = currentFiles.map((file) => String(file.id));
        form.setValue("toRemove", toRemove);
    };

    const addToRemove = () => {
        const currentFiles = form.getValues("files");
        const fileToRemoveFiltered = currentFiles.filter((file) => !selectedFiles.includes(String(file.id)));
        form.setValue("files", fileToRemoveFiltered as any);
        const toRemove = selectedFiles;
        form.setValue("toRemove", toRemove);
    };

    const handleClickSetCover = async (file: FileObj) => {
        dispatchEvent(VARIANT_EVENT_CUSTOM_NAME.update_cover, file);
        updateCover(form, file);
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

    const handleSelectedMode = React.useCallback(() => {
        if (selectMode) {
            setSelectedFiles([]);
        }
        setSelectMode();
    }, [selectMode]);

    const isIncludesSelectedFiles = (id: string) => selectedFiles.includes(id);

    const ACTION_LISTS: ActionComponentListArgs[] = [
        {
            lucidIcon: Check,
            label: "Tout décoché",
            handler: () => setSelectedFiles([]),
        },
        {
            lucidIcon: Trash2,
            label: "Supprimer",
            handler: addToRemove,
            isDanger: false,
        },
        {
            lucidIcon: Trash2,
            label: "Tout Supprimer",
            handler: clearAllFile,
            isDanger: true,
        },
    ];

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitVariant)}
                className="w-[32vw] p-3 min-h-[25vh] flex flex-col justify-between gap-3"
                /*onPaste={handlePast}*/
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
                    <div className="flex justify-between">
                        <div>
                            <Button variant="ghost" type="button" onClick={handleSelectedMode}>
                                {selectMode ? "Annuler la selection" : "Sélectionner"}
                            </Button>
                        </div>
                        <div className="w-full flex justify-end">
                            {selectMode && selectedFiles.length > 0 && (
                                <VariantSelectActions actionListHandlers={ACTION_LISTS} />
                            )}
                        </div>
                    </div>
                    <ScrollArea className="mt-4 h-[25vh] bg-slate-100 rounded-xl pb-3">
                        <div className="p-3 grid grid-cols-[repeat(auto-fit,minmax(180px,180px))] gap-1 justify-center">
                            {form.watch("files").length > 0 &&
                                form
                                    .getValues("files")
                                    .map((file) => (
                                        <PreviewVarianteUpload
                                            key={file?.id}
                                            isCover={file.isCover}
                                            file={file as FileObj}
                                            selectMode={selectMode}
                                            isSelected={isIncludesSelectedFiles(String(file.id))}
                                            setCover={handleClickSetCover}
                                            onSelect={handleSelect}
                                        />
                                    ))}
                        </div>
                    </ScrollArea>
                </div>

                <div className="mt-8 w-full">
                    <Button className="w-full p-5" type="submit">
                        Valider
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default EditUploadZoneVariant;
