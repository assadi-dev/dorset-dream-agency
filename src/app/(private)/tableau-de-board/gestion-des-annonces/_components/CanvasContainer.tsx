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

const CanvasContainer = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const { canvas, setCanvas } = useFabricAction();
    const [guideLines, setGuidelines] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: CANVAS_VALUES.width,
                height: CANVAS_VALUES.height,
            });
            initCanvas.backgroundColor = CANVAS_VALUES.backgroundColor;
            initCanvas.renderAll();
            setCanvas(initCanvas);

            return () => {
                initCanvas.dispose();
            };
        }
    }, []);

    React.useEffect(() => {
        if (!canvas) return;
        canvas.on("after:render", () => {
            const object = canvas.getActiveObject();
            object && drawGuidelines(canvas, object);
        });

        initAligningGuidelines(canvas, {
            closeHLine: false,
            closeVLine: false,
        });
    }, [canvas]);

    return (
        <div className="canvas-container p-3 pt-0 ">
            <div className={`w-fit mx-auto`}>
                {/*   <Toolbar /> */}
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
