"use client";
import PhotoDropzone from "@/components/forms/UploadPhoto/view/PhotoDropzone";
import useModalState from "@/hooks/useModalState";
import React from "react";
import { uploadEmployeePhoto } from "../../actions";

const UploadPhotoForm = () => {
    const { payload } = useModalState();

    const savePhoto = async (file: File) => {
        if (!file) throw new Error("File missing");
        const employeeID = payload.id;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("employeeID", employeeID);
        await uploadEmployeePhoto(formData);
    };

    return <PhotoDropzone preview={payload?.photoUrl} onUpload={savePhoto} />;
};

export default UploadPhotoForm;
