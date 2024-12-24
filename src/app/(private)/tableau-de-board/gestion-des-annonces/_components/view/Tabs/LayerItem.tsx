import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";

const LayerItem = (props: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Card className="w-full flex py-2 px-3 items-center justify-between">
                <div className=""> {props.item.id}</div>
                <button className="cursor-grab active:cursor-grabbing" {...listeners} {...attributes}>
                    move
                </button>
            </Card>
        </div>
    );
};

export default LayerItem;
