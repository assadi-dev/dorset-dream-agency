import { Canvas, Circle, FabricObject, Rect } from "fabric";
import { FabricObjectExtends, FabricObjectSelected } from "../../type";
import { FabricFormType } from "./FabricContext";

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

export const fabricObjectSerializer = (fabricObject: FabricObjectExtends & Circle & Rect): FabricObjectSelected => {
    if (!fabricObject) throw new Error("le fabric object n'est pas renseigné");
    if (!fabricObject.id) throw new Error("id non renseigné");

    const object = {
        id: fabricObject.id,
        type: fabricObject.type,
        left: fabricObject.left,
        top: fabricObject.top,
        width: fabricObject.width * fabricObject.scaleX,
        height: fabricObject.width * fabricObject.scaleY,
        fill: fabricObject.fill,
        opacity: fabricObject.opacity,
        stroke: fabricObject.stroke,
        strokeWidth: fabricObject.strokeWidth,
        angle: fabricObject.angle,
        borderRadius: fabricObject.rx || fabricObject.ry,
        radius: fabricObject.radius,
    } satisfies Partial<FabricObjectSelected>;

    return object;
};

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

export const VALIDE_TYPE = {
    text: (type?: FabricFormType) => type?.includes("text") || false,
    rec: (type?: FabricFormType) => type?.includes("rec") || false,
    circle: (type?: FabricFormType) => type?.includes("circle") || false,
};

export const DEFAULT_INPUT_VALUE = 0;
