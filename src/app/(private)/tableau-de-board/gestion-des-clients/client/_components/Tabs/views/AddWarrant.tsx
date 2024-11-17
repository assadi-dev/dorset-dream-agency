"use client";
import React from "react";
import WarrantForm from "./WarrantForm";
import { warrantFile, WarrantFormType } from "./schema";
import { useSession } from "next-auth/react";
import { UserSession } from "@/auth";
import { useSearchParams } from "next/navigation";
import { createPerquisition } from "../helper";
import { ToastSuccessSonner } from "@/components/notify/Sonner";
import { useQueryClient } from "@tanstack/react-query";
import useModalState from "@/hooks/useModalState";

const AddWarrant = () => {
    const searchParams = useSearchParams();
    const clientID = searchParams.get("id");
    const session = useSession();
    const queryClient = useQueryClient();
    const { closeModal } = useModalState();

    if (!session) return "session no found";
    const customSession = session.data as UserSession;
    const defaultValues = {
        clientID: Number(clientID),
        employeeID: Number(customSession.user?.employeeID),
        warrantFiles: [],
    } as WarrantFormType;

    const createWarrant = async (values: WarrantFormType) => {
        const formData = new FormData();
        values.clientID && formData.append("clientID", values.clientID.toString());
        values.employeeID && formData.append("employeeID", values.employeeID.toString());
        if (values.warrantFiles.length > 0) {
            for (const file of values.warrantFiles) {
                if (file.file instanceof File) formData.append("files", file.file);
            }
        }
        await createPerquisition(formData);
        ToastSuccessSonner(`L'ajout du mandat à été effectué avec succès`);
        queryClient.refetchQueries({ queryKey: ["USER_PERQUISITIONS_WARRANT"] });
        closeModal();
    };

    return <WarrantForm defaultValues={defaultValues} onSubmitValues={createWarrant} />;
};

export default AddWarrant;
