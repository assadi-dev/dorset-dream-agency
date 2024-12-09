"use client";
import React from "react";
import { FabricContext } from "./FabricContext";
import { canvasValidation, FabricReducerAction } from "./helpers";
import { Canvas, FabricImage, FabricObject } from "fabric";

const useFabricAction = () => {
    const context = React.useContext(FabricContext);

    const setCanvas = (canvas: Canvas) => {
        context.dispatch({ type: FabricReducerAction.INIT_CANVAS, payload: canvas });
    };

    const addObjectToLayer = (object: any) => {
        const canvas = canvasValidation(context.canvas);
        canvas.add(object);
        canvas.setActiveObject(object);
        canvas.requestRenderAll();
        context.dispatch({ type: FabricReducerAction.SELECTED_OBJECT, payload: object });
    };

    const selectedObject = (object: FabricObject) => {
        const canvas = canvasValidation(context.canvas);
        canvas.setActiveObject(object);
        canvas.requestRenderAll();
        context.dispatch({ type: FabricReducerAction.SELECTED_OBJECT, payload: object });
    };
    const unselectedObject = () => {
        const empty = {
            type: "",
            width: 0,
            height: 0,
            stroke: null,
        };

        context.dispatch({ type: FabricReducerAction.SELECTED_OBJECT, payload: empty });
    };

    const updateObject = (object: FabricObject) => {
        context.dispatch({ type: FabricReducerAction.UPDATE_OBJECT_FROM_LAYER, payload: object });
    };

    const setCanvasBackgroundImage = async (url: string) => {
        const canvas = canvasValidation(context.canvas);
        const image = await FabricImage.fromURL(url);
        image.scaleToHeight(canvas.height);
        image.scaleToWidth(canvas.width);
        canvas.backgroundImage = image;
        canvas.requestRenderAll();
    };

    const removeCanvasBackgroundImage = async () => {
        const canvas = canvasValidation(context.canvas);
        const image = await FabricImage.fromURL("");
        canvas.backgroundImage = image;
        canvas.requestRenderAll();
    };
    const setCanvasBackgroundColor = (color: string) => {
        const canvas = canvasValidation(context.canvas);
        canvas.backgroundColor = color;
        canvas.requestRenderAll();
    };

    return {
        canvas: context.canvas,
        selected: context.selected,
        layers: context.layers,
        addObjectToLayer,
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
