"use client";
import React from "react";
import { Canvas, FabricObject, TFiller } from "fabric";

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
    id: string | null;
    type: string | FabricFormType;
    width?: number;
    height?: number;
    left: number;
    top: number;
    fill?: string | TFiller | null;
    stroke?: string | TFiller | null;
    strokeWidth?: number;
    strokeStyle?: "none" | "solid" | "dashed";
    borderRadius: number;
    angle: number;
    radius?: number;
    opacity: number;
    zIndex?: number;
};

export type FabricObjectExtends = FabricObject & {
    id?: string;
    zIndex?: number;
    strokeStyle?: "none" | "solid" | "dashed";
};

export type CustomCornerProps = {
    cornerStyle: "rect" | "circle";
    cornerColor: string;
    transparentCorners: boolean;
    cornerStrokeColor: string;
};
