import { Canvas, FabricObject } from "fabric";
import { FabricObjectExtends } from "../../type";

export enum FabricReducerAction {
    INIT_CANVAS = "INI_CANVAS",
    SELECTED_OBJECT = "SELECTED_OBJECT_LAYER",
    UNSELECTED_OBJECT = "UNSELECTED_OBJECT_LAYER",
    ADD_OBJECT_FROM_LAYER = "ADD_OBJECT_FROM_LAYER",
    UPDATE_OBJECT_FROM_LAYER = "UPDATE_OBJECT_FROM_LAYER",
    REMOVE_OBJECT_TO_LAYER = "REMOVE_OBJECT_FROM_LAYER",
    CLEAR_ALL_LAYER = "CLEAR_ALL_LAYER",
    SET_CANVAS_BACKGROUND_IMAGE = "SET_CANVAS_BACKGROUND_IMAGE",
    SET_CANVAS_BACKGROUND_COLOR = "SET_CANVAS_BACKGROUND_COLOR",
    UPDATE_LAYER = "UPDATE_LAYER",
}

export const canvasValidation = (canvas: unknown) => {
    if (canvas instanceof Canvas) return canvas;
    throw new Error("l'instance canvas est NULL");
};

export const OBJECT_CLEAN_VALUES = {
    getWidth: (object: FabricObject) => Math.round(object.width * object.scaleX),
    getHeight: (object: FabricObject) => Math.round(object.height * object.scaleY),
    getType: (object: FabricObject) => object.type,
};

export const getCurrentOject = (canvas: Canvas, id?: string) => {
    if (!canvas) return;
    const object = canvas.getObjects().find((obj: FabricObjectExtends) => obj?.id === id);
    return object;
};
