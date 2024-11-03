"use client";
import React from "react";
import PropertiesCardSection from "./PropertiesCardSection";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { useCategoryPropertiesOptions } from "@/hooks/useFetchOptions";

type categoryMemoType = {
    id: number;
    label: string;
    value: string;
};
type GoToListPropertiesByCategoriesProps = { label: string; slug?: string; id: number };

const GoToListPropertiesByCategories = ({ label, id }: GoToListPropertiesByCategoriesProps) => {
    return (
        <h2 className="font-semibold  sm:text-lg lg:text-2xl px-5 py-2 rounded-xl bg-background border transition-colors duration-200 hover:text-black/60 w-fit ">
            <Link className="flex items-center gap-3" href={`/properties?category=${label}&order=desc&limit=25`}>
                <Link2 /> {label}
            </Link>
        </h2>
    );
};
const PropertiesSection = () => {
    const categoryQuery = useCategoryPropertiesOptions();

    const ENUM_PROPERTY_CATEGORIES = React.useMemo<categoryMemoType[]>(() => {
        if (categoryQuery.data) return categoryQuery.data;
        return [];
    }, [categoryQuery.data]);

    return (
        <>
            {ENUM_PROPERTY_CATEGORIES.map((item) => (
                <section className=" my-8 " key={item.id}>
                    <GoToListPropertiesByCategories label={item.label} id={item.id} slug={item.label.toLowerCase()} />
                    <PropertiesCardSection category={item.label} id={item.id} />
                </section>
            ))}
        </>
    );
};

export default PropertiesSection;
