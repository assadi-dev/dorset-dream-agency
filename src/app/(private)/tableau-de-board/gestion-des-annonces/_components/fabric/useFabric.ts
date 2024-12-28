"use client";
import React, { useCallback } from "react";
import { FabricContext, FabricFormType } from "./FabricContext";
import { canvasValidation, FabricReducerAction } from "./helpers";
import { Canvas, FabricImage, FabricObject } from "fabric";
import uniqid from "uniqid";
import { FabricObjectExtends } from "../../type";

type customObject = FabricObject & { id?: string; zIndex?: number };

const useFabricAction = () => {
    const context = React.useContext(FabricContext);

    const setCanvas = (canvas: Canvas) => {
        canvas.preserveObjectStacking = true;
        context.dispatch({ type: FabricReducerAction.INIT_CANVAS, payload: canvas });
    };

    const setIdObject = (object: customObject) => {
        if (!object) return;
        if (!object.id) return object.set("id", `${object.type}_${uniqid()}`);
    };

    const addObjectToLayer = (object: any) => {
        const canvas = canvasValidation(context.canvas);
        canvas.add(object);
        canvas.setActiveObject(object);
        canvas.requestRenderAll();
    };

    const setLayers = (layers: any[]) => {
        const canvas = canvasValidation(context.canvas);
        layers.forEach((object, index) => {
            canvas.moveObjectTo(object, index);
        });
        canvas.requestRenderAll();
        context.dispatch({ type: FabricReducerAction.UPDATE_LAYER, payload: layers });
    };

    const selectedObject = (object: FabricObject | null) => {
        const canvas = canvasValidation(context.canvas);
        if (!object) return;
        canvas.setActiveObject(object);
        canvas.requestRenderAll();
        context.dispatch({ type: FabricReducerAction.SELECTED_OBJECT, payload: object });
    };

    const unselectedObject = React.useCallback(() => {
        if (!context.canvas) return;
        context.dispatch({ type: FabricReducerAction.SELECTED_OBJECT, payload: null });
    }, [context]);

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

    const updateLayers = useCallback(() => {
        if (!context.canvas) return;
        const canvas = canvasValidation(context.canvas);
        canvas.getObjects().forEach((object, index) => {
            if (index === 0) index = 1;
            setIdObject(object);
            object.set("zIndex", index);
        });
        context.dispatch({ type: FabricReducerAction.UPDATE_LAYER, payload: canvas.getObjects() });
    }, [context]);

    const moveObjectTo = (object: FabricObjectExtends, index: number) => {
        if (!object || !index) return;
        const canvas = canvasValidation(context.canvas);
        canvas.moveObjectTo(object, index);
        canvas.requestRenderAll();
        context.dispatch({ type: FabricReducerAction.UPDATE_LAYER, payload: canvas.getObjects() });
    };

    React.useEffect(() => {
        if (context.canvas) {
            const canvas = canvasValidation(context.canvas);
            canvas.on("object:added", updateLayers);
            canvas.on("object:modified", updateLayers);
            canvas.on("object:removed", updateLayers);
            canvas.on("selection:cleared", unselectedObject);
            canvas.on("selection:updated", unselectedObject);

            return () => {
                canvas.on("object:added", updateLayers);
                canvas.on("object:modified", updateLayers);
                canvas.on("object:removed", updateLayers);
                canvas.on("selection:cleared", unselectedObject);
                canvas.on("selection:updated", unselectedObject);
            };
        }
    }, [context.canvas, updateLayers, unselectedObject]);

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
        moveObjectTo,
        setLayers,
        updateLayers,
    };
};

export default useFabricAction;
