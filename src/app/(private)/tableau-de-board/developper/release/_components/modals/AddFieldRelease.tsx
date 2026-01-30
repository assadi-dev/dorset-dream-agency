"use client";

import React from "react";
import ReleaseFieldForm from "../forms/ReleaseFieldForm";
import useModalState from "@/hooks/useModalState";
import { UseFormReturn } from "react-hook-form";
import { ReleaseFormInfer } from "../schema";
import uniqid from "uniqid";

const AddFieldRelease = () => {
    const { closeModal, payload } = useModalState();
    const handleCancel = () => {
        closeModal();
    };

    const form = payload.form as UseFormReturn<ReleaseFormInfer>;

    const handleConFirm = (data: any) => {
        const currentFields = structuredClone(form.getValues("fields"));
        const id = uniqid();
        const newField = {
            id,
            ...data,
        };

        currentFields.push(newField);

        form.setValue("fields", currentFields);

        closeModal();
    };

    return <ReleaseFieldForm onCancel={handleCancel} onConfirm={handleConFirm} />;
};

export default AddFieldRelease;
