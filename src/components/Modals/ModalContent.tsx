import React from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

type ModalContentProps = {
    title?: string;
    description?: string;
    children: React.ReactNode;
};
const ModalContent = ({ title, description, children }: ModalContentProps) => {
    return (
        <>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                {children}
            </DialogHeader>
        </>
    );
};

export default ModalContent;
