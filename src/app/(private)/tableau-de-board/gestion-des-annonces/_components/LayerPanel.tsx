import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpLeftSquare, Circle, ImagePlus, Square, Text, Triangle, Type } from "lucide-react";
import React from "react";
import BackgroundElements from "./BackgroundElements";

const LayerPanel = () => {
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

                    <div className="p-1 w-full grid grid-cols-2 gap-2 py-3">
                        <div>
                            <Label>Hauteur</Label>
                            <Input type="number" min={1} placeholder="Taille en px" /* defaultValue={800} */ />
                        </div>
                        <div>
                            <Label>Largeur</Label>
                            <Input type="number" min={1} placeholder="Taille en px" /* defaultValue={600} */ />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayerPanel;
