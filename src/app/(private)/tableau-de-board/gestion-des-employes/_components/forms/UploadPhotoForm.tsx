import PhotoDropzone from "@/components/forms/UploadPhoto/view/PhotoDropzone";
import useModalState from "@/hooks/useModalState";
import React from "react";

const UploadPhotoForm = () => {
    const { payload } = useModalState();
    console.log(payload);

    const savePhoto = async (file: File) => {
        if (!file) throw new Error("File missing");
        const formData = new FormData();
        formData.append("file", file);
        console.log("file", file);
    };

    return <PhotoDropzone preview={payload?.photoUrl} onUpload={savePhoto} />;
};

export default UploadPhotoForm;
