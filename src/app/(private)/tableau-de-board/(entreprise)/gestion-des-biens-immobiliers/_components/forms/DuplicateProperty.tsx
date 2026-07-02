"use client";
import AlertModalContent from "@/components/Modals/AlertModalContent";
import useModalState from "@/hooks/useModalState";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { duplicateVarianteApi } from "../../helpers";
import { useRouter } from "next/navigation";
import ModalContent from "@/components/Modals/ModalContent";
import { Button } from "@/components/ui/button";
import ButtonWithLoader from "@/components/forms/ButtonWithLoader";
import { Switch } from "@/components/ui/switch";
import useRouteRefresh from "@/hooks/useRouteRefresh";
import { PROPERTY_QUERY_KEY } from "@/app/types/QueryKeys";

const DuplicateProperty = () => {
    const { payload, closeModal } = useModalState();

    const [isPending, startTransition] = React.useTransition();
    const [withRedirect, setWithRedirect] = React.useState(false);
    const { router, refreshWithParams, searchParams } = useRouteRefresh();

    const page = Number(searchParams.get("page")) ?? 1;
    const search = searchParams.get("search") ?? "";
    const limit = Number(searchParams.get("limit")) || 5;

    payload as unknown as { id: number; name: string };

    const queryClient = useQueryClient();

    const handleConfirm = async () => {
        try {
            const result = await duplicateVarianteApi({
                id: payload.id,
                name: payload.name,
            });

            if (withRedirect == true)
                router.push(`/tableau-de-board/gestion-des-biens-immobiliers/modifier?property=${result.id}`);
            queryClient.refetchQueries({ queryKey: [PROPERTY_QUERY_KEY.LIST_IMMOBILIER_GESTION, page, limit, search] });
            closeModal();
        } catch (error: any) {
            throw error;
        }
    };

    const confirmAsync = () => {
        startTransition(async () => {
            try {
                await handleConfirm();
            } catch (error) {}
        });
    };

    const handleCancel = async () => {
        closeModal();
    };

    const CONFIRM_LABEL = isPending ? "Confirmer" : "Confirmer";
    return (
        <ModalContent>
            <div className="flex items-center justify-between mb-3 border rounded-lg p-3 h-20">
                <p className="text-sm w-full font-semibold">
                    Rediriger vers la page modifier la propriété une fois dupliqué
                </p>
                <Switch checked={withRedirect} onCheckedChange={(checked) => setWithRedirect(checked)} />
            </div>

            <div className="flex justify-end gap-3 lg:w-[28vw]">
                <Button type="button" onClick={handleCancel} variant="ghost">
                    Annuler
                </Button>

                <ButtonWithLoader type="button" variant="default" onClick={confirmAsync} isLoading={isPending}>
                    {CONFIRM_LABEL}
                </ButtonWithLoader>
            </div>
        </ModalContent>
    );
};

export default DuplicateProperty;
