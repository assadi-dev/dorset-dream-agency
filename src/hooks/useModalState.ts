"use client";

import { modalContext } from "@/context/ModalContext";
import React from "react";

const useModalState = () => {
    const modal = React.useContext(modalContext);

    const closeModal = () => {
        modal.openModal({ open: false });
    };

    const openModal = ({
        title,
        description,
        payload,
        component,
    }: {
        title?: string;
        description?: string;
        payload?: any;
        component?: React.ComponentType<unknown>;
    }) => {
        modal.openModal({ open: true, title, description, payload, component });
    };
    const toggleModal = ({
        title,
        description,
        payload,
        component,
    }: {
        title?: string;
        description?: string;
        payload?: any;
        component?: React.ComponentType<unknown>;
    }) => {
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
