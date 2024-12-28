import { Button } from "@/components/ui/button";
import React from "react";
import { Strikethrough, Underline, Italic, Bold } from "lucide-react";
import useFabricAction from "../../fabric/useFabric";
import { IText } from "fabric";
import TextAlignement from "./TextAlignement";

const Decorations = () => {
    const { canvas, selected } = useFabricAction();

    const type = selected?.type;

    const handleClickBold = () => {
        if (!selected && !canvas) return;
        const text = selected as IText;
        if (text.isEditing) {
            const styles = text.getSelectionStyles();

            const fontWeight =
                styles[0].fontWeight !== "bold" || styles[0].fontWeight === undefined ? "bold" : "normal";

            text.setSelectionStyles({
                fontWeight: fontWeight,
            });
        }

        canvas?.requestRenderAll();
    };

    const handleClickLineThrough = () => {
        if (!selected && !canvas) return;
        const text = selected as IText;
        if (text.isEditing) {
            const styles = text.getSelectionStyles();

            const fontWeight =
                styles[0].fontWeight !== "bold" || styles[0].fontWeight === undefined ? "bold" : "normal";

            text.setSelectionStyles({
                fontWeight: fontWeight,
            });
        }

        canvas?.requestRenderAll();
    };
    const handleClickUnderline = () => {
        if (!selected && !canvas) return;
        const text = selected as IText;
        if (text.isEditing) {
            const styles = text.getSelectionStyles();

            const underline = styles[0].underline !== true || styles[0].underline === undefined ? true : false;

            text.setSelectionStyles({
                underline: underline,
            });
        }

        canvas?.requestRenderAll();
    };

    const handleClickItalique = () => {
        if (!selected && !canvas) return;
        const text = selected as IText;
        if (text.isEditing) {
            const styles = text.getSelectionStyles();

            const fontStyle =
                styles[0].fontStyle !== "italic" || styles[0].fontStyle === undefined ? "italic" : "normal";

            console.log(fontStyle);

            text.setSelectionStyles({
                fontStyle,
            });
        }

        canvas?.requestRenderAll();
    };

    const handleClickStrikethrough = () => {
        if (!selected || !canvas) return;
        const text = selected as IText;
        if (text.isEditing) {
            const styles = text.getSelectionStyles();

            const linethrough = styles[0].linethrough !== true || styles[0].linethrough === undefined ? true : false;

            text.setSelectionStyles({
                linethrough,
            });
        }

        canvas?.requestRenderAll();
    };

    return (
        <>
            <Button size={"icon"} variant="outline" type="button" onClick={handleClickBold}>
                <Bold className="w-4" />
            </Button>
            <Button size={"icon"} variant="outline" type="button" onClick={handleClickItalique}>
                <Italic className="w-4" />
            </Button>
            <Button size={"icon"} variant="outline" type="button" onClick={handleClickUnderline}>
                <Underline className="w-4" />
            </Button>
            <Button size={"icon"} variant="outline" type="button" onClick={handleClickStrikethrough}>
                <Strikethrough className="w-4" />
            </Button>
        </>
    );
};

export default Decorations;
