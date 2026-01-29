"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRelease, updateVersionApi, updateVersionFieldsApi } from "../helper";

const RELEASE_CONTENT_KEY = "RELEASE_CONTENT";
export const useReleaseApi = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: [RELEASE_CONTENT_KEY],
        queryFn: fetchRelease,
    });

    const updateVersionMutation = useMutation({
        mutationFn: (data: { version: string }) => updateVersionApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [RELEASE_CONTENT_KEY],
            });
        },
    });
    const updateVersionFieldsMutation = useMutation({
        mutationFn: ({ fields }: { fields: { name: string; value: string }[] }) => updateVersionFieldsApi({ fields }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [RELEASE_CONTENT_KEY],
            });
        },
    });

    return {
        data,
        isLoading,
        error,
        updateVersion: updateVersionMutation.mutateAsync,
        updateVersionFields: updateVersionFieldsMutation.mutateAsync,
    };
};
