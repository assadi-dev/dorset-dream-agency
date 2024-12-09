"use client";
import React from "react";
import { ActionReducer } from "../../type";
import { FabricReducerAction } from "./helpers";
import { FabricInitialStateType } from "./FabricContext";
import { FabricImage, FabricObject } from "fabric";

const FabriceReducer = (state: FabricInitialStateType, action?: ActionReducer) => {
    const type = action?.type;
    const canvas = state.canvas;
    const payload = action?.payload;

    switch (type) {
        case FabricReducerAction.INIT_CANVAS:
            return { ...state, canvas: payload };
        case FabricReducerAction.SELECTED_OBJECT:
            return { ...state, selected: payload };

        default:
            return state;
    }
};

export default FabriceReducer;
