import { Button } from "@/components/ui/button";
import React from "react";
import { AlignLeft, AlignRight, AlignCenter, AlignJustify } from "lucide-react";
import useFabricAction from "../../fabric/useFabric";
import { getActiveObjectFromLayers } from "../../fabric/helpers";
import { IText, Textbox } from "fabric";

const TextAlignement = () => {
    const { canvas, selected, updateObject } = useFabricAction();

    const handleClickAlign = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!canvas) return;
        if (!selected?.id) return;
        const object = getActiveObjectFromLayers(selected.id, canvas);
        const value = event.currentTarget.dataset?.align;
        if (object instanceof IText || object instanceof Textbox) {
            object.set("textAlign", value);
            canvas.requestRenderAll();
            updateObject(object);
        }
    };

    return (
        <>
            <Button size={"icon"} data-align="left" variant="outline" type="button" onClick={handleClickAlign}>
                <AlignLeft />
            </Button>
            <Button size={"icon"} data-align="center" variant="outline" type="button" onClick={handleClickAlign}>
                <AlignCenter />
            </Button>
            <Button size={"icon"} data-align="right" variant="outline" type="button" onClick={handleClickAlign}>
                <AlignRight />
            </Button>
            {/*  <Button size={"icon"} data-align="justify" variant="outline" type="button" onClick={handleClickAlign}>
        <AlignJustify />
    </Button> */}
        </>
    );
};

export default TextAlignement;
