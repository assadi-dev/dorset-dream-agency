import { Button } from "@/components/ui/button";
import React from "react";
import { Strikethrough, Underline, Italic, Bold } from "lucide-react";
import useFabricAction from "../../fabric/useFabric";
import { IText, Textbox } from "fabric";
import TextAlignement from "./TextAlignement";
import { getActiveObjectFromLayers } from "../../fabric/helpers";

const Decorations = () => {
    const { canvas, selected, updateObject } = useFabricAction();

    const type = selected?.type;

    const handleClickBold = () => {
        if (!canvas) return;
        if (!selected?.id) return;
        const object = getActiveObjectFromLayers(selected.id, canvas);
        if (object instanceof IText || object instanceof Textbox) {
            if (object.isEditing) {
                const styles = object.getSelectionStyles();
                const fontWeight =
                    styles[0].fontWeight !== "bold" || styles[0].fontWeight === undefined ? "bold" : "normal";
                object.setSelectionStyles({
                    fontWeight: fontWeight,
                });
            }
            canvas.requestRenderAll();
            updateObject(object);
        }
    };

    const handleClickUnderline = () => {
        if (!canvas) return;
        if (!selected?.id) return;
        const object = getActiveObjectFromLayers(selected.id, canvas);
        if (object instanceof IText || object instanceof Textbox) {
            if (object.isEditing) {
                const styles = object.getSelectionStyles();
                const underline = styles[0].underline !== true || styles[0].underline === undefined ? true : false;

                object.setSelectionStyles({
                    underline: underline,
                });
            }
            canvas.requestRenderAll();
            updateObject(object);
        }
    };

    const handleClickItalique = () => {
        if (!canvas) return;
        if (!selected?.id) return;
        const object = getActiveObjectFromLayers(selected.id, canvas);
        if (object instanceof IText || object instanceof Textbox) {
            if (object.isEditing) {
                const styles = object.getSelectionStyles();
                const fontStyle =
                    styles[0].fontStyle !== "italic" || styles[0].fontStyle === undefined ? "italic" : "normal";

                object.setSelectionStyles({
                    fontStyle,
                });
            }
            canvas.requestRenderAll();
            updateObject(object);
        }
    };

    const handleClickStrikethrough = () => {
        if (!canvas) return;
        if (!selected?.id) return;
        const object = getActiveObjectFromLayers(selected.id, canvas);
        if (object instanceof IText || object instanceof Textbox) {
            if (object.isEditing) {
                const styles = object.getSelectionStyles();

                const linethrough =
                    styles[0].linethrough !== true || styles[0].linethrough === undefined ? true : false;

                object.setSelectionStyles({
                    linethrough,
                });
            }

            canvas?.requestRenderAll();
            updateObject(object);
        }
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
