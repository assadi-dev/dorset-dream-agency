"use client";
import React from "react";
import Toolbar from "./Toolbar";
import { Canvas } from "fabric";
import useFabricAction from "./fabric/useFabric";

const CanvasContainer = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const { canvas, setCanvas } = useFabricAction();

    React.useEffect(() => {
        if (canvasRef.current && !canvas) {
            const canvas = new Canvas(canvasRef.current, {
                width: 800,
                height: 600,
            });
            canvas.backgroundColor = "#ffffff";
            canvas.renderAll();
            setCanvas(canvas);

            return () => {
                canvas.dispose();
            };
        }
    }, []);

    return (
        <div className="canvas-container p-3 pt-0 ">
            <div className="w-[800px] mx-auto">
                {/*   <Toolbar /> */}
                <canvas
                    id="canvas"
                    className="canvas-container__canvas border w-[800px] h-[600px] rounded my-3 shadow mx-auto"
                    ref={canvasRef}
                />
            </div>
        </div>
    );
};

export default CanvasContainer;
