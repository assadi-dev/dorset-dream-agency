import React from "react";

export type openModalArgs = {
    open: boolean;
    title?: string;
    description?: string;
    payload?: any;
    component?: React.ComponentType<unknown>;
    onInteractOutside?: boolean;
};
type ModalContextType = {
    open: boolean;
    title?: string;
    description?: string;
    payload?: any;
    component?: React.ComponentType<unknown> | React.ReactElement;
    onInteractOutside?: boolean;
    openModal: (args: openModalArgs) => void;
};
export const modalContext = React.createContext<ModalContextType>({
    open: false,
    title: "",
    description: "",
    payload: null,
    component: () => null,
    onInteractOutside: true,
    openModal: () => {},
});

export const ModalContextProvider = modalContext.Provider;
