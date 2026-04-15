import React from "react";
import ListsPrestige from "./_components/ListsPrestige";
import { setTitlePage } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import { getCategoriesForOptions, getCategoryByID, getCategoryByName } from "@/database/drizzle/repositories/categories";
import PageTemplate from "../../_components/PageTemplate";
import { CategoryOption } from "../type";
export const dynamic = "force-dynamic";


type Props = {
    params: Promise<{ category: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { category } = await params;
    const decodeCategory = decodeURIComponent(category);
    const categoryData = decodeCategory === "all" ? { name: "Toutes les catégories" } : await getCategoryByName(decodeCategory);
    return {
        title: `Disponibilités - ${categoryData.name}`,

    }
}

const PrestigePage = async ({ params, searchParams }: Props) => {
    const { category } = await params;
    const decodeCategory = decodeURIComponent(category);
    const categoryData = decodeCategory === "all" ? undefined : await getCategoryByName(decodeCategory);
    const categoriesoptions = await getCategoriesForOptions();
    return (
        <PageTemplate title={categoryData?.name ?? "Toutes les catégories"}>
            <section className="my-3">
                <div className="md:grid md:grid-cols-[minmax(100px,0.5fr),1fr] pb-6 items-center"></div>
            </section>
            <ListsPrestige categoryID={categoryData?.id} categoriesoptions={categoriesoptions as CategoryOption[]} />
        </PageTemplate>
    );
};

export default PrestigePage;
