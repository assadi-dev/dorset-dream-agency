"use client";
import { cn } from "@/lib/utils";
import { ImagePlus } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

type UploadPhotoProps = {
    photo?: string;
    onUpload?: (file: File) => void;
} & React.HtmlHTMLAttributes<HTMLDivElement>;
const UploadPhoto = ({ photo, onUpload, ...props }: UploadPhotoProps) => {
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
    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
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
    return (
        <div
            {...props}
            {...getRootProps()}
            className={cn(
                "border-2 rounded border-dashed min-h-[16vh] w-full grid place-items-center  hover:cursor-pointer text-[rgba(0,0,0,0.6)] p-3 text-sm",
                CLASS_DRAG_ACTIVE,
                props.className,
            )}
        >
            <div className="grid place-items-center gap-1">
                <ImagePlus />
                <p>{DROPZONE_TEXT}</p>
                {!isDragActive && <small className="text-xs">Vous pouvez copier collé vos photos dans la zone</small>}
                <input {...getInputProps()} />
            </div>
        </div>
    );
};

export default UploadPhoto;
