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

    return (
        <div className="w-fit bg-white rounded-xl shadow-lg">
            {" "}
            <ScrollArea className="h-[72vh] py-3 ">
                <div className="flex flex-col gap-2  p-3 xl:p-5  h-full  text-sm ">
                    <div className="mb-3">
                        <ObjectAlignements />
                    </div>
                    <ObjectLayout />
                    {VALIDE_TYPE.text(type) && (
                        <div className="mb-3">
                            <TextSizeAndColor />
                        </div>
                    )}
                    {VALIDE_TYPE.text(type) && (
                        <div className="flex items-center gap-1 justify-between mb-3">
                            <TextAlignement />
                            <Decorations />
                        </div>
                    )}
                    {
                        <div className="mb-3 p-1">
                            <BordureSelect />
                        </div>
                    }

                    {/*  
                TODO Ajouter les ombre et floue
         
            <div>
                    <Label className=" text-xs">Effet</Label>
                </div> */}
                </div>
            </ScrollArea>
        </div>
    );
};

export default EditorContent;
