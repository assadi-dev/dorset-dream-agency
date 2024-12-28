"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpLeftSquare, Circle, ImagePlus, Square, Text, Triangle, Type, Ellipsis, Star } from "lucide-react";
import React from "react";
import BackgroundElements from "./BackgroundElements";
import ColorPickerInput from "./ColorPicker";
import { Slider } from "@/components/ui/slider";
import useFabricAction from "./fabric/useFabric";
import { FabricFormType } from "../type";
import { CORNER_STYLES, ShapeGenerator } from "../helper";
import { FabricImage } from "fabric";
import LayersContent from "./view/Tabs/LayersContent";
import { Separator } from "@/components/ui/separator";

const ElementsPanel = () => {
    const { canvas, setCanvasBackgroundColor, addObjectToLayer } = useFabricAction();

    return (
        <div className="h-full w-[18rem] pt-3 px-1">
            <div className="pt-3  w-full">
                <div className="mt-2">
                    <CardTitle className="text-center p-3">Calques</CardTitle>
                </div>
                <div className=" p-3 mt-1 flex items-center justify justify-between">
                    <Button size="sm" variant="ghost">
                        <p className="text-xs flex items-center gap-2">
                            <Square className="w-4 h-4" /> Sélectionner
                        </p>
                    </Button>
                    <Button size="sm" variant="ghost">
                        <p className="text-xs"> Grouper</p>
                    </Button>
                </div>
                <Separator className="my-3" />
                <ScrollArea className=" h-[70vh]">
                    <LayersContent />
                </ScrollArea>
            </div>
        </div>
    );
};

export default ElementsPanel;
