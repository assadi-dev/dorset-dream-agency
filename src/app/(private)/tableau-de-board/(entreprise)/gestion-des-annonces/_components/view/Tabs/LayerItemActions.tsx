import { FabricObject } from "fabric";
import useFabricAction from "../../fabric/useFabric";
import { Trash2, Eye, EyeOff, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { FabricObjectExtends } from "../../../type";
import { getActiveObjectFromLayers } from "../../fabric/helpers";

export const LockedBtn = ({ object }: { object?: FabricObject }) => {
    const { canvas, setLayers } = useFabricAction();

    const handleClickLock = () => {
        if (object?.id && canvas) {
            const fabricObject = getActiveObjectFromLayers(object.id, canvas);
            if (!fabricObject) return;

            fabricObject.set({
                evented: !object?.evented,
                selectable: !object?.evented,
                hoverCursor: !object?.evented ? "pointer" : "default",
            });
            object?.evented ? canvas.discardActiveObject() : canvas.setActiveObject(fabricObject);
            canvas.requestRenderAll();
            setLayers(canvas.getObjects());
        }
    };

    return (
        <button onClick={handleClickLock}>
            {object?.evented ? <LockKeyholeOpen size={14} /> : <LockKeyhole size={14} />}
        </button>
    );
};

export const VisibleBtn = ({ object }: { object?: FabricObject }) => {
    const { canvas, setLayers } = useFabricAction();
    const isVisible = object?.visible;
    const handleClickVisible = () => {
        if (object?.id && canvas) {
            const fabricObject = getActiveObjectFromLayers(object.id, canvas);
            if (!fabricObject) return;
            fabricObject.toggle("visible");
            canvas.requestRenderAll();
            setLayers(canvas.getObjects());
        }
    };

    return <button onClick={handleClickVisible}>{isVisible ? <Eye size={14} /> : <EyeOff size={14} />}</button>;
};

export const RemoveButton = ({ object }: { object?: FabricObjectExtends }) => {
    const { canvas, setLayers } = useFabricAction();

    const handleClickRemove = () => {
        if (object?.id && canvas) {
            const fabricObject = getActiveObjectFromLayers(object.id, canvas);
            if (!fabricObject) return;
            canvas.remove(fabricObject);
            canvas.requestRenderAll();
            setLayers(canvas.getObjects());
        }
    };

    return (
        <button onClick={handleClickRemove}>
            <Trash2 size={14} />
        </button>
    );
};
