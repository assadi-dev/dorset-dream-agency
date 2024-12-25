"use client";
import React from "react";
import TabsEditorContent from "./view/Tabs/TabsContent";
import useFabricAction from "./fabric/useFabric";

const EditorPanel = () => {
    const { canvas, selectedObject, unselectedObject } = useFabricAction();
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
                selectedObject(object);
            });
        }
    }, [canvas]);
    return <TabsEditorContent />;
};

export default EditorPanel;
