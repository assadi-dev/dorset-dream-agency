"use client";
import React from "react";
import { ActionReducer } from "../../type";
import { FabricReducerAction } from "./helpers";
import { FabricInitialStateType } from "./FabricContext";
import { FabricImage, FabricObject } from "fabric";

const FabriceReducer = (state: FabricInitialStateType, action?: ActionReducer) => {
    const type = action?.type;
    const payload = action?.payload;

    switch (type) {
        case FabricReducerAction.INIT_CANVAS:
            return { ...state, canvas: payload };
        case FabricReducerAction.ADD_OBJECT_TO_LAYER:
            return { ...state, selected: payload.object, layers: payload.layers };
        case FabricReducerAction.SELECTED_OBJECT:
            return { ...state, selected: payload };
        case FabricReducerAction.UPDATE_LAYER:
            return { ...state, layers: payload };
        case FabricReducerAction.REMOVE_OBJECT_TO_LAYER:
            return { ...state, selected: null, layers: payload };
        case FabricReducerAction.REMOVE_OBJECT_TO_LAYER:
            return { ...state, selected: null, layers: [] };

        default:
            return state;
    }
};

export default FabriceReducer;
