import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import useFabricAction from "../../fabric/useFabric";
import { Radius, DraftingCompass, Blend, Scan, Palette } from "lucide-react";
import ColorPickerInput from "../../ColorPicker";
import { DEFAULT_INPUT_VALUE, getActiveObjectFromLayers, VALIDE_TYPE } from "../../fabric/helpers";
import { FabricFormType } from "../../fabric/FabricContext";
import { Rect } from "fabric";

const ObjectLayout = () => {
    const { canvas, selected, updateObject } = useFabricAction();

    const type = selected?.type as FabricFormType;

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        if (!selected || !canvas) return;
        const object = getActiveObjectFromLayers(selected.id as string, canvas);
        if (!object) return;
        switch (name) {
            case "borderRadius":
                if (object instanceof Rect) {
                    object.set({
                        borderRadius: Number(value),
                        rx: (Number(value) * 1) / object.scaleX,
                        ry: (Number(value) * 1) / object.scaleY,
                    });
                }
                break;
            case "opacity":
                object.set({
                    opacity: Number(value) * 0.01,
                });

                break;
            case "width":
                object.set({
                    width: Number(value) / object.scaleX,
                });
                object.setCoords();
                break;
            case "height":
                object.set({
                    height: Number(value) / object.scaleY,
                });
                object.setCoords();
                break;
            default:
                object.set(name, Number(value));
                object.setCoords();
                break;
        }
        canvas.renderAll();
        updateObject(object);
    };

    const handleChangeBackgroundColor = (value: string) => {
        if (!selected || !canvas) return;
        const object = getActiveObjectFromLayers(selected.id as string, canvas);
        if (!object) return;
        object.set("fill", value);
        canvas.renderAll();
        updateObject(object);
    };

    return (
        <div className="grid grid-cols-2 row-[auto] gap-3 w-full ">
            <div className="flex items-center gap-3">
                <Label className="text-xs" htmlFor="left">
                    X
                </Label>
                <Input
                    id="left"
                    name="left"
                    className="text-xs"
                    type="number"
                    placeholder="0"
                    value={selected?.left}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="flex items-center gap-3">
                <Label htmlFor="top" className=" text-xs">
                    Y
                </Label>
                <Input
                    id="top"
                    name="top"
                    type="number"
                    placeholder="0"
                    value={selected?.top}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="flex items-center gap-3">
                <Label className="text-xs" htmlFor="width">
                    W
                </Label>
                <Input
                    id="width"
                    name="width"
                    className="text-xs"
                    type="number"
                    placeholder="w"
                    value={selected?.width}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="flex items-center gap-3">
                <Label htmlFor="height" className=" text-xs">
                    H
                </Label>
                <Input
                    id="height"
                    name="height"
                    type="number"
                    placeholder="0"
                    value={selected?.height}
                    onChange={handleChangeInput}
                />
            </div>

            <div className="flex items-center gap-3">
                <Label htmlFor="angle" className=" text-xs">
                    <DraftingCompass className="w-5" />
                </Label>
                <Input
                    id="angle"
                    name="angle"
                    type="number"
                    placeholder="0"
                    value={selected?.angle}
                    onChange={handleChangeInput}
                />
            </div>
            <div>
                {VALIDE_TYPE.circle(type) && (
                    <div className="flex items-center gap-3">
                        <Label htmlFor="radius" className=" text-xs">
                            <Radius className="w-5" />
                        </Label>
                        <Input
                            id="radius"
                            name="radius"
                            type="number"
                            placeholder="0"
                            value={selected?.radius}
                            onChange={handleChangeInput}
                        />
                    </div>
                )}
            </div>

            {!VALIDE_TYPE.text(type) && (
                <div className="flex items-center gap-3">
                    <Label htmlFor="backgroundColor" className=" text-xs">
                        <Palette className="w-5" />
                    </Label>

                    <ColorPickerInput
                        defaultColor={(selected?.fill as string) || "#fff"}
                        onChange={handleChangeBackgroundColor}
                    />
                </div>
            )}

            <div className="flex items-center gap-3">
                <Label htmlFor="opacity" className=" text-xs">
                    <Blend className="w-5" />
                </Label>
                <Input
                    id="opacity"
                    name="opacity"
                    type="number"
                    placeholder="100"
                    value={selected?.opacity && selected?.opacity * 100}
                    onChange={handleChangeInput}
                    min={0}
                    step={5}
                    max={100}
                />
            </div>

            {VALIDE_TYPE.rec(type) && (
                <div className="flex items-center gap-3">
                    <Label htmlFor="borderRadius" className=" text-xs">
                        <Scan className="w-5" />
                    </Label>
                    <Input
                        id="borderRadius"
                        name="borderRadius"
                        type="number"
                        placeholder="0"
                        value={selected?.borderRadius}
                        onChange={handleChangeInput}
                    />
                </div>
            )}
        </div>
    );
};

export default ObjectLayout;
