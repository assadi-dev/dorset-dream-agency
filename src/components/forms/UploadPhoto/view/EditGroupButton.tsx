import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ResetIcon } from "@radix-ui/react-icons";
import { EyeIcon, Save, Grid3x3, Grid2X2 } from "lucide-react";
import React from "react";
import ActionButton from "./ActionButton";
import { CropperRef } from "react-advanced-cropper";

type EditGroupButtonProps = { cropperRef: CropperRef };
const EditGroupButton = ({ cropperRef }: EditGroupButtonProps) => {
    const onSave = () => {
        if (cropperRef) {
            const newTab = window.open();
            if (newTab) {
                newTab.document.body.innerHTML = `<img src="${cropperRef.getCanvas()?.toDataURL()}"/>`;
            }
        }
    };
    const onPreview = () => {
        if (cropperRef) {
            const newTab = window.open();
            if (newTab) {
                newTab.document.body.innerHTML = `<img src="${cropperRef.getCanvas()?.toDataURL()}"/>`;
            }
        }
    };

    const onReset = () => {
        if (cropperRef) {
            const newTab = window.open();
            if (newTab) {
                newTab.document.body.innerHTML = `<img src="${cropperRef.getImage()?.src}"/>`;
            }
        }
    };

    return (
        <TooltipProvider>
            <div className={cn("absolute left-0 top-[50%] translate-y-[-50%] p-5 flex flex-col items-center gap-3")}>
                <ActionButton title="Réinitialiser" icon={<ResetIcon />} onClick={onReset} />
                <ActionButton title="Aperçu" icon={<EyeIcon />} onClick={onPreview} />
                {/*    <ActionButton title="Afficher la grille" icon={<Grid2X2 />} /> */}
                <ActionButton title="Sauvegarder" icon={<Save />} onClick={onSave} />
            </div>
        </TooltipProvider>
    );
};

export default EditGroupButton;
