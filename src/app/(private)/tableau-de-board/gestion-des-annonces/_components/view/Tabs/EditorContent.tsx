import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import useFabricAction from "../../fabric/useFabric";
import ColorPickerInput from "../../ColorPicker";
import { OBJECT_CLEAN_VALUES } from "../../fabric/helpers";
import { FabricFormType } from "../../fabric/FabricContext";
import { Button } from "@/components/ui/button";
import { IText } from "fabric";

const EditorContent = () => {
    const { canvas, selected } = useFabricAction();

    const type = selected?.type;

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
            rx: value,
            ry: value,
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

    return (
        <div className="flex flex-col gap-2  p-3 h-full w-full text-sm">
            <div className="mb-5">
                <CardTitle className="mb-2">Dimensions</CardTitle>
                <CardTitle className="mb-1">Taille</CardTitle>
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <Label className=" text-xs">Hauteur</Label>
                        <Input type="number" placeholder="Hauteur" />
                    </div>
                    <div>
                        <Label className=" text-xs">Largeur</Label>
                        <Input type="number" placeholder="Largeur" />
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <div className=" mb-5">
                    <CardTitle className="mb-1">Position</CardTitle>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <Label className=" text-xs">X</Label>
                            <Input type="number" />
                        </div>
                        <div>
                            <Label className=" text-xs">Y</Label>
                            <Input type="number" />
                        </div>
                        <div>
                            <Label className=" text-xs">Rotation</Label>
                            <Input type="number" defaultValue={0} />
                        </div>
                    </div>
                </div>
                <div className=" mb-3">
                    <CardTitle className="mb-3">Apparence</CardTitle>

                    <div className="mb-3">
                        <CardTitle className="mb-2 text-xs">Remplissage</CardTitle>
                        <div className="flex justify-between">
                            <ColorPickerInput onChange={setBackground} />
                        </div>
                    </div>

                    <div className="">
                        <div>
                            <Label className=" text-xs">Typographie</Label>
                            <div className="grid grid-cols-[auto,1fr,1fr] items-center gap-3">
                                <ColorPickerInput onChange={handleChangeTextColor} />
                                <Input defaultValue="sans-serif" name="fontFamily" />
                                <Input type="number" defaultValue="18" onChange={handleChangeFontSize} />
                            </div>
                            <div className="grid grid-cols-[auto,1fr,1fr] items-center gap-3">
                                <Button variant="outline" type="button" onClick={handleClickBold}>
                                    <strong>G</strong>
                                </Button>
                            </div>
                            <div className="">
                                <Label className="text-xs">Alignement</Label>
                                <div className="grid grid-cols-2"></div>
                            </div>
                            <div className="">
                                <Label className="text-xs">Décoration</Label>
                                <div className="grid grid-cols-2"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                                <Label className=" text-xs">opacité</Label>
                                <Input
                                    type="number"
                                    onChange={handleChangeOpacity}
                                    min={0}
                                    max={100}
                                    defaultValue={100}
                                />
                            </div>
                            <div>
                                <Label className=" text-xs">arrondie</Label>
                                <Input type="number" onChange={handleChangeBorderRadius} defaultValue={0} />
                            </div>
                        </div>
                        <div>
                            <Label className=" text-xs">Bordure</Label>
                            {/*  <Input type="number" min={0} onChange={handleChangeBorderRadius} /> */}
                        </div>

                        <div>
                            <Label className=" text-xs">Effet</Label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorContent;
