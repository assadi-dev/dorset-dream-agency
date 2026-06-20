"use client";
import { BasicTransformEvent, Canvas, FabricObject, TPointerEvent } from "fabric";
import React from "react";
import { drawGuidelines } from "./utils";

type TransformEvent = BasicTransformEvent<TPointerEvent> & {
    target: FabricObject;
};
export const initCanvasGuidelines = (canvas: Canvas) => {
    canvas.on("object:moving", (event: TransformEvent) => {
        const object = event.target;
        drawGuidelines(canvas, object);
    });
};
