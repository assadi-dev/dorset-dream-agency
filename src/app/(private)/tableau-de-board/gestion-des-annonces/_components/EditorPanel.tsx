import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const EditorPanel = () => {
    return (
        <Card className="h-full min-w-[18rem]">
            <CardHeader>
                <CardTitle>Layer</CardTitle>
            </CardHeader>
            <CardContent>LayerObjects</CardContent>
        </Card>
    );
};

export default EditorPanel;
