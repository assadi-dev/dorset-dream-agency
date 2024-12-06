import React from "react";
import Toolbar from "./Toolbar";

const CanvasContainer = () => {
    return (
        <div className="canvas-container p-3 pt-0">
            {/*  <Toolbar /> */}
            <div className="canvas-container__canvas p-3 border w-[800pw] h-[600px] rounded my-3 bg-white shadow"></div>
        </div>
    );
};

export default CanvasContainer;
