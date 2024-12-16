"use client";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import { declareDeceased } from "@/database/drizzle/repositories/clients";
import useModalState from "@/hooks/useModalState";
import React from "react";
import { setIsDeadClient } from "../../actions";
import FormFieldSwitch from "@/components/forms/FormFieldSwitch";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import useRouteRefresh from "@/hooks/useRouteRefresh";

const DeceasedConfirm = () => {
    const { payload, closeModal } = useModalState();
    payload as { ids: number[]; value: boolean };
    const { refreshWithParams } = useRouteRefresh();
    const [checked, setChecked] = React.useState(true);

    const confirmDeclaration = async () => {
        await setIsDeadClient(payload.ids, checked);
        closeModal();
        refreshWithParams();
    };
    const CLASS_STATE_COLOR = checked
        ? "border-green-600 bg-green-200  text-green-900"
        : "border-destructive bg-red-200 text-red-900";

    return (
        <div>
            <div className="flex justify-between items-center  mb-3">
                <div className="flex items-center  space-x-2 ">
                    <Switch id="isDead" onCheckedChange={setChecked} defaultChecked={checked} />
                    <Label htmlFor="isDead">État du décès</Label>
                </div>
                <div className={cn("font-semibold px-3 py-1 border rounded text-sm ", CLASS_STATE_COLOR)}>
                    {checked ? "OUI" : "NON"}
                </div>
            </div>
            <Separator className="my-5" />
            <AlertModalContent
                className="flex justify-end gap-3 lg:w-[25vw]"
                onCancel={closeModal}
                onConfirm={confirmDeclaration}
            />
        </div>
    );
};

export default DeceasedConfirm;
