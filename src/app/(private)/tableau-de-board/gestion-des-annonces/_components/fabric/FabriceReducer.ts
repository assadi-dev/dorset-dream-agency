"use client";
import React from "react";
import { ActionReducer } from "../../type";
import { FabricReducerAction } from "./helpers";
import { FabricInitialStateType } from "./FabricContext";
import { FabricObject } from "fabric";

const FabriceReducer = (state: FabricInitialStateType, action?: ActionReducer) => {
    const type = action?.type;
    switch (type) {
        case FabricReducerAction.INIT_CANVAS:
            const payload = action?.payload;
            return { ...state, canvas: payload };

        case FabricReducerAction.ADD_OBJECT_TO_LAYER:
            const newObjectLayer: FabricObject = action?.payload;
            state?.canvas?.add(newObjectLayer);
            state?.canvas?.setActiveObject(newObjectLayer);
            const layerCollectionAdd = state?.canvas ? state?.canvas?.getObjects() : [];
            return { ...state, layers: layerCollectionAdd };
        default:
            return state;
    }
};

export default FabriceReducer;
