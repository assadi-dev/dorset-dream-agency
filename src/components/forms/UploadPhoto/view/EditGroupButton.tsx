import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ResetIcon } from "@radix-ui/react-icons";
import { EyeIcon, Save, Grid3x3, Grid2X2 } from "lucide-react";
import React from "react";
import ActionButton from "./ActionButton";
import { CropperRef } from "react-advanced-cropper";
import { convertBlobToFile, convertUrlToFile } from "@/lib/convertFile";

type EditGroupButtonProps = { cropperRef?: CropperRef; onGetFile?: (file: File) => void };
const EditGroupButton = ({ cropperRef, onGetFile }: EditGroupButtonProps) => {
    const mimetype = "image/jpeg";
    const onSave = async () => {
        if (cropperRef) {
            const end = async (blob: any) => {
                const file = await convertBlobToFile({
                    name: `photo-${Date.now()}.jpeg`,
                    blob,
                    mimetype,
                });
                if (onGetFile) {
                    onGetFile(file);
                }
            };
            cropperRef.getCanvas()?.toBlob(end, mimetype, 0.65);
        }
    };
    const onPreview = () => {
        if (cropperRef) {
            const end = async (blob: any) => {
                const file = await convertBlobToFile({
                    name: `photo-${Date.now()}.jpeg`,
                    blob,
                    mimetype,
                });
                if (onGetFile) {
                    onGetFile(file);
                }
            };
            cropperRef.getCanvas()?.toBlob(end, mimetype, 0.65);
        }
    };

    const onReset = async () => {
        if (cropperRef) {
            const originalFile = cropperRef.getImage()?.src as string;
            const file = await convertUrlToFile({
                name: `photo-${Date.now()}.jpeg`,
                url: originalFile,
                mimetype,
            });
            if (onGetFile) {
                onGetFile(file);
            }
        }
    };

    return (
        <TooltipProvider>
            <div className={cn("absolute left-0 top-[50%] translate-y-[-50%] p-5 flex flex-col items-center gap-3")}>
                {
                    <>
                        <ActionButton title="Réinitialiser" icon={<ResetIcon />} onClick={onReset} />
                        {/*  <ActionButton title="Aperçu" icon={<EyeIcon />} onClick={onPreview} /> */}
                        {/*    <ActionButton title="Afficher la grille" icon={<Grid2X2 />} /> */}
                        <ActionButton title="Sauvegarder" icon={<Save />} onClick={onSave} />
                    </>
                }
            </div>
        </TooltipProvider>
    );
};

export default EditGroupButton;
