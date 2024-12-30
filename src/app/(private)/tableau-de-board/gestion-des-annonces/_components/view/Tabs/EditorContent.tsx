import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import useFabricAction from "../../fabric/useFabric";
import ColorPickerInput from "../../ColorPicker";
import { OBJECT_CLEAN_VALUES, VALIDE_TYPE } from "../../fabric/helpers";
import { FabricFormType } from "../../fabric/FabricContext";
import { Button } from "@/components/ui/button";
import { IText } from "fabric";
import { Select } from "@/components/ui/select";
import BordureSelect from "../select/BordureSelect";
import TypographieSelect from "../select/TypographieSelect";
import {
    setBottomPosition,
    setCenterPosition,
    setHorizontalCenterPosition,
    setRightPosition,
    setTopPosition,
    setVerticalCenterPosition,
} from "../../fabric/lib/object/align_positions";
import Decorations from "../Decorations/Decorations";
import TextAlignement from "../Decorations/TextAlignement";
import ObjectAlignements from "../Decorations/ObjectAlignement";
import ObjectLayout from "../Objects/ObjectLayout";
import TextSizeAndColor from "../Decorations/TextSizeAndColor";
import { ScrollArea } from "@/components/ui/scroll-area";

const EditorContent = () => {
    const { canvas, selected } = useFabricAction();

    const type = selected?.type as FabricFormType;

    const setBackground = (value: string) => {
        if (!selected) return;
        if (type === FabricFormType.iText)
            selected.set({
                backgroundColor: value,
            });
        else
            selected.set({
                fill: value,
            });

        canvas?.renderAll();
    };
    const handleChangeTextColor = (value: string) => {
        if (!selected) return;

        selected.set({
            fill: value,
        });

        canvas?.renderAll();
    };
    const handleChangeFontSize = (e: any) => {
        if (!selected) return;
        const { value } = e.target;
        selected.set({
            fontSize: value,
        });
        canvas?.renderAll();
    };

    const handleChangeFontFamily = (e: any) => {};
    const handleChangeBorderRadius = (e: any) => {
        if (!selected) return;
        const { value } = e.target;
        selected.set({
            rx: value * (1 / selected.scaleX),
            ry: value * (1 / selected.scaleY),
        });
        canvas?.renderAll();
    };
    const handleChangeOpacity = (e: any) => {
        if (!selected) return;
        const { value } = e.target;
        const opacity = Number((value * 0.01).toFixed(2));
        selected.set({
            opacity: opacity,
        });
        canvas?.renderAll();
    };

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

    const handleClickPos = () => {
        if (!canvas || !selected) return;
        setCenterPosition(canvas, selected);
        canvas?.requestRenderAll();
    };

    return (
        <div className="flex flex-col gap-2  h-full  text-sm w-fit bg-white p-5 rounded-xl shadow-lg">
            <ScrollArea className="h-[72vh] py-3 px-3 xl:px-6">
                <div className="mb-3">
                    <ObjectAlignements />
                </div>
                <ObjectLayout />
                {VALIDE_TYPE.circle(type) && (
                    <div className="mb-3">
                        <TextSizeAndColor />
                    </div>
                )}
                {VALIDE_TYPE.circle(type) && (
                    <div className="flex items-center gap-1 justify-between mb-3">
                        <TextAlignement />
                        <Decorations />
                    </div>
                )}
                {!VALIDE_TYPE.circle(type) && (
                    <div className="mb-3 p-1">
                        <BordureSelect object={selected} />
                    </div>
                )}

                {/*  
                TODO Ajouter les ombre et floue
         
            <div>
                    <Label className=" text-xs">Effet</Label>
                </div> */}
            </ScrollArea>
        </div>
    );
};

export default EditorContent;
