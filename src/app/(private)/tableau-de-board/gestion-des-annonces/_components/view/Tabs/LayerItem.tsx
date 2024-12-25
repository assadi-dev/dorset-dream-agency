import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";
import { GripVertical, Trash2, Eye, EyeOff } from "lucide-react";
import { FabricObject } from "fabric";
import useFabricAction from "../../fabric/useFabric";

const VisibleBtn = ({ object }: { object?: FabricObject }) => {
    const { canvas, setLayers } = useFabricAction();
    const isVisible = object?.visible;
    const handleClick = () => {
        if (object && canvas) {
            object.toggle("visible");
            canvas.requestRenderAll();
            setLayers(canvas.getObjects());
        }
    };

    return <button onClick={handleClick}>{isVisible ? <Eye size={14} /> : <EyeOff size={14} />}</button>;
};

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
                <div className="flex items-center gap-1">
                    <VisibleBtn object={props.item} />
                    <button>
                        <Trash2 size={14} />
                    </button>
                    <button type="button" className="cursor-grab active:cursor-grabbing" {...listeners} {...attributes}>
                        <GripVertical size={16} />
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default LayerItem;
