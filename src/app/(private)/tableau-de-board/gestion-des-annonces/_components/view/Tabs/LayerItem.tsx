import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Card } from "@/components/ui/card";
import { GripVertical, Trash2, Eye, EyeOff } from "lucide-react";
import { LockedBtn, RemoveButton, VisibleBtn } from "./LayerItemActions";
import { FabricObjectExtends } from "../../../type";

type LayerItemProps = {
    object: FabricObjectExtends;
};
const LayerItem = ({ object }: LayerItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: object.id as string });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Card className="w-full flex py-2 px-3 items-center justify-between rounded">
                <button type="button" className="cursor-grab active:cursor-grabbing" {...listeners} {...attributes}>
                    <GripVertical size={16} />
                </button>
                <div className="text-xs max-w-[80%] text-ellipsis text-nowrap overflow-hidden"> {object.name}</div>
                <div className="flex items-center gap-1">
                    <LockedBtn object={object} />
                    <VisibleBtn object={object} />
                    <RemoveButton object={object} />
                </div>
            </Card>
        </div>
    );
};

export default LayerItem;
