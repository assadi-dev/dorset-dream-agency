import React from "react";
import AccountNewPasswordForm from "./AccountNewPasswordForm";
import { NewPasswordFormType, PasswordFormTypeWithoutUsername } from "./schema";
import useModalState from "@/hooks/useModalState";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { editUserData, updateUserPassword } from "../../action";

const NewPassword = () => {
    const { payload, closeModal } = useModalState();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const userID = payload.id;
    const username = payload.username;

    const router = useRouter();

    const saveNewPassword = async (values: PasswordFormTypeWithoutUsername) => {
        await updateUserPassword(userID, values);
        closeModal();
        router.push(pathname);
        router.refresh();
    };

    return <AccountNewPasswordForm defaultFormValues={{ username }} save={saveNewPassword} />;
};

export default NewPassword;
