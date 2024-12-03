import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const LayerPanel = () => {
    return (
        <Card className="h-full min-w-[14rem]">
            <CardHeader>
                <CardTitle>Layers</CardTitle>
            </CardHeader>
            <CardContent>LayerObjects</CardContent>
        </Card>
    );
};

export default LayerPanel;
