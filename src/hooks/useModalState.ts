"use client";

import { modalContext } from "@/context/ModalContext";
import React from "react";
type modalParams = {
    title?: string;
    description?: string;
    payload?: any;
    component?: React.ComponentType<unknown>; //TODO remplacer le type par  React.ReactElement
    onInteractOutside?: boolean;
};
const useModalState = () => {
    const modal = React.useContext(modalContext);

    const closeModal = () => {
        modal.openModal({ open: false });
    };

    const openModal = ({ title, description, payload, component, onInteractOutside }: modalParams) => {
        modal.openModal({ open: true, title, description, onInteractOutside, payload, component });
    };
    const toggleModal = ({ title, description, payload, component }: modalParams) => {
        modal.openModal({ open: !modal.open, title, description, payload, component });
    };

    return {
        isOpen: modal.open,
        component: modal.component,
        title: modal.title,
        description: modal.description,
        payload: modal.payload,
        closeModal,
        openModal,
        toggleModal,
    };
};

export default useModalState;
