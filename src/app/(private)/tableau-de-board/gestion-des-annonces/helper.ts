import { API_INSTANCE } from "@/lib/api";
import { FabricFormType } from "./type";
import { Circle, FabricImage, FabricObject, IText, Rect, Triangle } from "fabric";
import uniqid from "uniqid";

const SHAPE_COLOR = "#01035c";
export const CANVAS_VALUES = {
    height: 480,
    width: 720,
    backgroundColor: "#ffffff",
    stroke: 0,
};

export const fetchBackgroundImages = async () => {
    const result = await API_INSTANCE.get("/announcement/background");
    return result.data;
};

export enum ANNOUNCEMENT_QUERY_KEY {
    BACKGROUND_IMAGES = "BACKGROUND_IMAGES",
}

type ShapeGeneratorType = Record<string, () => Rect | Circle | Triangle | IText>;
export const ShapeGenerator: ShapeGeneratorType = {
    [FabricFormType.rect]: () =>
        new Rect({
            id: uniqid(),
            top: 100,
            left: 50,
            width: 100,
            height: 100,
            fill: SHAPE_COLOR,
        }),

    [FabricFormType.circle]: () =>
        new Circle({
            id: uniqid(),
            top: 100,
            left: 50,
            radius: 50,
            hasBorders: true,
            fill: SHAPE_COLOR,
        }),
    [FabricFormType.triangle]: () =>
        new Triangle({
            id: uniqid(),
            top: 100,
            left: 50,
            width: 50,
            height: 50,
            fill: SHAPE_COLOR,
        }),
    [FabricFormType.iText]: () =>
        new IText("Texte", {
            id: uniqid(),
            top: 100,
            left: 50,
            textAlign: "left",
            editable: true,
            selectable: true,
            hasControls: true,
            fontSize: 14,
            fill: SHAPE_COLOR,
        }),

    /*  [FabricFormType.image]: async () => {}, */
};
