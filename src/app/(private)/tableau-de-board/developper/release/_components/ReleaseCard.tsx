"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { ReleaseFormInfer } from "./schema";
import { useReleaseApi } from "../_hooks/useReleaseApi";
import LoadingReleaseData from "./Loading";
import ReleaseForm from "./forms/ReleaseForm";
import uniqid from "uniqid";

const ReleaseCard = () => {
    const { data, isLoading, updateVersion, updateVersionFields } = useReleaseApi();

    const saveReleaseField = async (values: ReleaseFormInfer) => {
        if (values.version != data?.version) {
            await updateVersion({ version: values.version });
        }

        const fieldMapped = values.fields.map((f) => ({ name: f.name, value: f.value }));
        await updateVersionFields({ fields: fieldMapped });
    };

    const releaseSize = data?.release?.length || 0;

    const defaultValues = {
        version: data?.version ?? "",
        fields:
            data?.release?.slice(0, releaseSize - 1)?.map((f) => ({
                id: uniqid(),
                ...f,
            })) ?? [],
    } satisfies ReleaseFormInfer;

    return (
        <Card className="">
            <CardContent className=" p-3">
                {isLoading ? (
                    <LoadingReleaseData />
                ) : (
                    <ReleaseForm onSubmit={saveReleaseField} defaultValues={defaultValues} />
                )}
            </CardContent>
        </Card>
    );
};

export default ReleaseCard;
