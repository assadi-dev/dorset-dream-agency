//TODO Non utilisé a supprimé
import { Canvas, Line } from "fabric";
import { FabricObjectExtends } from "../../../type";

const SNAPPING_DISTANCE = 10;
export const clearGuideLines = (canvas: Canvas) => {
    const objects = canvas.getObjects("line");
    objects.forEach((obj: FabricObjectExtends) => {
        if ((obj.id && obj.id.startsWith("vertical-")) || (obj.id && obj.id.startsWith("horizontal-"))) {
            canvas.remove(obj);
        }
    });
    canvas.renderAll();
};

export const handleObjectMoving = (
    canvas: Canvas,
    object: FabricObjectExtends,
    guidelines: any[],
    setGuidLines: (guideLines: Line[]) => void,
) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const left = object.left;
    const top = object.top;
    const right = left + object.width * object.scaleX;
    const bottom = top + object.height * object.scaleY;

    const centerX = left + (object.width * object.scaleX) / 2;
    const centerY = top + (object.height * object.scaleY) / 2;

    const newGuidelines: Line[] = [];
    clearGuideLines(canvas);

    let snapped = false;
    //Vertical left
    if (Math.abs(left) < SNAPPING_DISTANCE) {
        object.set({ left: 0 });
        if (!guidelineExists(canvas, "vertical-left")) {
            const line = createVerticalGuideline(canvas, 0, "vertical-left");
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }
    //Horizontal top
    if (Math.abs(top) < SNAPPING_DISTANCE) {
        object.set({ top: 0 });
        if (!guidelineExists(canvas, "horizontal-top")) {
            const line = createHorizontalGuideline(canvas, 0, "horizontal-top");
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }
    //Vertical right
    if (Math.abs(right - canvasWidth) < SNAPPING_DISTANCE) {
        object.set({ left: canvasWidth - object.width * object.scaleX });
        if (!guidelineExists(canvas, "vertical-right")) {
            const line = createVerticalGuideline(canvas, canvasWidth, "vertical-right");
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }
    //Horizontal bottom
    if (Math.abs(bottom - canvasHeight) < SNAPPING_DISTANCE) {
        object.set({ top: canvasHeight - object.height * object.scaleY });
        if (!guidelineExists(canvas, "horizontal-bottom")) {
            const line = createHorizontalGuideline(canvas, canvasWidth, "horizontal-bottom");
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }

    //Vertical center
    if (Math.abs(centerX - canvasWidth / 2) < SNAPPING_DISTANCE) {
        object.set({ left: canvasWidth / 2 - (object.width * object.scaleX) / 2 });
        if (!guidelineExists(canvas, "vertical-center")) {
            const line = createVerticalGuideline(canvas, canvasWidth / 2, "vertical-center");
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }

    //Horizontal center
    if (Math.abs(centerY - canvasHeight / 2) < SNAPPING_DISTANCE) {
        object.set({ top: canvasHeight / 2 - (object.height * object.scaleY) / 2 });
        if (!guidelineExists(canvas, "horizontal-center")) {
            const line = createHorizontalGuideline(canvas, canvasHeight / 2, "horizontal-center");
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }

    !snapped ? clearGuideLines(canvas) : setGuidLines(newGuidelines);

    canvas.renderAll();
};

export const createVerticalGuideline = (canvas: Canvas, x: number, id: string) => {
    return new Line([x, 0, x, canvas.height], {
        id,
        stroke: "red",
        strokeWidth: 1,
        selectable: false,
        evented: false,
        opacity: 0.8,
        strokeDashArray: [5, 5],
    });
};
export const createHorizontalGuideline = (canvas: Canvas, y: number, id: string) => {
    return new Line([0, y, canvas.width, y], {
        id,
        stroke: "red",
        strokeWidth: 1,
        selectable: false,
        evented: false,
        opacity: 0.8,
        strokeDashArray: [5, 5],
    });
};

export const guidelineExists = (canvas: Canvas, id: string) => {
    const objects = canvas.getObjects("line");
    return objects.some((obj: FabricObjectExtends) => obj.id === id);
};
