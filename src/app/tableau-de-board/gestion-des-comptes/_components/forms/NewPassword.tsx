import React from "react";
import AccountNewPasswordForm from "./AccountNewPasswordForm";

const NewPassword = () => {
    const saveNewPassword = async (values) => {
        console.log(values);
    };

    return <AccountNewPasswordForm save={saveNewPassword} />;
};

export default NewPassword;
