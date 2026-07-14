"use client";

import { GripVertical } from "lucide-react";
import { Category } from "./columns";

type Props = {
    category: Category;
}
export default function DragHandleRows({ category }: Props) {
    return (
        <div className="flex items-center justify-center size-5 cursor-grab">
            <GripVertical className="size-4" />
        </div>
    );
}