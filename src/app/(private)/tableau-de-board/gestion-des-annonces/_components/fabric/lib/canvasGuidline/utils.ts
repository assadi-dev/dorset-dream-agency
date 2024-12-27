import { Canvas } from "fabric";
import { FabricObjectExtends } from "../../../../type";
import { aligningLineConfig } from "../aligning_guidelines/constant";

const SNAPPING_DISTANCE = 10;

// Fonction pour dessiner les lignes directrices
export const drawGuidelines = (canvas: Canvas, object: FabricObjectExtends) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const left = object.left;
    const top = object.top;
    const right = left + object.width * object.scaleX;
    const bottom = top + object.height * object.scaleY;

    const centerX = left + (object.width * object.scaleX) / 2;
    const centerY = top + (object.height * object.scaleY) / 2;

    const ctx = initContext(canvas, object);
    ctx.save();
    if (Math.abs(centerY - canvasHeight / 2) < SNAPPING_DISTANCE) drawHorizontalGuideline(ctx, canvas, object);
    if (Math.abs(centerX - canvasWidth / 2) < SNAPPING_DISTANCE) drawVerticalGuideline(ctx, canvas, object);
    ctx.restore();
};

export const isNearCenter = (canvas: Canvas, object: FabricObjectExtends) => {
    const tolerance = 10;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const canvasCenterX = canvasWidth / 2;
    const canvasCenterY = canvasHeight / 2;

    const objectCenterX = object.left + (object.width * object.scaleX) / 2;
    const objectCenterY = object.top + (object.height * object.scaleY) / 2;

    // Vérifie si l'objet est dans la zone de tolérance autour du centre du canvas
    return Math.abs(objectCenterX - canvasCenterX) <= tolerance && Math.abs(objectCenterY - canvasCenterY) <= tolerance;
};

export const initContext = (canvas: Canvas, object: FabricObjectExtends) => {
    const ctx = canvas.getSelectionContext();
    const viewportTransform = canvas.viewportTransform;

    ctx.transform(
        viewportTransform[0],
        viewportTransform[1],
        viewportTransform[2],
        viewportTransform[3],
        viewportTransform[4],
        viewportTransform[5],
    );
    ctx.strokeStyle = aligningLineConfig.color;
    ctx.lineWidth = aligningLineConfig.width;
    ctx.setLineDash([2.4, 2.4]);
    return ctx;
};

export const drawVerticalGuideline = (ctx: CanvasRenderingContext2D, canvas: Canvas, object: FabricObjectExtends) => {
    const zoom = canvas.getZoom();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.beginPath();
    ctx.moveTo((canvasWidth / 2) * zoom, 0);
    ctx.lineTo((canvasWidth / 2) * zoom, canvasHeight * zoom);
    ctx.stroke();
};
export const drawHorizontalGuideline = (ctx: CanvasRenderingContext2D, canvas: Canvas, object: FabricObjectExtends) => {
    const zoom = canvas.getZoom();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, (canvasHeight / 2) * zoom);
    ctx.lineTo(canvasWidth * zoom, (canvasHeight / 2) * zoom);
    ctx.stroke();
};
