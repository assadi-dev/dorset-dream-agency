"use client";
import useModalState from "@/hooks/useModalState";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { UserCreateInputDto } from "./schema";
import AccountForm from "./AccountForm";

const EditForm = () => {
    const { payload } = useModalState();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const router = useRouter();

    const defaultValues: UserCreateInputDto = {
        username: payload?.username || "",
        password: payload?.password || "",
        confirmPassword: payload?.password || "",
        role: payload?.role,
    };

    const saveUpdateAccount = async (values: UserCreateInputDto) => {
        try {
        } catch (error) {
            throw error;
        }
    };

    return (
        <AccountForm
            className="w-full lg:w-[32vw] min-h-[420px]"
            defaultValues={defaultValues}
            save={saveUpdateAccount}
        />
    );
};

export default EditForm;
