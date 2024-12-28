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

const ObjectAlignements = () => {
    const handleClickObjectAlign = () => {};

    return (
        <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
            <Button size={"icon"} variant="outline" type="button" onClick={handleClickObjectAlign}>
                <AlignStartHorizontal />
            </Button>
            <Button size={"icon"} variant="outline" type="button" onClick={handleClickObjectAlign}>
                <AlignCenterHorizontal />
            </Button>
            <Button size={"icon"} variant="outline" type="button" onClick={handleClickObjectAlign}>
                <AlignEndHorizontal />
            </Button>
            <Button size={"icon"} variant="outline" type="button" onClick={handleClickObjectAlign}>
                <AlignStartVertical />
            </Button>
            <Button size={"icon"} variant="outline" type="button" onClick={handleClickObjectAlign}>
                <AlignCenterVertical />
            </Button>
            <Button size={"icon"} variant="outline" type="button" onClick={handleClickObjectAlign}>
                <AlignEndVertical />
            </Button>
        </div>
    );
};

export default ObjectAlignements;
