"use client";
import { cn } from "@/lib/utils";
import { CircleX, CrossIcon, ImagePlus, Pencil, Upload } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import Image from "next/image";

type UploadState = {
    previewLink?: string | null;
    file?: File | null;
};

type UploadPhotoProps = {
    photo?: string;
    onUpload?: (file: File) => void;
} & React.HtmlHTMLAttributes<HTMLDivElement>;
const UploadPhoto = ({ photo, onUpload, ...props }: UploadPhotoProps) => {
    const [state, setState] = React.useReducer((prev: UploadState, next: any) => ({ ...prev, ...next }), {
        preview: photo,
        file: null,
    });

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
        // Do something with the files
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

    const styles: React.CSSProperties = {
        backgroundImage: `url(${state.preview})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    return (
        <div
            {...props}
            {...getRootProps()}
            className={cn(
                state.preview ? "bg-[#0f172a]" : "border-2 rounded border-dashed",
                "rounded relative  w-full grid place-items-center  text-[rgba(0,0,0,0.6)] p-3 text-sm",
                CLASS_DRAG_ACTIVE,
                props.className,
            )}
        >
            <Image
                src={state.preview}
                alt={`photo de l'employee`}
                height={500}
                width={500}
                className="position-center object-cover  w-full bg-transparent h-[300px]"
            />
            {!state.preview && (
                <div className="grid place-items-center gap-1 p-3">
                    <ImagePlus />
                    <p>{DROPZONE_TEXT}</p>
                    {!isDragActive && (
                        <small className="text-xs">Vous pouvez copier collé vos photos dans la zone</small>
                    )}
                    <input {...getInputProps()} />
                    <Button size="sm" type="button" className="mt-3" onClick={open}>
                        <Upload />
                        Ouvrir
                    </Button>
                </div>
            )}
            <div className="rounded-lg border border-white/50  bg-[#0f172a]/25  flex justify-end gap-2 items-center w-[90%] mx-auto p-1 absolute bottom-1.5    backdrop-blur-xl ">
                <div className="w-[65%] px-2 overflow-hidden">
                    {" "}
                    <p className="font-semibold text-xs truncate drop-shadow-md text-white">Ma Photo</p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white  border border-cyan-300 bg-cyan-500/35 backdrop-blur-sm hover:bg-cyan-400 hover:border-0"
                >
                    <Pencil className="h-8 w-8" />
                </Button>
                <Button
                    variant="destructive"
                    size="icon"
                    className="text-white bg-red-600/35 backdrop-blur-xl border border-red-500"
                >
                    <CircleX className="h-8 w-8" />
                </Button>
            </div>
        </div>
    );
};

export default UploadPhoto;
