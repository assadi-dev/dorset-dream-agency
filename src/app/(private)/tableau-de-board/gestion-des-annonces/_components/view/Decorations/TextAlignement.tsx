import { Button } from "@/components/ui/button";
import React from "react";
import { AlignLeft, AlignRight, AlignCenter, AlignJustify } from "lucide-react";
import useFabricAction from "../../fabric/useFabric";

const TextAlignement = () => {
    const { canvas, selected } = useFabricAction();

    const type = selected?.type;

    const handleClickAlign = () => {};

    return (
        <>
            <Button size={"icon"} data-position="left" variant="outline" type="button" onClick={handleClickAlign}>
                <AlignLeft />
            </Button>
            <Button size={"icon"} data-position="center" variant="outline" type="button" onClick={handleClickAlign}>
                <AlignCenter />
            </Button>
            <Button size={"icon"} data-position="right" variant="outline" type="button" onClick={handleClickAlign}>
                <AlignRight />
            </Button>
            {/*  <Button size={"icon"} data-position="justify" variant="outline" type="button" onClick={handleClickAlign}>
        <AlignJustify />
    </Button> */}
        </>
    );
};

export default TextAlignement;
