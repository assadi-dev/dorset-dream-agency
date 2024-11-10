import React from "react";
import { GalleryResponse } from "../../../types";
import Image from "next/image";

type PreviewVarianteUploadType = {
    file?: File | GalleryResponse;
    onRemove?: () => void;
};

type stylesVariantImage = {
    backgroundImage: string;
    backgroundSize: string;
    backgroundPosition: string;
    backgroundRepeat: string;
};

const PreviewVarianteUpload = ({ file, onRemove }: PreviewVarianteUploadType) => {
    const reducer = (prev: stylesVariantImage, next: any) => ({ ...prev, ...next });

    const [state, setState] = React.useReducer(reducer, {
        url: "",
        name: "",
        size: 0,
    });

    React.useEffect(() => {
        if (!file) return;
        if (file instanceof File) {
            const urlObject = URL.createObjectURL(file);
            setState({ url: urlObject, name: file.name, size: file.size });
        } else {
            const defaultFile = file as GalleryResponse;
            if (defaultFile) {
                setState({ url: defaultFile.url, name: defaultFile.originalName, size: defaultFile.size });
            }
        }

        state.url && file instanceof File && URL.revokeObjectURL(state.url);
    }, [file]);

    return (
        <div className=" w-full h-[80px] rounded overflow-hidden" onClick={() => onRemove && onRemove()}>
            <Image
                src={state.url}
                width={100}
                height={100}
                alt={`preview of ${state.name}`}
                className="w-full h-full object-cover object-center"
            />
        </div>
    );
};

export default PreviewVarianteUpload;
