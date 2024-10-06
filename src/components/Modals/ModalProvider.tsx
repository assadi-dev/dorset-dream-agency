"use client";
import React, { useReducer } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ModalContent from "./ModalContent";
import { ModalContextProvider } from "@/context/ModalContext";
import ElementView from "@/HOC/renderElementView";

type ModalProviderProps = {
    children: React.ReactNode;
};

const modalReducer = (prev, state) => {
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

    const Render = modalState.component;

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
                    <ModalContent>
                        <Render />
                    </ModalContent>
                </DialogContent>
            </Dialog>
        </ModalContextProvider>
    );
};

export default ModalProvider;
