"use client";
import React from "react";
import Toolbar from "./Toolbar";
import { Canvas } from "fabric";
import useFabricAction from "./fabric/useFabric";
import { CANVAS_VALUES } from "../helper";
import { FabricObjectExtends } from "../type";
import { handleObjectMoving, clearGuideLines } from "./view/Tabs/snappingHelpers";
import { initAligningGuidelines } from "./fabric/lib/aligning_guidelines";
import { initCanvasGuidelines } from "./fabric/lib/canvasGuidline";
import { drawGuidelines, isNearCenter } from "./fabric/lib/canvasGuidline/utils";

type CanvasContainerProps = {
    canvasObject?: any;
};
const CanvasContainer = ({ canvasObject }: CanvasContainerProps) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const { canvas, setCanvas, setLayers } = useFabricAction();

    React.useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: CANVAS_VALUES.width,
                height: CANVAS_VALUES.height,
            });
            initCanvas.backgroundColor = CANVAS_VALUES.backgroundColor;
            initCanvas.requestRenderAll();
            setCanvas(initCanvas);

            return () => {
                initCanvas.dispose();
            };
        }
    }, []);

    React.useEffect(() => {
        if (!canvas) return;
        const loadCanvasObjectSaves = async () => {
            if (canvasObject && canvas) {
                await canvas.loadFromJSON(canvasObject);
                canvasObject?.objects.length > 0 && setLayers(canvasObject?.objects);
            }
        };
        canvas.on("after:render", () => {
            const object = canvas.getActiveObject();
            object && drawGuidelines(canvas, object);
        });

        initAligningGuidelines(canvas, {
            closeHLine: false,
            closeVLine: false,
        });
        if (canvasObject) loadCanvasObjectSaves();
    }, [canvas, canvasObject]);

    return (
        <div className="canvas-container p-3 pt-0 ">
            <div className={`grid grid-rows-[auto,1fr] w-fit mx-auto h-full gap-5`}>
                {<Toolbar />}
                <canvas
                    id="canvas"
                    className={`canvas-container__canvas border  shadow mx-auto `}
                    ref={canvasRef}
                    width={CANVAS_VALUES.width}
                    height={CANVAS_VALUES.height}
                />
            </div>
        </div>
    );
};

export default CanvasContainer;
