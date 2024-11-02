import React from "react";
import PropertiesCardSection from "./PropertiesCardSection";
import Link from "next/link";
import { Link2 } from "lucide-react";

const PropertiesSection = () => {
    type GoToListPropertiesByCategoriesProps = { label: string; slug?: string; id: number };
    const GoToListPropertiesByCategories = ({ label, id }: GoToListPropertiesByCategoriesProps) => {
        return (
            <h2 className="font-semibold  sm:text-lg lg:text-2xl px-5 py-2 rounded-xl bg-background border transition-colors duration-200 hover:text-black/60 w-fit ">
                <Link className="flex items-center gap-3" href={`/properties?category=${id}&order=DESC&search="Test`}>
                    <Link2 /> {label}
                </Link>
            </h2>
        );
    };

    return (
        <>
            <section className=" my-8 ">
                <GoToListPropertiesByCategories label="Prestige" id={1} slug="prestige" />
                <PropertiesCardSection category={"Prestige"} id={1} />
            </section>
            <section className=" mb-8">
                <GoToListPropertiesByCategories label="Appartements" id={2} slug="appartements" />
                <PropertiesCardSection category={"appartements"} id={2} />
            </section>
            <section className=" mb-8">
                <GoToListPropertiesByCategories label={"Bureaux"} id={3} slug={"bureau"} />
                <PropertiesCardSection category={"bureau"} id={3} />
            </section>
        </>
    );
};

export default PropertiesSection;
