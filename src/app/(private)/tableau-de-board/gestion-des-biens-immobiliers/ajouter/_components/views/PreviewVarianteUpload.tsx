import React from "react";
import { FileObj, GalleryResponse } from "../../../types";
import Image from "next/image";
import { BookImage, Check } from "lucide-react";
import ButtonActionWithTooltip from "@/components/Buttons/ButtonActionWithTooltip";
import useBoolean from "@/hooks/useBoolean";

type PreviewVarianteUploadType = {
    isCover: boolean;
    order?: number;
    file?: FileObj & { originalName?: string };
    onRemove?: (file: FileObj) => void;
    setCover?: (file: FileObj) => void;
};

const PreviewVarianteUpload = ({ isCover, file, onRemove, setCover }: PreviewVarianteUploadType) => {
    //onClick={() => onRemove && onRemove()}
    const handleClickSetCover = React.useCallback(() => {
        if (!file) return;
        file.isCover = !isCover;
        setCover && setCover(file);
    }, [file, isCover]);

    const IsDefaultCover = () => {
        return (
            <div className="absolute bg-lime-300 text-green-950 ring-1 ring-green-900 rounded m-1 z-50">
                <Check className="h-5 w-5 p-0.5" />{" "}
            </div>
        );
    };

    return (
        <div className="relative w-full h-[110px] rounded overflow-hidden group z-0">
            {isCover && <IsDefaultCover />}
            {file && (
                <Image
                    src={file.url as string}
                    width={200}
                    height={200}
                    alt={`preview of ${file.name || file.originalName || "property variant"}`}
                    className="w-full h-full object-cover object-center group-hover:grayscale"
                    loading="lazy"
                />
            )}
            <div className="absolute top-0 left-0 bottom-0 w-full   group-hover:bg-gradient-to-b from-black/80 to-primary/50 transition-all motion-preset-slide-right ">
                <div className="flex justify-end items-center p-2">
                    {
                        <ButtonActionWithTooltip
                            icon={<BookImage className="p-0" />}
                            variant={"outline"}
                            type="button"
                            tooltipTitle="Définir cette image en couverture"
                            size={"icon"}
                            className="rounded-full w-6 h-6 !text-black !bg-gradient-to-br from-primary-accent  text-primary-accent active:scale-110 transition-all  opacity-0 group-hover:opacity-100"
                            onClick={handleClickSetCover}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default PreviewVarianteUpload;
