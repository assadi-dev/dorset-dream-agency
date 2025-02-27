import { API_INSTANCE } from "@/lib/api";
import { CustomCornerProps, FabricFormType } from "./type";
import { Circle, IText, Polygon, Rect, Textbox, Triangle } from "fabric";

export const SHAPE_COLOR = "#01035c";
export const CANVAS_VALUES = {
    height: 480,
    width: 720,
    backgroundColor: "#ffffff",
    stroke: 0,
};

export const CORNER_STYLES: CustomCornerProps = {
    cornerStyle: "circle",
    cornerColor: "white",
    transparentCorners: false,
    cornerStrokeColor: SHAPE_COLOR,
};

export const fetchBackgroundImages = async () => {
    const result = await API_INSTANCE.get("/announcements/background");
    return result.data;
};

export enum ANNOUNCEMENT_QUERY_KEY {
    BACKGROUND_IMAGES = "BACKGROUND_IMAGES",
    GET_ANNOUNCEMENT_COLLECTIONS = "GET_ANNOUNCEMENT_COLLECTIONS",
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
            noScaleCache: false,
            strokeUniform: true,
            ...CORNER_STYLES,
        }),

    [FabricFormType.circle]: () =>
        new Circle({
            top: 100,
            left: 50,
            radius: 50,
            hasBorders: true,
            fill: SHAPE_COLOR,
            objectCaching: false,
            noScaleCache: false,
            strokeUniform: true,
            ...CORNER_STYLES,
        }),
    [FabricFormType.triangle]: () =>
        new Triangle({
            top: 100,
            left: 50,
            width: 50,
            height: 50,
            fill: SHAPE_COLOR,
            objectCaching: false,
            noScaleCache: false,
            strokeUniform: true,
            ...CORNER_STYLES,
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
            noScaleCache: false,
            strokeUniform: true,
            ...CORNER_STYLES,
        }),
    [FabricFormType.textbox]: () =>
        new Textbox("Texte", {
            top: 100,
            left: 50,
            textAlign: "left",
            editable: true,
            selectable: true,
            hasControls: true,
            fontSize: 18,
            fill: SHAPE_COLOR,
            objectCaching: false,
            lockScalingY: true,
            noScaleCache: false,
            strokeUniform: true,
            ...CORNER_STYLES,
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
            noScaleCache: false,
            strokeUniform: true,
            ...CORNER_STYLES,
        });
    },

    /*  [FabricFormType.image]: async () => {}, */
};

export enum ObjectPositionAlignement {
    vertical_start = "vertical-start",
    vertical_middle = "vertical-middle",
    vertical_end = "vertical-end",
    horizontal_start = "horizontal-start",
    horizontal_center = "horizontal-center",
    horizontal_end = "horizontal-end",
}
