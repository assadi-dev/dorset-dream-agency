import React from "react";
import LocationStatusForm from "./LocationStatusForm";
import useModalState from "@/hooks/useModalState";
import { LocationStatusFormSchemaInfer } from "./schema";
import { usePathname, useRouter } from "next/navigation";
import { updateMultipleTransactionStatus } from "@/database/drizzle/repositories/transactions";
const UpdateModalMultipleStatus = () => {
    const { closeModal, payload } = useModalState();
    const router = useRouter();
    const pathname = usePathname();

    const ids = payload.ids as number[];

    const saveMultipleStatus = async (values: LocationStatusFormSchemaInfer) => {
        const { ids, status } = values;
        await updateMultipleTransactionStatus(ids, status);
        closeModal();
        router.push(pathname);
        router.refresh();
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
