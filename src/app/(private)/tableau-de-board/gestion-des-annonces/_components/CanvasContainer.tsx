import React from "react";
import Toolbar from "./Toolbar";

const CanvasContainer = () => {
    return (
        <div className="canvas-container p-3 pt-0">
            <Toolbar />
            <div className="canvas-container__canvas p-3 "></div>
        </div>
    );
};

export default CanvasContainer;
