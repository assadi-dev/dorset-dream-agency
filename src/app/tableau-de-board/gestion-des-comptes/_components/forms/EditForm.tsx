"use client";
import useModalState from "@/hooks/useModalState";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { UserCreateInputDto, userEditFormType } from "./schema";
import AccountForm from "./AccountForm";

const EditForm = () => {
    const { payload } = useModalState();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const router = useRouter();

    const defaultValues: userEditFormType = {
        username: payload?.username || "",
        role: payload?.role,
    };

    const saveUpdateAccount = async (values: userEditFormType) => {
        try {
        } catch (error) {
            throw error;
        }
    };

    return <AccountForm className="w-full lg:w-[32vw] " defaultValues={defaultValues} save={saveUpdateAccount} />;
};

export default EditForm;
