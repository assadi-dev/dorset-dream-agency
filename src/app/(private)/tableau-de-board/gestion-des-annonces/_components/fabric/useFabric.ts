"use client";
import React, { useCallback } from "react";
import { FabricContext, FabricFormType } from "./FabricContext";
import {
    canvasValidation,
    fabricObjectSerializer,
    FabricReducerAction,
    OBJECT_CLEAN_VALUES,
    serializedList,
} from "./helpers";
import { Canvas, FabricImage, FabricObject } from "fabric";
import uniqid from "uniqid";
import { FabricObjectExtends } from "../../type";
import { toBase64, toBase64FromUrl } from "@/lib/convertFile";

const useFabricAction = () => {
    const context = React.useContext(FabricContext);

    const setCanvas = (canvas: Canvas) => {
        canvas.preserveObjectStacking = true;
        context.dispatch({ type: FabricReducerAction.INIT_CANVAS, payload: canvas });
    };

    const setIdObject = (object: FabricObject) => {
        if (!object) return;
        if (!object.id) object.set("id", `${object.type}_${uniqid()}`);
        return object;
    };

    const addObjectToLayer = (object: any) => {
        const canvas = canvasValidation(context.canvas);
        setIdObject(object);
        object.set({
            name: object.id,
            strokeStyle: "none",
            opacity: 1,
        });
        canvas.add(object);
        canvas.setActiveObject(object);
        canvas.requestRenderAll();
        const objectSerialized = fabricObjectSerializer(object);
        const objectListsSerialized = serializedList(canvas.getObjects());
        context.dispatch({
            type: FabricReducerAction.ADD_OBJECT_TO_LAYER,
            payload: { object: objectSerialized, layers: objectListsSerialized },
        });
    };

    const setLayers = (layers: any[]) => {
        const canvas = canvasValidation(context.canvas);
        layers.forEach((object, index) => {
            const fabricObject = canvas.getObjects().find((current) => current.id === object.id);
            fabricObject && canvas.moveObjectTo(fabricObject, index);
        });

        canvas.renderAll();
        const objectListsSerialized = serializedList(canvas.getObjects());
        context.dispatch({ type: FabricReducerAction.UPDATE_LAYER, payload: objectListsSerialized });
    };

    const selectedObject = (object: FabricObject | null) => {
        const canvas = canvasValidation(context.canvas);
        if (!object) return;
        canvas.setActiveObject(object);
        canvas.renderAll();
        const objectSerialized = fabricObjectSerializer(object);
        context.dispatch({ type: FabricReducerAction.SELECTED_OBJECT, payload: objectSerialized });
    };

    const unselectedObject = React.useCallback(() => {
        if (!context.canvas) return;
        context.dispatch({ type: FabricReducerAction.SELECTED_OBJECT, payload: null });
    }, [context]);

    const updateObject = (object: FabricObject) => {
        const objectSerialized = fabricObjectSerializer(object);
        objectSerialized.height = Math.round(object.height * object.scaleY);
        objectSerialized.width = Math.round(object.width * object.scaleX);
        context.dispatch({ type: FabricReducerAction.UPDATE_OBJECT, payload: objectSerialized });
    };

    const setCanvasBackgroundImage = async (url: string) => {
        const canvas = canvasValidation(context.canvas);

        const base64 = (await toBase64FromUrl(url)) as string;
        const image = await FabricImage.fromURL(base64);
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

    const updateLayers = useCallback(
        (e: any) => {
            if (!context.canvas) return;
            const canvas = canvasValidation(context.canvas);
            const objectSerialized = fabricObjectSerializer(e.target as FabricObject);
            canvas.renderAll();
            context.dispatch({ type: FabricReducerAction.UPDATE_OBJECT, payload: objectSerialized });
        },
        [context],
    );

    const moveObjectTo = (object: FabricObjectExtends, index: number) => {
        if (!object || !index) return;
        const canvas = canvasValidation(context.canvas);
        canvas.moveObjectTo(object, index);
        canvas.requestRenderAll();
    };

    React.useEffect(() => {
        if (context.canvas) {
            const canvas = canvasValidation(context.canvas);
            canvas.on("object:added", updateLayers);
            canvas.on("object:removed", updateLayers);
            canvas.on("selection:cleared", unselectedObject);

            return () => {
                canvas.off("object:added", updateLayers);
                canvas.off("object:removed", updateLayers);
                canvas.off("selection:cleared", unselectedObject);
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
