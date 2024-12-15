"use client";
import React, { useTransition } from "react";
import { cn, wait } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { CircleX, ImagePlus, Pencil, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useModalState from "@/hooks/useModalState";
import { CardFooter } from "@/components/ui/card";
import SubmitButton from "../../SubmitButton";
import PreviewDropzone from "./PreviewDropzone";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { ToastErrorSonner, ToastSuccessSonner } from "@/components/notify/Sonner";
import { usePathname, useRouter } from "next/navigation";

type UploadState = {
    preview?: string | null;
    file?: File | null;
    startUpload: (file: File) => void;
};

const PhotoDropzone = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { closeModal, payload } = useModalState();
    const [isPending, startTransition] = useTransition();
    payload as UploadState;
    const [state, setState] = React.useReducer((prev: UploadState, next: any) => ({ ...prev, ...next }), {
        preview: payload.preview,
        file: null,
    });
    const session = useSession();

    const sizeValidator = (file: File) => {
        if (file.size > 500 * 1024) {
            return {
                code: "file-size-too-large",
                message: `la taille du fichier doit être inférieure à 500 KB`,
            };
        }
        return null;
    };

    const clearAllFile = () => {};

    const onDrop = React.useCallback((acceptedFiles: Array<File>) => {
        if (acceptedFiles) {
            for (const file of acceptedFiles) {
                const prevLink = URL.createObjectURL(file);
                setState({ file: file, preview: prevLink });
            }
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive, open, fileRejections } = useDropzone({
        onDrop,
        validator: sizeValidator,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/webp": [],
        },
        noClick: true,
    });
    const CLASS_DRAG_ACTIVE = isDragActive ? "border-cyan-600 bg-cyan-200 transition text-cyan-600" : "";
    const DROPZONE_TEXT = isDragActive ? "Vous pouvez lâcher" : "Cliquez ou glissez vos photos ici";
    const savePhoto = async () => {
        if (!state.file) throw "Fichier introuvable";
        const formData = new FormData();
        formData.append("file", state.file);
        await wait(3000);

        await session.update({
            ...session,
            data: {
                ...session.data,
                user: { ...session?.data?.user, name: "coco", image: state.preview },
            },
        });
    };

    const process = () => {
        startTransition(async () => {
            try {
                await savePhoto();
                closeModal();
                router.push(pathname);
                router.refresh();
                ToastSuccessSonner("Votre photo de profile à été traité");
            } catch (error) {
                if (error instanceof Error) {
                    ToastErrorSonner(`Votre photo de profile n'a pas pu être traité cause: ${error.message}`);
                }
            }
        });
    };

    return (
        <ScrollArea className="lg:max-h-[90vh]">
            <div className="flex flex-col justify-between gap-5 sm:w-[35vw]">
                <div
                    {...getRootProps()}
                    className={cn(
                        "border-2 rounded border-dashed",
                        "rounded relative  w-full grid place-items-center  text-[rgba(0,0,0,0.6)] p-3 text-sm",
                        CLASS_DRAG_ACTIVE,
                    )}
                >
                    <div className="grid place-items-center gap-1 p-3">
                        <ImagePlus />
                        <p className="text-xs">{DROPZONE_TEXT}</p>
                        {!isDragActive && (
                            <small className="text-xs">Vous pouvez copier collé vos photos dans la zone</small>
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
