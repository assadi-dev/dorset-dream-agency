"use client";
import React, { useReducer } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ModalContent from "./ModalContent";
import { ModalContextProvider } from "@/context/ModalContext";

type ModalProviderProps = {
    children: React.ReactNode;
};

const modalReducer = (prev: any, state: any) => {
    return { ...prev, ...state };
};

const ModalProvider = ({ children }: ModalProviderProps) => {
    const [modalState, setModalState] = useReducer(modalReducer, {
        open: false,
        payload: null,
        title: "",
        description: "",
        component: () => null,
    });

    const RenderHook = (Component: any) => {
        return ({ ...props }) => <Component {...props} />;
    };

    const Render = RenderHook(modalState.component);

    return (
        <ModalContextProvider
            value={{
                ...modalState,
                openModal: setModalState,
            }}
        >
            {children}

            <Dialog open={modalState.open} onOpenChange={() => setModalState({ ...modalState, open: false })}>
                <DialogContent className="w-[95vw] sm:max-w-fit">
                    <ModalContent title={modalState.title} description={modalState.description}>
                        <Render />
                    </ModalContent>
                </DialogContent>
            </Dialog>
        </ModalContextProvider>
    );
};

export default ModalProvider;
