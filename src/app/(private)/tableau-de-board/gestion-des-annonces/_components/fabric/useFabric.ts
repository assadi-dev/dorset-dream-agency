"use client";
import React from "react";
import { FabricContext } from "./FabricContext";
import { canvasValidation, FabricReducerAction } from "./helpers";
import { Canvas, FabricImage, FabricObject } from "fabric";
import { CANVAS_VALUES } from "../../helper";

const useFabricAction = () => {
    const context = React.useContext(FabricContext);

    const setCanvas = (canvas: Canvas) => {
        context.dispatch({ type: FabricReducerAction.INIT_CANVAS, payload: canvas });
    };

    const selectedObject = (object: FabricObject) => {
        context.dispatch({ type: FabricReducerAction.SELECTED_OBJECT, payload: object });
    };
    const unselectedObject = () => {
        context.dispatch({ type: FabricReducerAction.SELECTED_OBJECT, payload: null });
    };

    const updateObject = (object: FabricObject) => {
        context.dispatch({ type: FabricReducerAction.UPDATE_OBJECT_FROM_LAYER, payload: object });
    };

    const setCanvasBackgroundImage = async (url: string) => {
        const canvas = canvasValidation(context.canvas);
        const image = await FabricImage.fromURL(url);
        image.width = canvas.width;
        image.height = canvas.height;

        canvas.backgroundImage = image;
        canvas.renderAll();
    };

    const removeCanvasBackgroundImage = async () => {
        const canvas = canvasValidation(context.canvas);
        const image = await FabricImage.fromURL("");
        image.width = canvas.width;
        image.height = canvas.height;
        canvas.backgroundImage = image;
        canvas.backgroundColor = CANVAS_VALUES.backgroundColor;
        canvas.renderAll();
    };
    const setCanvasBackgroundColor = (color: string) => {
        const canvas = canvasValidation(context.canvas);
        canvas.backgroundColor = color;
        canvas.renderAll();
    };

    return {
        canvas: context.canvas,
        selected: context.selected,
        layers: context.layers,
        setCanvas,
        selectedObject,
        unselectedObject,
        updateObject,
        setCanvasBackgroundColor,
        setCanvasBackgroundImage,
        removeCanvasBackgroundImage,
    };
};

export default useFabricAction;
