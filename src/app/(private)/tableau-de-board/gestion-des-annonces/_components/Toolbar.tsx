import React from "react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { MousePointer2, Trash2, Type, Shapes, ImagePlus, Square, Circle, Triangle, Star, Copy } from "lucide-react";
import ColorPickerInput from "./ColorPicker";
import { Separator } from "@/components/ui/separator";
import TypographieSelect from "./view/select/TypographieSelect";
import { Input } from "@/components/ui/input";
import Decorations from "./view/Decorations/Decorations";
import { CORNER_STYLES, ShapeGenerator } from "../helper";
import { FabricImage, IText, Textbox } from "fabric";
import { FabricFormType } from "./fabric/FabricContext";
import useFabricAction from "./fabric/useFabric";
import { duplicateObject, getActiveObjectFromLayers, VALIDE_TYPE } from "./fabric/helpers";

const Toolbar = () => {
    const { selected, canvas, setLayers, addObjectToLayer, unselectedObject, updateObject } = useFabricAction();

    const type = selected?.type || "";
    const DEFAULT_COLOR = selected ? (selected.fill as string) : "#fff";

    const addShape = (shape: FabricFormType) => {
        if (!canvas) return;
        const object = ShapeGenerator[shape]();
        addObjectToLayer(object);
    };

    const addImage = async () => {
        if (!canvas) return;
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();
        const generateImageObject = async (event: any) => {
            const file = event.target?.files[0];
            const reader = URL.createObjectURL(file);
            const image = await FabricImage.fromURL(reader, { crossOrigin: "anonymous" }, { ...CORNER_STYLES });
            image.scaleToHeight(100);
            image.scaleToWidth(200);
            addObjectToLayer(image);
            URL.revokeObjectURL(reader);
        };
        input.addEventListener("change", generateImageObject);

        return () => {
            input.removeEventListener("change", generateImageObject);
            input.remove();
        };
    };
    const CLASS_ACTIVE_SELECT = canvas && canvas?.getActiveObjects().length > 0 ? "default" : "ghost";
    const unSelectAll = () => {
        if (!canvas) return;
        canvas.discardActiveObject();
        canvas.renderAll();
        unselectedObject();
    };

    const changeColor = (value: string) => {
        if (!canvas || !selected?.id) return;
        const object = getActiveObjectFromLayers(selected.id, canvas);
        if (!object) return;
        object.set("fill", value);
        canvas.renderAll();
        updateObject(object);
    };

    const changeFontSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!canvas || !selected?.id) return;
        const value = event.currentTarget.value;
        const object = getActiveObjectFromLayers(selected.id, canvas);
        if (object instanceof IText || object instanceof Textbox) {
            object.set("fontSize", value);
            object.exitEditing();
            object.setCoords();
            canvas.renderAll();
            updateObject(object);
        }
    };

    const duplicate = async () => {
        if (!canvas || !selected?.id) return;
        const object = getActiveObjectFromLayers(selected.id, canvas);
        if (!object) return;
        const newObject = await duplicateObject(object);
        addObjectToLayer(newObject);
    };

    const handleClickRemove = () => {
        if (selected?.id && canvas) {
            const fabricObject = getActiveObjectFromLayers(selected.id, canvas);
            if (!fabricObject) return;
            canvas.remove(fabricObject);
            canvas.requestRenderAll();
            setLayers(canvas.getObjects());
        }
    };

    return (
        <Menubar className=" py-6 mx-auto  ">
            <MenubarMenu>
                <Button size={"icon"} variant={CLASS_ACTIVE_SELECT} onClick={unSelectAll}>
                    <MousePointer2 />
                </Button>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger asChild>
                    <Button variant="ghost">
                        <Shapes />{" "}
                    </Button>
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={() => addShape(FabricFormType.rect)}>
                        {" "}
                        <div className="flex items-center justify-between w-full">
                            Rectangle
                            <Square className="w-4 h-4" />
                        </div>
                    </MenubarItem>
                    <MenubarItem onClick={() => addShape(FabricFormType.circle)}>
                        <div className="flex items-center justify-between w-full">
                            Cercle
                            <Circle className="w-4 h-4" />
                        </div>
                    </MenubarItem>
                    <MenubarItem onClick={() => addShape(FabricFormType.triangle)}>
                        <div className="flex items-center justify-between w-full">
                            Triangle
                            <Triangle className="w-4 h-4" />
                        </div>
                    </MenubarItem>
                    <MenubarItem onClick={() => addShape(FabricFormType.start)}>
                        <div className="flex items-center justify-between w-full">
                            Etoile
                            <Star className="w-4 h-4" />
                        </div>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            {
                <MenubarMenu>
                    <Button variant="ghost" onClick={() => addShape(FabricFormType.textbox)}>
                        <Type />
                    </Button>
                </MenubarMenu>
            }
            <MenubarMenu>
                <Button variant="ghost" onClick={addImage}>
                    <ImagePlus />
                </Button>
            </MenubarMenu>
            <Separator className="h-8" orientation="vertical" />
            {/* Style de l'élément sélectionné */}
            {VALIDE_TYPE.text(type as FabricFormType) && (
                <MenubarMenu>
                    <TypographieSelect />
                </MenubarMenu>
            )}
            {selected && (
                <MenubarMenu>
                    <div className="border">
                        {<ColorPickerInput defaultColor={DEFAULT_COLOR} onChange={changeColor} />}
                    </div>
                </MenubarMenu>
            )}
            {VALIDE_TYPE.text(type as FabricFormType) && (
                <MenubarMenu>
                    <div className="border">
                        <Input
                            placeholder="taille de la police"
                            type="number"
                            className="w-[65px]"
                            value={selected?.fontSize}
                            onChange={changeFontSize}
                        />
                    </div>
                </MenubarMenu>
            )}
            <MenubarMenu>
                <Button variant="ghost" className=" transition" onClick={duplicate}>
                    <Copy />
                </Button>
            </MenubarMenu>
            <MenubarMenu>
                <Button
                    variant="ghost"
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground transition"
                    onClick={handleClickRemove}
                >
                    <Trash2 />
                </Button>
            </MenubarMenu>
        </Menubar>
    );
};

export default Toolbar;
