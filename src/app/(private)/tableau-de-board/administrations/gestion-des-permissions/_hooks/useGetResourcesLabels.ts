import React from "react";
import { resourceLabels } from "@/lib/rbac/permissionsMocks";
import { ResourceColumn } from "../_components/columns";
import { useSearchParams } from "next/navigation";

type useGetResourcesLabelsProps = {
    search?: string | null;
    limit?: number | null;
    page?: number;
};
const useGetResourcesLabels = ({ limit }: useGetResourcesLabelsProps) => {
    let index: number = 0;
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";

    const ressourceCollections: ResourceColumn[] = Object.entries(resourceLabels)
        .map((resource) => {
            const next = String(index++);
            const id = `#${next.padStart(3, "0")}`;
            return {
                id,
                label: resource[1],
                value: resource[0],
                resource: resource[0],
                create: false,
                update: false,
                delete: false,
                all: true,
            };
        })
        .sort((ra, rb) => ra.label.localeCompare(rb.label));

    let collections = search
        ? ressourceCollections.filter((res) => res.label.toLocaleLowerCase().includes(search))
        : ressourceCollections;

    const startIndex = (page - 1) * (limit ?? 5);
    const endIndex = startIndex + (limit ?? 5);
    const paginatedCollections = [...collections].slice(startIndex, endIndex);

    const totalCount = collections.length;
    collections = paginatedCollections;

    return { collections, totalCount };
};

export default useGetResourcesLabels;
