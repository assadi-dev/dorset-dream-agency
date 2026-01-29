import { RichTextEditor } from "@/components/Text/RichTextEditor/RichTextEditor";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import ReleaseForm from "./_components/ReleaseForm";

const ReleaseCard = () => {
    return (
        <Card className="">
            <CardHeader></CardHeader>
            <CardContent className=" p-3">
                <ReleaseForm />
            </CardContent>
        </Card>
    );
};

export default ReleaseCard;
