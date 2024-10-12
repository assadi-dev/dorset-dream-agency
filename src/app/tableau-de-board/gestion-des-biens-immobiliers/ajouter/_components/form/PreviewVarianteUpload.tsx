import React from "react";

type PreviewVarianteUploadType = {
    file: File;
};
const PreviewVarianteUpload = ({ file }: PreviewVarianteUploadType) => {
    const blobToUrl = React.useCallback(() => {
        return file && URL.createObjectURL(file);
    }, [file]);

    const imagePreviewElRef = React.useRef<HTMLDivElement>(null);
    const [styles] = React.useState({
        backgroundImage: "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    });

    React.useEffect(() => {
        if (!file) return;
        const imageObject = blobToUrl();
        if (imagePreviewElRef.current) {
            imagePreviewElRef.current.style.backgroundImage = `url(${imageObject})`;
        }

        return () => {
            URL.revokeObjectURL(imageObject);
        };
    }, [file]);

    return <div ref={imagePreviewElRef} style={styles} className=" w-full h-[80px] rounded"></div>;
};

export default PreviewVarianteUpload;
