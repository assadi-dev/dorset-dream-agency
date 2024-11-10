import React from "react";
import { FileObj, GalleryResponse } from "../../../types";
import Image from "next/image";

type PreviewVarianteUploadType = {
    file?: FileObj & GalleryResponse;
    onRemove?: () => void;
};

const PreviewVarianteUpload = ({ file, onRemove }: PreviewVarianteUploadType) => {
    React.useEffect(() => {
        if (!file) return;

        return () => {
            file.url && file?.file instanceof File && URL.revokeObjectURL(file.url);
        };
    }, [file]);

    return (
        <div className=" w-full h-[80px] rounded overflow-hidden" onClick={() => onRemove && onRemove()}>
            {file && (
                <Image
                    src={file.url as string}
                    width={100}
                    height={100}
                    alt={`preview of ${file.name || file.originalName}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default PreviewVarianteUpload;
