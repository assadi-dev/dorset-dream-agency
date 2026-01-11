import useModalState from "@/hooks/useModalState";
import React from "react";
import { STATUS_DISPLAY_NAME } from "../../helpers";
import { LocationStatusType } from "@/database/types";
import LocationStatusForm from "./LocationStatusForm";
import { LocationStatusFormSchemaInfer } from "./schema";
import { updateMultipleTransactionStatus } from "@/database/drizzle/repositories/transactions";
import useRouteRefresh from "@/hooks/useRouteRefresh";

const ChangeStatusModal = () => {
    const { payload, closeModal } = useModalState();
    const { refreshWithParams } = useRouteRefresh();

    const ids = [payload.id] as number[];

    const saveStatus = async (values: LocationStatusFormSchemaInfer) => {
        const { ids, status } = values;
        await updateMultipleTransactionStatus(ids, status);
        closeModal();
        refreshWithParams();
    };

    return (
        <div className="min-w-[35vw] max-w-[45vw] space-y-4 ">
            <div className="rounded-xl border border-blue-300 p-3 lg:p-5 bg-blue-300/10 text-blue-800">
                <p>
                    Changer le status de la transaction <span className="font-semibold">{payload.property}</span>
                </p>
                <p>
                    <span className="font-semibold mr-1">Statut actuel:</span>
                    {STATUS_DISPLAY_NAME[payload.status as LocationStatusType]}
                </p>
            </div>

            <LocationStatusForm
                onConfirmSubmit={saveStatus}
                defaultValues={{
                    ids,
                    status: payload.status,
                }}
            />
        </div>
    );
};

export default ChangeStatusModal;
