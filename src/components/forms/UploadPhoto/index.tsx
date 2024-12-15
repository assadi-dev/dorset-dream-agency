"use client";
import { cn } from "@/lib/utils";
import { CircleX, ImagePlus, Pencil, Upload } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import useModalState from "@/hooks/useModalState";
import { Button } from "@/components/ui/button";
import PhotoDropzone from "./view/PhotoDropzone";
import ActionPhoto from "./view/ActionPhoto";

type UploadState = {
    preview?: string | null;
    file?: File | null;
};

type UploadPhotoProps = {
    photo?: string | null;
    onUpload?: (file: File) => void;
} & React.HtmlHTMLAttributes<HTMLDivElement>;
const UploadPhoto = ({ photo, onUpload, ...props }: UploadPhotoProps) => {
    const { openModal, closeModal, payload } = useModalState();

    const clearAllFile = () => {};
    payload as UploadState;
    const DROPZONE_TEXT = "Cliquez sur le bouton ci-dessous pour ajouter une photo.";

    const startUpload = async (file: File) => {};

    const openDropzone = () => {
        openModal({
            title: "Ajouter une photo",
            component: PhotoDropzone,
            payload: { preview: photo, file: null, startUpload },
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
                photo ? "bg-gradient-to-br to-[#0f172a] from-[#214583]" : "border-2 rounded border-dashed",
                "rounded relative  w-full grid place-items-center  text-[rgba(0,0,0,0.6)] p-3 text-sm",
                "group-hover:bg-red-200",
                props.className,
            )}
        >
            {photo && (
                <Image
                    src={photo}
                    alt={`photo de l'employee`}
                    height={500}
                    width={500}
                    className="position-center object-cover  w-full bg-transparent h-[300px]"
                />
            )}
            {photo && <ActionPhoto onEdit={openDropzone} />}
            {!photo && (
                <div className="grid place-items-center gap-3 p-3 text-center">
                    <ImagePlus />
                    <p>{DROPZONE_TEXT}</p>

                    <Button size="sm" type="button" className="mt-3" onClick={openDropzone}>
                        <Upload />
                        Upload
                    </Button>
                </div>
            )}
        </div>
    );
};

export default UploadPhoto;
