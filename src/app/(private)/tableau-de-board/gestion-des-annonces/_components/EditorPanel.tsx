"use client";
import React from "react";
import TabsEditorContent from "./view/Tabs/TabsContent";
import useFabricAction from "./fabric/useFabric";
import { FabricObjectExtends } from "../type";

const EditorPanel = () => {
    const { canvas, selectedObject, unselectedObject } = useFabricAction();

    const guidelinesRef = React.useRef({
        canvasWidth: 800,
        canvasHeight: 600,
        lineColor: "red",
        lineWidth: 1,
    });

    React.useEffect(() => {
        if (canvas) {
            canvas.on("selection:created", (event) => {
                const object = event.selected[0];
                selectedObject(object);
            });
            canvas.on("selection:updated", (event) => {
                const object = event.selected[0];
                selectedObject(object);
            });
            canvas.on("selection:cleared", () => {
                unselectedObject();
            });
            canvas.on("object:modified", (event) => {
                const object = event.target;
                selectedObject(object);
            });

            canvas.on("object:scaling", (event) => {
                const object = event.target;

                /*    if (object.type.includes("i-text")) {
                    const originalWidth = object.width * object.scaleX;
                    const originalHeight = object.height * object.scaleY;
                    object.set({
                        width: originalWidth,
                        height: originalHeight,
                        scaleX: 1,
                        scaleY: 1,
                    });
                } */

                /*   if (["rect", "triangle"].includes(object.type)) {
                    console.log("hrllo");

                    object.set({
                        rx: 10 * (1 / object.scaleX),
                        ry: 10 * (1 / object.scaleY),
                    });
                } */

                // selectedObject(object);
            });
        }
    }, [canvas]);
    return <TabsEditorContent />;
};

export default EditorPanel;
