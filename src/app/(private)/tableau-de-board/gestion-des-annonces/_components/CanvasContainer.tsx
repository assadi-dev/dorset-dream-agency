"use client";
import React from "react";
import Toolbar from "./Toolbar";
import { Canvas } from "fabric";
import useFabricAction from "./fabric/useFabric";
import { CANVAS_VALUES } from "../helper";

const CanvasContainer = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const { setCanvas } = useFabricAction();

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

    return (
        <div className="canvas-container p-3 pt-0 ">
            <div className={`w-fit mx-auto`}>
                {/*   <Toolbar /> */}
                <canvas
                    id="canvas"
                    className="canvas-container__canvas border w-[800px] h-[600px] rounded shadow mx-auto"
                    ref={canvasRef}
                />
            </div>
        </div>
    );
};

export default CanvasContainer;
