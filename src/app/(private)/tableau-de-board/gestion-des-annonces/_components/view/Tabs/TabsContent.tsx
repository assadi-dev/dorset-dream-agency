import React from "react";
import { TabsEditorType } from "../../../type";
import { Layers } from "lucide-react";
import LayersContent from "./LayersContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditorContent from "./EditorContent";
import ExportContent from "./ExportContent";

export const TabsListElement: TabsEditorType[] = [
    {
        id: "tabs-layers",
        label: "Calques",
        icon: <Layers />,
        content: <LayersContent />,
    },
    {
        id: "tabs-editor",
        label: "Éditeur",
        icon: <Layers />,
        content: <EditorContent />,
    },
    {
        id: "tabs-export",
        label: "Export",
        icon: <Layers />,
        content: <ExportContent />,
    },
];

const TabsEditorContent = () => {
    return (
        <Tabs defaultValue={TabsListElement[1].id} className="w-[24rem] ">
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
