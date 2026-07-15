"use client";

import { GripVertical } from "lucide-react";
import { Category } from "./columns";
import { useRowDragHandle } from "@/components/Datatable/TableRowComponents";


type Props = {
    category: Category;
}
export default function RowDragHandleCell({ category }: Props) {
    const handleRef = useRowDragHandle();

    return (
        <div ref={handleRef ?? undefined} className="flex items-center justify-center size-5 cursor-grab">
            <GripVertical className="size-4" />
        </div>
    );
}