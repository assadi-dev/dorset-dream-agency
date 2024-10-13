import React from "react";

type PreviewVarianteUploadType = {
    file: File;
    onRemove?: () => void;
};
const PreviewVarianteUpload = ({ file, onRemove }: PreviewVarianteUploadType) => {
    const blobToUrl = React.useCallback(() => {
        return file && URL.createObjectURL(file);
    }, [file]);

    const reducer = (prev, next) => ({ ...prev, ...next });

    const [styles, setStyles] = React.useReducer(reducer, {
        backgroundImage: "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    });

    React.useEffect(() => {
        if (!file) return;
        const imageObject = blobToUrl();

        setStyles({ backgroundImage: `url(${imageObject})` });

        return () => {
            URL.revokeObjectURL(imageObject);
        };
    }, [file]);

    return <div style={styles} className=" w-full h-[80px] rounded" onClick={() => onRemove()}></div>;
};

export default PreviewVarianteUpload;
