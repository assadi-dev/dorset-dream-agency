"use client";
import { cn } from "@/lib/utils";
import { CircleX, ImagePlus, Pencil, Upload } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import useModalState from "@/hooks/useModalState";
import { Button } from "@/components/ui/button";
import PhotoDropzone from "./view/PhotoDropzone";

type UploadState = {
    preview?: string | null;
    file?: File | null;
};

type UploadPhotoProps = {
    photo?: string;
    onUpload?: (file: File) => void;
} & React.HtmlHTMLAttributes<HTMLDivElement>;
const UploadPhoto = ({ photo, onUpload, ...props }: UploadPhotoProps) => {
    const { openModal, closeModal, payload } = useModalState();

    const clearAllFile = () => {};
    payload as UploadState;
    const DROPZONE_TEXT = "Cliquez sur le bouton ci-dessous pour ajouter une photo.";

    const openDropzone = () => {
        openModal({
            title: "Ajouter une photo",
            component: PhotoDropzone,
            payload: { preview: photo, file: null },
            onInteractOutside: false,
        });
    };

    const styles: React.CSSProperties = {
        backgroundImage: `url(${payload?.preview})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    return (
        <div
            {...props}
            className={cn(
                payload?.preview ? "bg-[#0f172a]" : "border-2 rounded border-dashed",
                "rounded relative  w-full grid place-items-center  text-[rgba(0,0,0,0.6)] p-3 text-sm",

                props.className,
            )}
        >
            {payload?.preview && (
                <Image
                    src={payload?.preview}
                    alt={`photo de l'employee`}
                    height={500}
                    width={500}
                    className="position-center object-cover  w-full bg-transparent h-[300px]"
                />
            )}
            {!payload?.preview && (
                <div className="grid place-items-center gap-3 p-3 text-center">
                    <ImagePlus />
                    <p>{DROPZONE_TEXT}</p>

                    <Button size="sm" type="button" className="mt-3" onClick={openDropzone}>
                        <Upload />
                        Upload
                    </Button>
                </div>
            )}
            {payload?.preview && (
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
            )}
        </div>
    );
};

export default UploadPhoto;
