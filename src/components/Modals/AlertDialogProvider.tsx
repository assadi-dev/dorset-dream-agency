"use client";
import React from "react";

type AlertDialogProvider = {
    children: React.ReactNode;
};

const alertDialogReducer = (prev: any, state: any) => {
    return { ...prev, ...state };
};

const AlertDialogProvider = ({ children }: AlertDialogProvider) => {
    const [modalState, setModalState] = React.useReducer(alertDialogReducer, {
        open: false,
        payload: null,
        title: "",
        description: "",
    });

    return <div>{children}</div>;
};

export default AlertDialogProvider;
