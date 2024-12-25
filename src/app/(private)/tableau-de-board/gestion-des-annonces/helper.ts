import { API_INSTANCE } from "@/lib/api";
import { FabricFormType } from "./type";
import { Circle, FabricImage, FabricObject, IText, Rect, Textbox, Triangle } from "fabric";

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
            top: 100,
            left: 50,
            width: 100,
            height: 100,
            fill: SHAPE_COLOR,
        }),

    [FabricFormType.circle]: () =>
        new Circle({
            top: 100,
            left: 50,
            radius: 50,
            hasBorders: true,
            fill: SHAPE_COLOR,
        }),
    [FabricFormType.triangle]: () =>
        new Triangle({
            top: 100,
            left: 50,
            width: 50,
            height: 50,
            fill: SHAPE_COLOR,
        }),
    [FabricFormType.iText]: () =>
        new IText("Texte", {
            top: 100,
            left: 50,
            textAlign: "left",
            editable: true,
            selectable: true,
            hasControls: false,
            fontSize: 18,
            fill: SHAPE_COLOR,
            lockScalingY: true,
        }),

    /*  [FabricFormType.image]: async () => {}, */
};
