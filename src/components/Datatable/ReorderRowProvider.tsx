"use client"

import { DragEndEvent } from '@dnd-kit/dom';
import { RestrictToElement } from '@dnd-kit/dom/modifiers';
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import { DragDropProvider } from "@dnd-kit/react";



type Props = {
    children: React.ReactNode;
    restrictElement?: HTMLElement | null;
    onDragEnd?: (event: DragEndEvent) => void;
}
export default function ReorderRowProvider({ children, restrictElement, onDragEnd }: Props) {
    return (
        <DragDropProvider
            onDragEnd={onDragEnd}
            modifiers={(defaults) => [...defaults, RestrictToVerticalAxis, RestrictToElement.configure({ element: restrictElement })]}

        >
            {children}
        </DragDropProvider>
    );
}