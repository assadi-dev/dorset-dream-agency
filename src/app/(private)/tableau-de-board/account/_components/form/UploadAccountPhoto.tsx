"use client";
import { cn } from "@/lib/utils";
import { ImagePlus, Upload } from "lucide-react";
import React from "react";

import Image from "next/image";
import useModalState from "@/hooks/useModalState";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import { Session } from "@/app/(private)/tableau-de-board/account/type";
import ActionPhoto from "@/components/forms/UploadPhoto/view/ActionPhoto";
import PhotoDropzone from "@/components/forms/UploadPhoto/view/PhotoDropzone";
import { updateEmployeePhoto } from "./action";

type UploadState = {
    preview?: string | null;
    file?: File | null;
};

type UploadPhotoProps = {
    photo?: string | null;
    onUpload?: (file: File) => void;
} & React.HtmlHTMLAttributes<HTMLDivElement>;
const UploadAccountPhoto = ({ photo, onUpload, ...props }: UploadPhotoProps) => {
    const { openModal, payload } = useModalState();
    const session = useSession();

    payload as UploadState;
    const DROPZONE_TEXT = "Cliquez sur le bouton ci-dessous pour ajouter une photo.";

    const savePhoto = async (file: File) => {
        if (!file) throw "Fichier introuvable";
        const userSession = { ...session.data } as Session;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("employeeID", String(userSession?.user?.employeeID));

        const result = await updateEmployeePhoto(formData);

        await session.update({
            ...session,
            user: { ...session?.data?.user, image: String(result?.photoUrl) },
        });
    };

    const openDropzone = () => {
        openModal({
            title: "Ajouter une photo",
            component: () => PhotoDropzone({ onUpload: savePhoto }),
            payload: { preview: photo, file: null },
            onInteractOutside: false,
        });
    };

    return (
        <div
            {...props}
            className={cn(
                photo ? "bg-gradient-to-br to-green-950 from-primary" : "border-2 rounded border-dashed",
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

export default UploadAccountPhoto;
