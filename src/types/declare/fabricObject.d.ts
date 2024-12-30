import { FabricObject } from "fabric";

declare module "fabric" {
    // to have the properties recognized on the instance and in the constructor
    interface FabricObject {
        id?: string;
        name?: string;
        zIndex?: number;
        borderRadius?: number;
    }
    // to have the properties typed in the exported object
    interface SerializedObjectProps {
        id?: string;
        name?: string;
        zIndex?: number;
        borderRadius?: number;
    }
}
