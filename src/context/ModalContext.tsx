import React from "react";

export type openModalArgs = {
    open: boolean;
    title?: string;
    description?: string;
    payload?: unknown;
    component?: React.ComponentType<unknown>;
};
type ModalContextType = {
    open: boolean;
    title?: string;
    description?: string;
    payload?: unknown;
    component?: React.ComponentType<unknown>;
    openModal: (args: openModalArgs) => void;
};
export const modalContext = React.createContext<ModalContextType>({
    open: false,
    title: "",
    description: "",
    payload: null,
    component: () => null,
    openModal: () => {},
});

export const ModalContextProvider = modalContext.Provider;
