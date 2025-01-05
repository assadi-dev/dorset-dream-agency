import React from "react";
import { TabsEditorType } from "../../../type";
import { Layers, PictureInPicture } from "lucide-react";
import LayersContent from "./LayersContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditorContent from "./EditorContent";
import ExportContent from "./ExportContent";
import useFabricAction from "../../fabric/useFabric";
import CanvasContent from "./CanvasContent";

type TabsEditorContentProps = {
    announce?: any;
};
const TabsEditorContent = ({ announce }: TabsEditorContentProps) => {
    const { canvas, selected } = useFabricAction();
    const TabsListElement: TabsEditorType[] = [
        {
            id: "tabs-apparence",
            label: "Apparence",
            icon: <Layers />,
            content: <EditorContent />,
        },

        {
            id: "tabs-canvas",
            label: "Canvas",
            icon: <PictureInPicture />,
            content: <CanvasContent />,
        },
        {
            id: "tabs-export",
            label: "Export",
            icon: <Layers />,
            content: <ExportContent defaultValues={announce || null} />,
        },
    ];

    return (
        <Tabs defaultValue={TabsListElement[0].id} className="w-[24rem] ">
            <TabsList className="w-full bg-transparent">
                {TabsListElement.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {TabsListElement.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="text-sm">
                    <div>{tab.content ? tab.content : null}</div>
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default TabsEditorContent;
