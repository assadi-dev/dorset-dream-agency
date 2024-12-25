import { FabricObject } from "fabric";
import useFabricAction from "../../fabric/useFabric";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { FabricObjectExtends } from "../../../type";

export const VisibleBtn = ({ object }: { object?: FabricObject }) => {
    const { canvas, setLayers } = useFabricAction();
    const isVisible = object?.visible;
    const handleClickVisible = () => {
        if (object && canvas) {
            object.toggle("visible");
            canvas.requestRenderAll();
            setLayers(canvas.getObjects());
        }
    };

    return <button onClick={handleClickVisible}>{isVisible ? <Eye size={14} /> : <EyeOff size={14} />}</button>;
};

export const RemoveButton = ({ object }: { object?: FabricObjectExtends }) => {
    const { canvas, setLayers } = useFabricAction();

    const handleClickRemove = () => {
        if (object && canvas) {
            canvas.remove(object);
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
