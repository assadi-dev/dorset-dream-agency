import React from "react";
import PropertiesCardSection from "./PropertiesCardSection";
import Link from "next/link";
import { Link2 } from "lucide-react";

const PropertiesSection = () => {
    const GoToListPropertiesByCategories = ({ label, slug }) => {
        return (
            <h2 className="font-bold  sm:text-lg lg:text-3xl px-5 py-2 rounded-xl bg-background border transition-colors duration-200 hover:text-black/60 w-fit ">
                <Link className="flex items-center gap-3" href={`/properties/${slug}`}>
                    <Link2 /> {label}
                </Link>
            </h2>
        );
    };

    return (
        <>
            <section className=" my-8 ">
                <GoToListPropertiesByCategories label="Prestige" slug="prestige" />
                <PropertiesCardSection category={"Prestige"} />
            </section>
            <section className=" mb-8">
                <GoToListPropertiesByCategories label="Appartements" slug="appartements" />
                <PropertiesCardSection category={"Prestige"} />
            </section>
            <section className=" mb-8">
                <GoToListPropertiesByCategories label={"Bureaux"} slug={"bureaux"} />
                <PropertiesCardSection category={"Prestige"} />
            </section>
        </>
    );
};

export default PropertiesSection;
