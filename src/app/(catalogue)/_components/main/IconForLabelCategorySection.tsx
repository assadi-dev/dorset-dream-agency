import React from "react";
import { Gem, Building, BriefcaseBusiness, Warehouse, Home, Sofa, Sparkles } from "lucide-react";
import { LucidIconProps } from "@/types/global";

type IconForLabelCategorySectionProps = { value: string };

export const IconForLabelCategorySection = ({ value }: IconForLabelCategorySectionProps) => {
    const IconMapCollections = new Map<string, LucidIconProps>();
    IconMapCollections.set("Prestige", Sparkles);
    IconMapCollections.set("Appartement", Building);
    IconMapCollections.set("Bureau", BriefcaseBusiness);
    IconMapCollections.set("Entrepot", Warehouse);
    IconMapCollections.set("Garage", Home);
    IconMapCollections.set("Sous sol", Home);
    return IconMapCollections.get(value);
};
