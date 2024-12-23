"use client";
import React from "react";
import useFabricAction from "../../fabric/useFabric";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowDown, ArrowUp, ArrowUpToLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { FabricObjectExtends } from "../../../type";

const LayersContent = () => {
    const { layers, selected, moveObjectTo } = useFabricAction();

    const CLASS_ACTIVE = "bg-primary/50 text-white text-semibold";
    const isActive = (object: FabricObjectExtends) => (object.id === selected?.id ? CLASS_ACTIVE : "");

    const moveUp = (object: any) => {
        if (!object) return;
        console.log("uo", object);

        const index = layers.findIndex((layer) => layer.id === object.id);
        if (index === 0) return;
        console.log(index);

        const newIndex = index - 1;
        console.log("new", newIndex);
        moveObjectTo(object, newIndex);
    };
    const moveDown = (object: any) => {
        if (!object) return;
        const index = layers.findIndex((layer) => layer.id === object.id);

        const newIndex = index + 1;

        moveObjectTo(object, newIndex);
    };
    console.log(layers);

    return (
        <div className="flex flex-col gap-1">
            {layers.map((object) => (
                <Card
                    key={object?.id}
                    className={cn("w-full flex py-2 px-3 items-center justify-between", isActive(object))}
                >
                    <div> {`${object.type}-${object.zIndex}`} </div>
                    <div className="flex flex-col">
                        <button className="active:opacity-50 p-1 px-2" onClick={() => moveUp(object)}>
                            <ArrowUp size={12} />{" "}
                        </button>
                        <button className="active:opacity-50 p-1 px-2" onClick={() => moveDown(object)}>
                            <ArrowDown size={12} />{" "}
                        </button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default LayersContent;
