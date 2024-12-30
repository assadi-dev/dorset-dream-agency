import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import useFabricAction from "../../fabric/useFabric";
import { Radius, DraftingCompass, Blend, Scan, Palette } from "lucide-react";
import ColorPickerInput from "../../ColorPicker";
import { DEFAULT_INPUT_VALUE, VALIDE_TYPE } from "../../fabric/helpers";
import { FabricFormType } from "../../fabric/FabricContext";

const ObjectLayout = () => {
    const { canvas, selected } = useFabricAction();

    const type = selected?.type as FabricFormType;

    return (
        <div className="grid grid-cols-2 row-3 gap-3 w-full">
            <div className="flex items-center gap-3">
                <Label className="text-xs" htmlFor="x">
                    X
                </Label>
                <Input
                    id="x"
                    className="text-xs"
                    type="number"
                    placeholder="0"
                    defaultValue={selected?.left || DEFAULT_INPUT_VALUE}
                />
            </div>
            <div className="flex items-center gap-3">
                <Label htmlFor="y" className=" text-xs">
                    Y
                </Label>
                <Input id="y" type="number" placeholder="0" defaultValue={selected?.top || DEFAULT_INPUT_VALUE} />
            </div>
            <div className="flex items-center gap-3">
                <Label className="text-xs" htmlFor="w">
                    W
                </Label>
                <Input
                    id="w"
                    className="text-xs"
                    type="number"
                    placeholder="w"
                    defaultValue={selected?.width || DEFAULT_INPUT_VALUE}
                />
            </div>
            <div className="flex items-center gap-3">
                <Label htmlFor="h" className=" text-xs">
                    H
                </Label>
                <Input id="h" type="number" placeholder="H" defaultValue={selected?.width || DEFAULT_INPUT_VALUE} />
            </div>
            {VALIDE_TYPE.circle(type) && (
                <div className="flex items-center gap-3">
                    <Label htmlFor="radius" className=" text-xs">
                        <Radius className="w-5" />
                    </Label>
                    <Input
                        id="radius"
                        type="number"
                        placeholder="50"
                        defaultValue={selected?.radius || DEFAULT_INPUT_VALUE}
                    />
                </div>
            )}
            <div className="flex items-center gap-3">
                <Label htmlFor="rotate" className=" text-xs">
                    <DraftingCompass className="w-5" />
                </Label>
                <Input
                    id="rotate"
                    type="number"
                    placeholder="100"
                    defaultValue={selected?.angle || DEFAULT_INPUT_VALUE}
                />
            </div>

            <div className="flex items-center gap-3">
                <Label htmlFor="opacity" className=" text-xs">
                    <Blend className="w-5" />
                </Label>
                <Input id="opacity" type="number" placeholder="100" defaultValue={100} />
            </div>
            <div className="flex items-center gap-3">
                <Label htmlFor="backgroundColor" className=" text-xs">
                    <Palette className="w-5" />
                </Label>
                {<ColorPickerInput />}
            </div>
            <div className="flex items-center gap-3">
                <Label htmlFor="rounded" className=" text-xs">
                    <Scan className="w-5" />
                </Label>
                <Input
                    id="rounded"
                    type="number"
                    placeholder="100"
                    defaultValue={selected?.borderRadius || DEFAULT_INPUT_VALUE}
                />
            </div>
        </div>
    );
};

export default ObjectLayout;
