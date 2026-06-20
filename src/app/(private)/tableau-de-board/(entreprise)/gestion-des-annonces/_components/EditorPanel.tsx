"use client";
import React from "react";
import TabsEditorContent from "./view/Tabs/TabsContent";
import useFabricAction from "./fabric/useFabric";
import { FabricObjectExtends } from "../type";
import { BasicTransformEvent, FabricObject, Rect, TEvent, TPointerEvent } from "fabric";

type EditorPanelProps = {
    announce?: any;
};
const EditorPanel = ({ announce }: EditorPanelProps) => {
    const { canvas, selectedObject, updateObject, unselectedObject } = useFabricAction();

    const scaleHandler = (
        event: BasicTransformEvent<TPointerEvent> & {
            target: FabricObject;
        },
    ) => {
        const object = event.target;

        if (object instanceof Rect) {
            const objectClone = { borderRadius: object.borderRadius || 0 };
            object.set({
                rx: objectClone.borderRadius * (1 / object.scaleX),
                ry: objectClone.borderRadius * (1 / object.scaleY),
            });
        }

        updateObject(object);
    };
    const objectUpdateHandler = (
        event: BasicTransformEvent<TPointerEvent> & {
            target: FabricObject;
        },
    ) => {
        const object = event.target;
        if (object instanceof Rect) {
            const objectClone = { borderRadius: object.borderRadius || 0 };
            object.set({
                rx: objectClone.borderRadius * (1 / object.scaleX),
                ry: objectClone.borderRadius * (1 / object.scaleY),
            });
        }

        updateObject(object);
    };

    const selectHandler = (
        event: Partial<TEvent<TPointerEvent>> & {
            selected: FabricObject[];
            deselected: FabricObject[];
        },
    ) => {
        const object = event.selected[0];
        selectedObject(object);
    };

    React.useEffect(() => {
        if (canvas) {
            canvas.on("selection:created", selectHandler);
            canvas.on("selection:updated", selectHandler);
            canvas.on("object:modified", objectUpdateHandler);
            canvas.on("object:scaling", scaleHandler);

            return () => {
                canvas.off("selection:created", selectHandler);
                canvas.off("selection:updated", selectHandler);
                canvas.off("object:scaling", scaleHandler);
                canvas.off("object:modified", objectUpdateHandler);
            };
        }
    }, [canvas]);
    return <TabsEditorContent announce={announce} />;
};

export default EditorPanel;
