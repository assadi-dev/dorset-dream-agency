import InputLabelWithErrorMessage from "@/HOC/InputLabelWithErrorMessage";
import React from "react";

const Form = () => {
    const [isPending, startTransition] = React.useTransition();

    return (
        <form>
            <InputLabelWithErrorMessage label="Nom" />
        </form>
    );
};

export default Form;
