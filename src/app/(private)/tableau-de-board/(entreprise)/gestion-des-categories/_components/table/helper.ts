import { DragEndEvent } from "@dnd-kit/react";
import { Category } from "./columns";

export const createPayloadReorder = (event: DragEndEvent) => {
            const { source, target } = event.operation;
            const data = source?.data as Category;
            if (!data) return;
            const { initialIndex, index } = source as any;

            if (initialIndex === index) return;

            // On utilise les vrais orderPosition (celui de la catégorie déplacée
            // et celui de la catégorie sur laquelle elle est déposée) plutôt que
            // les index de la page, qui divergent dès qu'il y a pagination
            const targetData = target?.data as Category | undefined;
            const oldPosition = data.orderPosition ?? initialIndex;
            const newPosition = targetData?.orderPosition ?? index;

            if (oldPosition === newPosition) return;

            const payload = {
                id: Number(data.id),
                name: data.name,
                oldPosition,
                newPosition,
            }

            return payload;
}