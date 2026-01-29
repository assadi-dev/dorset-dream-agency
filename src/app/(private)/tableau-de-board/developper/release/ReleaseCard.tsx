"use client";
import { RichTextEditor } from "@/components/Text/RichTextEditor/RichTextEditor";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import ReleaseForm from "./_components/ReleaseForm";
import { ReleaseFormInfer } from "./_components/schema";

const ReleaseCard = () => {
    const saveReleaseField = async (values: ReleaseFormInfer) => {};

    return (
        <Card className="">
            <CardHeader></CardHeader>
            <CardContent className=" p-3">
                <ReleaseForm onSubmit={saveReleaseField} />
            </CardContent>
        </Card>
    );
};

export default ReleaseCard;
