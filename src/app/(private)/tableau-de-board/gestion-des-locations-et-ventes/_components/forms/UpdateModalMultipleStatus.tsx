import React from "react";
import LocationStatusForm from "./LocationStatusForm";
import useModalState from "@/hooks/useModalState";
import { LocationStatusFormSchemaInfer } from "./schema";
import useRouteRefresh from "@/hooks/useRouteRefresh";
import { updateTransactionStatus } from "../../actions";
const UpdateModalMultipleStatus = () => {
    const { closeModal, payload } = useModalState();
    const { refreshWithParams } = useRouteRefresh();

    const ids = payload.ids as number[];

    const saveMultipleStatus = async (values: LocationStatusFormSchemaInfer) => {
        const { ids, status } = values;
        await updateTransactionStatus(ids, status);

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
