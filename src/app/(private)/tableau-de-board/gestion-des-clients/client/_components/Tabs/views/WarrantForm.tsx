import React from "react";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { WarrantFileType, WarrantFormType, warrantSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/forms/SubmitButton";
import { useDropzone } from "react-dropzone";
import unique from "uniqid";
import { ImagePlus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToastErrorSonner } from "@/components/notify/Sonner";
import PreviewMandat from "./PreviewMandata";
import PreviewMandata from "./PreviewMandata";
import { Button } from "@/components/ui/button";

type WarrantFormProps = {
    onSubmitValues: (values: WarrantFormType) => Promise<void>;
    submitLabel?: string;
};
const WarrantForm = ({ onSubmitValues, submitLabel = "Ajouter" }: WarrantFormProps) => {
    const [isPending, startTransition] = React.useTransition();
    const form = useForm<WarrantFormType>({
        resolver: zodResolver(warrantSchema),
        defaultValues: {
            warrantFiles: [],
        },
    });

    const LABEL_SUBMIT = isPending ? "Traitement en cours" : submitLabel;
    const clearAllFile = () => {
        form.setValue("warrantFiles", []);
        form.clearErrors();
    };

    const onDrop = React.useCallback((acceptedFiles: Array<File>) => {
        // Do something with the files
        const warrantFilesCollections = form.getValues("warrantFiles");
        const newWarrantFilesCollection: WarrantFileType[] = acceptedFiles.map((file) => {
            return {
                id: unique(),
                name: file.name,
                file: file,
            };
        });

        form.setValue("warrantFiles", [...warrantFilesCollections, ...newWarrantFilesCollection]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const CLASS_DRAG_ACTIVE = isDragActive ? "border-cyan-600 bg-cyan-200 transition text-cyan-600" : "";
    const DROPZONE_TEXT = isDragActive ? "Vous pouvez lâcher" : "Cliquez ou glissez vos photos ici";

    const handleSubmitValue: SubmitHandler<WarrantFormType> = async (values) => {
        if (onSubmitValues)
            startTransition(async () => {
                try {
                    await onSubmitValues(values);
                } catch (error: any) {
                    ToastErrorSonner(error.message);
                }
            });
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmitValue)} className="w-[85vw] lg:w-[42vw] ">
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

                <div className="p-2 text-red-500">{form.formState.errors.warrantFiles?.message}</div>
            </div>
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
            <ScrollArea className="mt-4 h-[36vh] bg-slate-100 rounded-xl pb-3">
                <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(160px,250px))] gap-2 justify-center">
                    {form.watch("warrantFiles").map((warrantFile) => (
                        <PreviewMandata key={warrantFile.id} file={warrantFile.file} name={warrantFile.name} />
                    ))}
                </div>
            </ScrollArea>
            <div className="mt-8 flex justify-center">
                {
                    <SubmitButton className="w-full p-5" isLoading={isPending}>
                        {LABEL_SUBMIT}
                    </SubmitButton>
                }
            </div>
        </form>
    );
};

export default WarrantForm;
