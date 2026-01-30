"use client";

import React from "react";
import ReleaseFieldForm from "../forms/ReleaseFieldForm";
import useModalState from "@/hooks/useModalState";
import { ReleaseFormInfer } from "../schema";
import { UseFormReturn } from "react-hook-form";

const EditFieldRelease = () => {
    const { closeModal, payload } = useModalState();

    const form = payload.form as UseFormReturn<ReleaseFormInfer>;
    const fieldEntries = payload.field as { id: string; name: string; value: string };

    const handleCancel = () => {
        closeModal();
    };

    const handleConFirm = (field: any) => {
        const currentFields = structuredClone(form.getValues("fields"));
        const updateCollection = currentFields.map((f) => {
            if (f.id === fieldEntries?.id) {
                return {
                    ...field,
                };
            }
            return f;
        });
        form.setValue("fields", updateCollection);

        closeModal();
    };

    return (
        <div>
            <ReleaseFieldForm
                defaultValue={{
                    ...fieldEntries,
                }}
                onCancel={handleCancel}
                onConfirm={handleConFirm}
            />
        </div>
    );
};

export default EditFieldRelease;
