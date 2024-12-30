import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import useFabricAction from "../../fabric/useFabric";
import { Radius, DraftingCompass, Blend, Scan, Palette } from "lucide-react";
import ColorPickerInput from "../../ColorPicker";
import { DEFAULT_INPUT_VALUE, getActiveObjectFromLayers, VALIDE_TYPE } from "../../fabric/helpers";
import { FabricFormType } from "../../fabric/FabricContext";

const ObjectLayout = () => {
    const { canvas, selected } = useFabricAction();

    const type = selected?.type as FabricFormType;

    const handleChangeInput = () => {
        if (!selected || !canvas) return;
        const object = getActiveObjectFromLayers(selected.id as string, canvas);
        if (!object) return;
    };

    const handleChangeBackgroundColor = () => {
        if (!selected || !canvas) return;
        const object = getActiveObjectFromLayers(selected.id as string, canvas);
        if (!object) return;
    };

    return (
        <div className="grid grid-cols-2 row-[auto] gap-3 w-full">
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
                    defaultValue={selected?.left || DEFAULT_INPUT_VALUE}
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
                    defaultValue={selected?.top || DEFAULT_INPUT_VALUE}
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
                    defaultValue={selected?.width || DEFAULT_INPUT_VALUE}
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
                    defaultValue={selected?.height || DEFAULT_INPUT_VALUE}
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
                    placeholder="100"
                    defaultValue={selected?.angle || DEFAULT_INPUT_VALUE}
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
                            defaultValue={selected?.radius || DEFAULT_INPUT_VALUE}
                        />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3">
                <Label htmlFor="backgroundColor" className=" text-xs">
                    <Palette className="w-5" />
                </Label>

                <ColorPickerInput defaultColor={selected?.fill || "#fff"} onChange={handleChangeBackgroundColor} />
            </div>

            <div className="flex items-center gap-3">
                <Label htmlFor="opacity" className=" text-xs">
                    <Blend className="w-5" />
                </Label>
                <Input id="opacity" name="opacity" type="number" placeholder="100" defaultValue={100} />
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
                        placeholder="100"
                        defaultValue={selected?.borderRadius || DEFAULT_INPUT_VALUE}
                    />
                </div>
            )}
        </div>
    );
};

export default ObjectLayout;
