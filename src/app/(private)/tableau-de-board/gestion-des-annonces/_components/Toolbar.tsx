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
import { MousePointer2, Trash2, Type, Shapes, ImagePlus, Square, Circle, Triangle, Star } from "lucide-react";
import ColorPickerInput from "./ColorPicker";
import { Separator } from "@/components/ui/separator";
import TypographieSelect from "./view/select/TypographieSelect";
import { Input } from "@/components/ui/input";
import Decorations from "./view/Decorations/Decorations";
import { CORNER_STYLES, ShapeGenerator } from "../helper";
import { FabricImage } from "fabric";
import { FabricFormType } from "./fabric/FabricContext";
import useFabricAction from "./fabric/useFabric";

const Toolbar = () => {
    const { selected, canvas, setCanvasBackgroundColor, addObjectToLayer, unselectedObject, selectedObject } =
        useFabricAction();

    const type = selected?.type || "";
    const DEFAULT_COLOR = selected ? selected.fill : "#fff";

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

    const IS_TEXT = type?.includes("text");
    const IS_RECT = type?.includes("rect");
    const IS_CIRCLE = type === FabricFormType.circle;

    const changeColor = (value: string) => {
        if (!canvas || !selected) return;
        selected.set("fill", value);
        canvas.renderAll();
        selectedObject(selected);
    };

    //console.log(DEFAULT_COLOR);

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
            {type?.includes("text") && (
                <MenubarMenu>
                    <TypographieSelect object={null} />
                </MenubarMenu>
            )}
            {selected && (
                <MenubarMenu>
                    <div className="border">
                        {<ColorPickerInput defaultColor={DEFAULT_COLOR} onChange={changeColor} />}
                    </div>
                </MenubarMenu>
            )}
            {type?.includes("text") && (
                <MenubarMenu>
                    <div className="border">
                        <Input placeholder="taille de la police" type="number" className="w-[65px]" defaultValue={18} />
                    </div>
                </MenubarMenu>
            )}
            <MenubarMenu>
                <Button
                    variant="ghost"
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground transition"
                >
                    <Trash2 />
                </Button>
            </MenubarMenu>
        </Menubar>
    );
};

export default Toolbar;
