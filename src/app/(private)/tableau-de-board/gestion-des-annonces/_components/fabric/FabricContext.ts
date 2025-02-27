"use client";
import { Canvas, FabricObject } from "fabric";
import React from "react";
import { ActionReducer, FabricObjectExtends, FabricObjectSelected } from "../../type";

export enum FabricFormType {
    rect = "rect",
    circle = "circle",
    iText = "i-text",
    image = "image",
    triangle = "triangle",
    start = "start",
    textbox = "textbox",
    unknown = "unknown",
}

export type FabricInitialStateType = {
    canvas: Canvas | null;
    selected: FabricObjectSelected | null;
    layers: FabricObjectSelected[];
};

export const fabricInitialState: FabricInitialStateType = {
    canvas: null,
    selected: null,
    layers: [],
};

export type FabricInitialContextType = FabricInitialStateType & {
    dispatch: (action: ActionReducer) => void;
};
const fabricContextState: FabricInitialContextType = {
    ...fabricInitialState,
    dispatch: (action: ActionReducer) => {},
};
export const FabricContext = React.createContext<FabricInitialContextType>(fabricContextState);
export const FabricContextProvider = FabricContext.Provider;
