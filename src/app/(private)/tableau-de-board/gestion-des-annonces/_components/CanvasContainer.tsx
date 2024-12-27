"use client";
import React from "react";
import Toolbar from "./Toolbar";
import { Canvas } from "fabric";
import useFabricAction from "./fabric/useFabric";
import { CANVAS_VALUES } from "../helper";
import { FabricObjectExtends } from "../type";
import { handleObjectMoving, clearGuideLines } from "./view/Tabs/snappingHelpers";

const CanvasContainer = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const { canvas, setCanvas } = useFabricAction();

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

    const guidelinesRef = React.useRef({
        canvasWidth: 800,
        canvasHeight: 600,
        lineColor: "red",
        lineWidth: 1,
    });

    const [guideLines, setGuidelines] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (!canvas) return;

        // Écouteur pour déclencher les lignes lors du déplacement des objets
        canvas.on("object:moving", (event) => {
            handleObjectMoving(canvas, event.target, guideLines, setGuidelines);
        });
        canvas.on("object:modified", () => {
            clearGuideLines(canvas);
        });

        /*    return () => {
            canvas.off("object:moving", (event) => {
                handleObjectMoving(canvas, event.target, guideLines, setGuidelines);
            });
            canvas.off("object:modified", () => {
                clearGuideLines(canvas);
            });
        }; */
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
