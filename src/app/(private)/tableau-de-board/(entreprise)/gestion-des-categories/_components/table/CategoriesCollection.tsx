"use client"

import { useGetCollections } from "../../_hooks/useGetCollections";
import ListCategories from "./ListCategories";


const CategoriesCollection = () => {
    const { collections, isLoading, error, limit, totalItems } = useGetCollections();

    return (
        collections && (
            <ListCategories categories={collections} limit={limit} totalItems={totalItems} />
        )
    );
};

export default CategoriesCollection;