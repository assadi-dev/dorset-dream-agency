"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpLeftSquare, Circle, ImagePlus, Square, Text, Triangle, Type } from "lucide-react";
import React from "react";
import BackgroundElements from "./BackgroundElements";
import ColorPickerInput from "./ColorPicker";
import { Slider } from "@/components/ui/slider";
import useFabricAction from "./fabric/useFabric";

const ElementsPanel = () => {
    const { canvas } = useFabricAction();
    const handleChangeCanvasColor = (value: any) => {
        if (!canvas) return;
        canvas.backgroundColor = value;
        canvas.renderAll();
    };

    return (
        <div className="h-full w-[18rem] pt-3 px-1">
            <div className="pt-3  w-full">
                <div>
                    <CardTitle>Elements</CardTitle>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))]  gap-1 p-1 w-full py-2 sm:w-[12rem]">
                        <Button variant="outline" className="h-full w-full">
                            <Square />
                        </Button>
                        <Button variant="outline" className="h-full w-full">
                            <Circle />
                        </Button>
                        <Button variant="outline" className="h-full w-full">
                            <Triangle />
                        </Button>
                        <Button variant="outline" className="h-full w-full">
                            <Type />
                        </Button>
                        <Button variant="outline" className="h-full w-full">
                            <ArrowUpLeftSquare />
                        </Button>
                        <Button variant="outline" className="h-full w-full">
                            <ImagePlus />
                        </Button>
                    </div>
                </div>

                <div className="mt-2">
                    <CardTitle>Arrière plans</CardTitle>
                    <ScrollArea className="h-[280px] w-full py-2 pr-2">
                        <React.Suspense fallback="yellow">
                            <BackgroundElements />
                        </React.Suspense>
                    </ScrollArea>
                </div>
                <div className="mt-2">
                    <CardTitle>Canvas</CardTitle>

                    <div className="p-1 w-full grid grid-cols-2 gap-2 ">
                        <div>
                            <Label>Largeur</Label>
                            <Input type="number" min={1} defaultValue={canvas?.width} disabled />
                        </div>
                        <div>
                            <Label>Hauteur</Label>
                            <Input type="number" min={1} defaultValue={canvas?.height} disabled />
                        </div>
                    </div>
                    <div>
                        <Label>Couleur</Label>
                        <ColorPickerInput onChange={handleChangeCanvasColor} />
                    </div>
                    <div>
                        <Label>Zoom</Label>
                        <Slider defaultValue={[100]} max={200} min={10} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElementsPanel;