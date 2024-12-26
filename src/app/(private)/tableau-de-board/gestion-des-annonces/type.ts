"use client";
import React from "react";
import { Canvas, FabricObject } from "fabric";

export type BackgroundImageApiResponse = {
    name: string;
    url: string;
};

export type TabsEditorType = {
    id: string;
    label: string;
    icon?: React.ReactElement;
    content?: React.ReactElement;
};

export enum FabricFormType {
    rect = "rect",
    circle = "circle",
    iText = "i-text",
    image = "image",
    triangle = "triangle",
    start = "start",
    textbox = "textbox",
}

export type ActionReducer = {
    type: string;
    payload?: any;
};

export type FabricObjectSelected = {
    type: FabricFormType;
    width?: number;
    height?: number;
    x: number;
    y: number;
    fill?: string;
    stroke?: string;
    angle: number;
    diameter: number;
};

export type FabricObjectExtends = FabricObject & { id?: string; zIndex?: number };

export type CustomCornerProps = {
    cornerStyle: "rect" | "circle";
    cornerColor: string;
    transparentCorners: boolean;
    cornerStrokeColor: string;
};
