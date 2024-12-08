"use client";
import React from "react";
import { FabricContext } from "./FabricContext";
import { FabricReducerAction } from "./helpers";
import { Canvas } from "fabric";

const useFabricAction = () => {
    const context = React.useContext(FabricContext);

    const setCanvas = (canvas: Canvas) => {
        context.dispatch({ type: FabricReducerAction.INIT_CANVAS, payload: canvas });
    };

    return { canvas: context.canvas, selected: context.selected, layers: context.layers, setCanvas };
};

export default useFabricAction;
