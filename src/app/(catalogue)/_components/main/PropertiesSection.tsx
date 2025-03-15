"use client";
import React from "react";
import PropertiesCardSection from "./PropertiesCardSection";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { useCategoryPropertiesOptions } from "@/hooks/useFetchOptions";
import LoaderSectionProperties from "./LoaderSectionPropertties";

type categoryMemoType = {
    id: number;
    label: string;
    value: string;
};
type GoToListPropertiesByCategoriesProps = { label: string; slug?: string; id: number };

const GoToListPropertiesByCategories = ({ label, id }: GoToListPropertiesByCategoriesProps) => {
    return (
        <h2 className="font-semibold  sm:text-lg lg:text-2xl px-5 py-2 rounded-xl  transition-colors duration-200 hover:text-black/60 w-fit ">
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

    const array = Array.from({ length: 6 }, (_, i) => i + 1);

    return (
        <>
            {!categoryQuery.isFetching &&
                ENUM_PROPERTY_CATEGORIES.map((item) => (
                    <section className="main my-8 min-h-[180px]" key={item.id}>
                        <GoToListPropertiesByCategories
                            label={item.label}
                            id={item.id}
                            slug={item.label.toLowerCase()}
                        />
                        <PropertiesCardSection category={item.label} id={item.id} />
                    </section>
                ))}
            {categoryQuery.isFetching && (
                <div className="">
                    {array.map((v) => (
                        <LoaderSectionProperties key={v} />
                    ))}
                </div>
            )}
        </>
    );
};

export default PropertiesSection;
