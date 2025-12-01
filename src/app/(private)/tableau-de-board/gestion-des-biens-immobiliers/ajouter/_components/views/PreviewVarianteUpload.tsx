import React from "react";
import { FileObj, GalleryResponse } from "../../../types";
import Image from "next/image";
import { Check } from "lucide-react";
import { CoverButton } from "./Button";
import { LoadPreviewFile } from "@/lib/client_side";
import { is } from "drizzle-orm";
import { cn } from "@/lib/utils";

type PreviewVarianteUploadType = {
    selectMode: boolean;
    isSelected: boolean;
    isCover: boolean;
    order?: number;
    file?: FileObj & { originalName?: string };
    onRemove?: (file: FileObj) => void;
    setCover?: (file: FileObj) => void;
    onSelect?: (id: string) => void;
};

const PreviewVarianteUpload = ({
    selectMode,
    isSelected,
    isCover,
    file,
    onRemove,
    setCover,
    onSelect,
}: PreviewVarianteUploadType) => {
    //onClick={() => onRemove && onRemove()}

    const handleClickSetCover = React.useCallback(() => {
        if (!file) return;
        file.isCover = !isCover;
        setCover && setCover(file);
    }, [file, isCover, setCover]);

    const cover = LoadPreviewFile(file?.url as string);

    const handleSelected = React.useCallback(
        (id: string) => {
            if (onSelect && id && selectMode) {
                onSelect(id);
            }
        },
        [onSelect, selectMode],
    );

    return (
        <div
            className="relative w-full h-[110px] rounded overflow-hidden group z-0"
            onClick={() => handleSelected(String(file?.id))}
        >
            {selectMode && file?.id && <SelectMode id={String(file?.id)} isSelected={isSelected} />}

            {file && (
                <Image
                    src={cover}
                    width={200}
                    height={200}
                    alt={`preview of ${file.name || file.originalName || "property variant"}`}
                    className={cn("w-full h-full object-cover object-center ", {
                        "group-hover:grayscale": !selectMode,
                    })}
                    loading="lazy"
                />
            )}
            {!selectMode && (
                <div className="absolute top-0 left-0 bottom-0 w-full   group-hover:bg-gradient-to-b from-black/80 to-primary/50  z-100">
                    <div className="flex justify-end items-center p-2">
                        <CoverButton isCover={isCover ?? false} onClick={handleClickSetCover} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PreviewVarianteUpload;

type SelectModeProps = { id?: string; isSelected: boolean };
const SelectMode = ({ isSelected }: SelectModeProps) => {
    const CHECKBOX_CLASS = "absolute bg-white text-green-950 ring-2 ring-green-900 rounded m-1 z-50 ";

    return (
        <div className={cn(CHECKBOX_CLASS, { "bg-lime-500": isSelected, "ring-2": isSelected })}>
            <Check
                className={cn("h-4 w-4 p-0.5 opacity-0 transition-all", {
                    "opacity-100": isSelected,
                })}
            />
        </div>
    );
};
