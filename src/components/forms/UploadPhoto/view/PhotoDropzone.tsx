"use client";
import React, { useTransition } from "react";
import { cn, wait } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { CircleAlert, CircleX, ImagePlus, Pencil, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import useModalState from "@/hooks/useModalState";
import SubmitButton from "../../SubmitButton";
import PreviewDropzone from "./PreviewDropzone";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { usePathname, useRouter } from "next/navigation";

type UploadState = {
    preview?: string | null;
    file?: File | null;
    onUpload?: (file: File) => Promise<void>;
};

const PhotoDropzone = ({ preview, onUpload }: UploadState) => {
    const pathname = usePathname();
    const router = useRouter();
    const { closeModal, payload } = useModalState();
    const [isPending, startTransition] = useTransition();
    payload as UploadState;
    const [state, setState] = React.useReducer((prev: UploadState, next: any) => ({ ...prev, ...next }), {
        preview: preview || payload.preview,
        file: null,
    });

    const sizeValidator = (file: File) => {
        if (file.size > 500 * 1024) {
            return {
                code: "file-size-too-large",
                message: `La taille du fichier doit être inférieure à 500 KB `,
            };
        }
        return null;
    };

    //Récupération des fichier par copier collé
    const handlePast = async (event: React.ClipboardEvent) => {
        event.preventDefault();
        try {
            if (!event.clipboardData.files.length) {
                return;
            }

            const file = event.clipboardData.files[0];
            const error = sizeValidator(file);
            if (error?.message) throw new Error(error?.message);
            const prevLink = URL.createObjectURL(file);
            setState({ file: file, preview: prevLink });
        } catch (error: any) {
            if (error instanceof Error) {
                ToastErrorSonner(error.message);
            }
        }
    };

    const onDrop = React.useCallback((acceptedFiles: Array<File>) => {
        if (acceptedFiles.length) {
            const file = acceptedFiles[acceptedFiles.length - 1] as File;
            const prevLink = URL.createObjectURL(file);
            setState({ file: file, preview: prevLink });
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive, open, fileRejections } = useDropzone({
        onDrop,
        validator: sizeValidator,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
        },
        noClick: true,
    });
    const CLASS_DRAG_ACTIVE = isDragActive ? "border-cyan-600 bg-cyan-200 transition text-cyan-600" : "";
    const DROPZONE_TEXT = isDragActive ? "Vous pouvez lâcher" : "Cliquez ou glissez vos photos ici";

    const process = () => {
        startTransition(async () => {
            try {
                if (onUpload) await onUpload(state.file);

                closeModal();
                router.push(pathname);
                router.refresh();
                ToastSuccessSonner("L'envoie de la photo à été traité");
            } catch (error) {
                if (error instanceof Error) {
                    ToastErrorSonner(`L'envoie de la photo n'a pas pu être traité raison: ${error.message}`);
                }
            }
        });
    };

    return (
        <ScrollArea className="lg:max-h-[90vh]">
            <div className="flex flex-col justify-between gap-5 sm:w-[35vw]" onPaste={handlePast}>
                <div
                    {...getRootProps()}
                    className={cn(
                        "border-2 rounded",
                        "rounded relative  w-full grid place-items-center  p-3 text-sm",
                        {
                            "border-dashed": fileRejections.length == 0,
                            "text-[rgba(0,0,0,0.6)] ": fileRejections.length == 0,
                            "border-red-800": fileRejections.length > 0,
                            "text-red-800": fileRejections.length > 0,
                            "bg-red-200": fileRejections.length > 0,
                        },

                        CLASS_DRAG_ACTIVE,
                    )}
                >
                    <div className="grid place-items-center gap-1 p-3">
                        {fileRejections.length > 0 ? (
                            <div className="grid place-items-center gap-1 ">
                                <CircleAlert className="justify-self-center text-red-900 h-10 w-10" />
                                <p className="text-red-900 text-sm font-semibold my-3 transition-all  ">
                                    {fileRejections[0].errors[0].message}
                                </p>
                            </div>
                        ) : (
                            <div className="grid place-items-center gap-1">
                                <ImagePlus className="justify-self-center" />
                                <p className="text-xs">{DROPZONE_TEXT}</p>
                                {!isDragActive && (
                                    <small className="text-xs">Vous pouvez copier collé vos photos dans la zone</small>
                                )}
                            </div>
                        )}
                        <input {...getInputProps()} />
                        <Button size="sm" type="button" className="mt-3 text-xs" onClick={open}>
                            <Upload className="w-4 h-4" />
                            Ouvrir
                        </Button>
                    </div>
                </div>
                <PreviewDropzone src={state.preview} />

                <div className="my-3 w-full">
                    <SubmitButton
                        isLoading={isPending}
                        className="w-full"
                        onClick={process}
                        disabled={state.file ? false : true}
                    >
                        Valider
                    </SubmitButton>
                </div>
            </div>
        </ScrollArea>
    );
};

export default PhotoDropzone;
