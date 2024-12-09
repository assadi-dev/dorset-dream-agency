"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
                // handleObjectSelection(null);
                unselectedObject();
                // clearSettings();
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
