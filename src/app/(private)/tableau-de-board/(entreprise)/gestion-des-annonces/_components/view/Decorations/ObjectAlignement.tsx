import React from "react";
import { Button } from "@/components/ui/button";
import {
    AlignStartHorizontal,
    AlignCenterHorizontal,
    AlignEndHorizontal,
    AlignStartVertical,
    AlignCenterVertical,
    AlignEndVertical,
} from "lucide-react";
import {
    setHorizontalCenterPosition,
    setRightPosition,
    setTopPosition,
    setBottomPosition,
    setLeftPosition,
    setVerticalCenterPosition,
} from "../../fabric/lib/object/align_positions";
import { ObjectPositionAlignement } from "../../../helper";
import useFabricAction from "../../fabric/useFabric";
import { FabricObjectExtends } from "../../../type";

const ObjectAlignements = () => {
    const { canvas, selectedObject } = useFabricAction();

    const handleClickObjectAlign = (event: React.MouseEvent<HTMLButtonElement>) => {
        const data_position = event.currentTarget.dataset;
        if (data_position.position && canvas) {
            const object = canvas.getActiveObject() as FabricObjectExtends;
            const position = data_position.position;
            switch (position) {
                case ObjectPositionAlignement.horizontal_start:
                    setTopPosition(object);
                    break;
                case ObjectPositionAlignement.horizontal_center:
                    setHorizontalCenterPosition(canvas, object);
                    break;
                case ObjectPositionAlignement.horizontal_end:
                    setBottomPosition(canvas, object);
                    break;
                case ObjectPositionAlignement.vertical_start:
                    setLeftPosition(object);
                    break;
                case ObjectPositionAlignement.vertical_middle:
                    setVerticalCenterPosition(canvas, object);
                    break;
                case ObjectPositionAlignement.vertical_end:
                    setRightPosition(canvas, object);
                    break;
            }
            canvas?.renderAll();
            selectedObject(object);
        }
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
            <Button
                size={"icon"}
                variant="outline"
                type="button"
                data-position={ObjectPositionAlignement.horizontal_start}
                onClick={handleClickObjectAlign}
            >
                <AlignStartHorizontal />
            </Button>
            <Button
                size={"icon"}
                variant="outline"
                type="button"
                data-position={ObjectPositionAlignement.horizontal_center}
                onClick={handleClickObjectAlign}
            >
                <AlignCenterHorizontal />
            </Button>
            <Button
                size={"icon"}
                variant="outline"
                type="button"
                data-position={ObjectPositionAlignement.horizontal_end}
                onClick={handleClickObjectAlign}
            >
                <AlignEndHorizontal />
            </Button>
            <Button
                size={"icon"}
                variant="outline"
                type="button"
                data-position={ObjectPositionAlignement.vertical_start}
                onClick={handleClickObjectAlign}
            >
                <AlignStartVertical />
            </Button>
            <Button
                size={"icon"}
                variant="outline"
                type="button"
                data-position={ObjectPositionAlignement.vertical_middle}
                onClick={handleClickObjectAlign}
            >
                <AlignCenterVertical />
            </Button>
            <Button
                size={"icon"}
                variant="outline"
                type="button"
                data-position={ObjectPositionAlignement.vertical_end}
                onClick={handleClickObjectAlign}
            >
                <AlignEndVertical />
            </Button>
        </div>
    );
};

export default ObjectAlignements;
