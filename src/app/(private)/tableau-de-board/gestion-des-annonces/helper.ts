import { API_INSTANCE } from "@/lib/api";
import { FabricFormType } from "./type";
import { Circle, FabricImage, FabricObject, IText, Polygon, Rect, Textbox, Triangle } from "fabric";

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
            objectCaching: false,
        }),

    [FabricFormType.circle]: () =>
        new Circle({
            top: 100,
            left: 50,
            radius: 50,
            hasBorders: true,
            fill: SHAPE_COLOR,
            objectCaching: false,
        }),
    [FabricFormType.triangle]: () =>
        new Triangle({
            top: 100,
            left: 50,
            width: 50,
            height: 50,
            fill: SHAPE_COLOR,
            objectCaching: false,
        }),
    [FabricFormType.iText]: () =>
        new IText("Texte", {
            top: 100,
            left: 50,
            textAlign: "left",
            editable: true,
            selectable: true,
            hasControls: true,
            fontSize: 18,
            fill: SHAPE_COLOR,
            objectCaching: false,
        }),
    [FabricFormType.start]: () => {
        const points = [
            { x: 349.9, y: 75 },
            { x: 379, y: 160.9 },
            { x: 469, y: 160.9 },
            { x: 397, y: 214.9 },
            { x: 423, y: 300.9 },
            { x: 350, y: 249.9 },
            { x: 276.9, y: 301 },
            { x: 303, y: 215 },
            { x: 231, y: 161 },
            { x: 321, y: 161 },
        ];
        return new Polygon(points, {
            top: 100,
            left: 50,
            width: 100,
            height: 100,
            fill: SHAPE_COLOR,
            objectCaching: false,
        });
    },

    /*  [FabricFormType.image]: async () => {}, */
};
