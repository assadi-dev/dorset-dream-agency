"use client";
import React from "react";
import { FabricContextProvider, fabricInitialState } from "./FabricContext";
import FabriceReducer from "./FabriceReducer";

type FabricProviderProps = {
    children: React.ReactNode;
};
const FabricProvider = ({ children }: FabricProviderProps) => {
    const [state, dispatch] = React.useReducer(FabriceReducer, fabricInitialState);

    return <FabricContextProvider value={{ ...state, dispatch }}>{children}</FabricContextProvider>;
};

export default FabricProvider;
