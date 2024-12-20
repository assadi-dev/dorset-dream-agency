import React from "react";
import { TabsEditorType } from "../../../type";
import { Layers } from "lucide-react";
import LayersContent from "./LayersContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditorContent from "./EditorContent";
import ExportContent from "./ExportContent";
import useFabricAction from "../../fabric/useFabric";

export const TabsListElement: TabsEditorType[] = [
    {
        id: "tabs-apparence",
        label: "Apparence",
        icon: <Layers />,
        content: <EditorContent />,
    },
    {
        id: "tabs-layers",
        label: "Calques",
        icon: <Layers />,
        content: <LayersContent />,
    },
    {
        id: "tabs-export",
        label: "Export",
        icon: <Layers />,
        content: <ExportContent />,
    },
];

const TabsEditorContent = () => {
    const { canvas, selected } = useFabricAction();
    if (selected) {
        console.log("type sélectionné", selected?.type);
        console.log("object :>> ", selected);
    }

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
