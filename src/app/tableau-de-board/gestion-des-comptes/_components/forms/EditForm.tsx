"use client";
import useModalState from "@/hooks/useModalState";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { UserCreateInputDto, userEditFormType } from "./schema";
import AccountForm from "./AccountForm";
import { editUserData } from "../../action";

const EditForm = () => {
    const { payload, closeModal } = useModalState();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const userID = payload.id;

    const router = useRouter();

    const defaultValues: userEditFormType = {
        username: payload?.username || "",
        role: payload?.role,
    };

    const saveUpdateAccount = async (values: userEditFormType) => {
        try {
            if (userID) {
                console.log(values);

                //await editUserData(userID, values);
                closeModal();
                router.push(pathname);
                router.refresh();
            }
        } catch (error) {
            throw error;
        }
    };

    return <AccountForm className="w-full lg:w-[32vw] " defaultValues={defaultValues} save={saveUpdateAccount} />;
};

export default EditForm;
