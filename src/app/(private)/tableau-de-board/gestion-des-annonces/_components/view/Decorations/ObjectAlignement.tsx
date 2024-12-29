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
import { getCurrentOject } from "../../fabric/helpers";

const ObjectAlignements = () => {
    const { canvas, selected } = useFabricAction();

    const fabricObject = React.useMemo(() => {
        if (!canvas) return null;
        return getCurrentOject(canvas, selected?.id);
    }, [canvas, selected]);

    const handleClickObjectAlign = (event: React.MouseEvent<HTMLButtonElement>) => {
        const data_position = event.currentTarget.dataset;
        if (data_position.position && fabricObject && canvas) {
            const position = data_position.position;
            switch (position) {
                case ObjectPositionAlignement.horizontal_start:
                    setTopPosition(fabricObject);
                    break;
                case ObjectPositionAlignement.horizontal_center:
                    setHorizontalCenterPosition(canvas, fabricObject);
                    break;
                case ObjectPositionAlignement.horizontal_end:
                    setBottomPosition(canvas, fabricObject);
                    break;
                case ObjectPositionAlignement.vertical_start:
                    setLeftPosition(fabricObject);
                    break;
                case ObjectPositionAlignement.vertical_middle:
                    setVerticalCenterPosition(canvas, fabricObject);
                    break;
                case ObjectPositionAlignement.vertical_end:
                    setRightPosition(canvas, fabricObject);
                    break;
            }
            canvas?.renderAll();
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
