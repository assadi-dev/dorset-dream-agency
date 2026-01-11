import React from "react";
import LocationStatusForm from "./LocationStatusForm";
import useModalState from "@/hooks/useModalState";
import { LocationStatusFormSchemaInfer } from "./schema";
import { updateMultipleTransactionStatus } from "@/database/drizzle/repositories/transactions";
import useRouteRefresh from "@/hooks/useRouteRefresh";
const UpdateModalMultipleStatus = () => {
    const { closeModal, payload } = useModalState();
    const { refreshWithParams } = useRouteRefresh();

    const ids = payload.ids as number[];

    const saveMultipleStatus = async (values: LocationStatusFormSchemaInfer) => {
        const { ids, status } = values;
        await updateMultipleTransactionStatus(ids, status);

        closeModal();
        refreshWithParams();
        payload.resetSelected();
    };
    return (
        <LocationStatusForm
            onConfirmSubmit={saveMultipleStatus}
            defaultValues={{
                ids,
            }}
        />
    );
};

export default UpdateModalMultipleStatus;
