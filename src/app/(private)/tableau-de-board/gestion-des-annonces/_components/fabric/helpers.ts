import {
    Canvas,
    Circle,
    FabricObject,
    Rect,
    FabricObjectProps,
    ObjectEvents,
    SerializedObjectProps,
    IText,
} from "fabric";
import { FabricObjectExtends, FabricObjectSelected } from "../../type";
import { FabricFormType } from "./FabricContext";
import { Textbox } from "fabric";
import uniqid from "uniqid";

export enum FabricReducerAction {
    INIT_CANVAS = "INI_CANVAS",
    SELECTED_OBJECT = "SELECTED_OBJECT_LAYER",
    UNSELECTED_OBJECT = "UNSELECTED_OBJECT_LAYER",
    ADD_OBJECT_TO_LAYER = "ADD_OBJECT_TO_LAYER",
    UPDATE_OBJECT = "UPDATE_OBJECT",
    REMOVE_OBJECT_TO_LAYER = "REMOVE_OBJECT_FROM_LAYER",
    CLEAR_ALL_LAYERS = "CLEAR_ALL_LAYERS",
    SET_CANVAS_BACKGROUND_IMAGE = "SET_CANVAS_BACKGROUND_IMAGE",
    SET_CANVAS_BACKGROUND_COLOR = "SET_CANVAS_BACKGROUND_COLOR",
    UPDATE_LAYER = "UPDATE_LAYER",
}

export const fabricObjectSerializer = (fabricObject: FabricObjectExtends): FabricObjectSelected => {
    if (!fabricObject) throw new Error("le fabric object n'est pas renseigné");
    if (!fabricObject.id) throw new Error("id non renseigné");

    const fabricObjectSerialize = JSON.parse(JSON.stringify(fabricObject));

    const object = {
        ...fabricObjectSerialize,
        id: fabricObject.id,
        name: fabricObject.name,
        strokeStyle: fabricObject?.strokeStyle || "none",
        zIndex: fabricObject.zIndex,
        opacity: fabricObject.opacity,
        width: OBJECT_CLEAN_VALUES.getWidth(fabricObject),
        height: OBJECT_CLEAN_VALUES.getHeight(fabricObject),
        evented: fabricObject.evented,
        selectable: fabricObject.selectable,
        hoverCursor: fabricObject.hoverCursor,
    } satisfies FabricObjectSelected;

    if (fabricObject instanceof Circle) {
        object.radius = fabricObject.radius;
    }
    if (fabricObject instanceof Rect) {
        object.borderRadius = fabricObject.borderRadius;
    }
    if (object instanceof IText || object instanceof Textbox) {
        object.lineHeight = fabricObject?.lineHeight as number;
    }

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
    text: (type?: FabricFormType) => type?.toLowerCase()?.includes("text") || false,
    rec: (type?: FabricFormType) => type?.toLowerCase()?.includes("rec") || false,
    circle: (type?: FabricFormType) => type?.toLowerCase()?.includes("circle") || false,
};

export const DEFAULT_INPUT_VALUE = 0;

export const serializedList = (
    objectLists: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>[],
) => {
    return objectLists.map((object, index) => {
        object.set("zIndex", index);
        return fabricObjectSerializer(object);
    });
};

export const getActiveObjectFromLayers = (id: string, canvas: Canvas) => {
    return canvas.getObjects().find((object) => object.id === id);
};

export const duplicateObject = async (object: FabricObject) => {
    const newObject = await object.clone();
    const id = `${object.type}_${uniqid()}`;
    newObject.set({
        id: `${object.type}_${uniqid()}`,
        name: id,
        left: object.left + 10,
        top: object.top + 10,
    });
    return newObject;
};
