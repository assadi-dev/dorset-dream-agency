"use client";
import React from "react";
import useFabricAction from "../../fabric/useFabric";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowDown, ArrowUp, ArrowUpToLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { FabricObjectExtends } from "../../../type";
import { closestCenter, DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import Draggable from "./LayerItem";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import LayerItem from "./LayerItem";
import { restrictToVerticalAxis, restrictToParentElement, restrictToWindowEdges } from "@dnd-kit/modifiers";

const LayersContent = () => {
    const { layers, selected, moveObjectTo, setLayers } = useFabricAction();

    const CLASS_ACTIVE = "bg-primary/50 text-white text-semibold";
    const isActive = (object: FabricObjectExtends) => (object.id === selected?.id ? CLASS_ACTIVE : "");

    const { isOver, setNodeRef } = useDroppable({
        id: "droppable",
    });
    const style = {
        color: isOver ? "green" : undefined,
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = layers.findIndex((item) => item.id === active.id);
            const newIndex = layers.findIndex((item) => item.id === over.id);
            const newArray = arrayMove(layers, oldIndex, newIndex);

            setLayers(newArray);
        }
    };

    const layerIdentifiers = layers.map((v) => v.id) as string[];

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            onDragStart={() => {}}
            onDragEnd={handleDragEnd}
        >
            <div ref={setNodeRef} style={style}>
                <SortableContext id="layers-container" items={layerIdentifiers} strategy={verticalListSortingStrategy}>
                    {layers.length > 0 && layers.map((item) => <LayerItem key={item.id} object={item as any} />)}
                </SortableContext>
            </div>
        </DndContext>
    );
};

export default LayersContent;
