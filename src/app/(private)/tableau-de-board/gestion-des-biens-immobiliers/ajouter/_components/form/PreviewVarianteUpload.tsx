import React from "react";
import { FileObj, GalleryResponse } from "../../../types";
import Image from "next/image";

type PreviewVarianteUploadType = {
    file?: FileObj & { originalName?: string };
    onRemove?: () => void;
};

const PreviewVarianteUpload = ({ file, onRemove }: PreviewVarianteUploadType) => {
    return (
        <div className=" w-full h-[80px] rounded overflow-hidden" onClick={() => onRemove && onRemove()}>
            {file && (
                <Image
                    src={file.url as string}
                    width={100}
                    height={100}
                    alt={`preview of ${file.name || file.originalName || "property variant"}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default PreviewVarianteUpload;
