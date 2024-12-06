import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpLeftSquare, Circle, ImagePlus, Square, Text, Triangle, Type } from "lucide-react";
import React from "react";

const LayerPanel = () => {
    return (
        <div className="h-full min-w-[14rem] pt-3 px-1">
            <div className="pt-3  w-full">
                <CardTitle>Elements</CardTitle>
                <ScrollArea className="h-[200px] w-full py-2">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))]  gap-1 p-1 w-full">
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
                </ScrollArea>
            </div>
        </div>
    );
};

export default LayerPanel;
