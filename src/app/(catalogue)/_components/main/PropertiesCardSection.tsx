"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { cleanDataForCarousel, getPropertiesPerCategoryApi } from "../../helper";

export type PropertiesCardSectionType = {
    id: number;
    category: string;
};
type PropertyMemoType = {
    id: number;
    name: string;
    cover: string;
    photo: string;
    category: {
        id: number;
        name: string;
    };
    rentalPrice: number;
    sellingPrice: number;
    isFurnish: boolean;
};
const PropertiesCardSection = ({ category }: PropertiesCardSectionType) => {
    const { data, isFetching, error } = useQuery({
        queryKey: [`${category}-slides-section`],
        queryFn: () => getPropertiesPerCategoryApi(category),
        refetchInterval: 10 * 60 * 1000,
    });

    const PROPERTIES = React.useMemo<PropertyMemoType[]>(() => {
        if (!data) return [];
        return data.map((item: any) => cleanDataForCarousel(item));
    }, [data]);

    const breakTest = {
        768: {
            slidesPerView: 3,
            spaceBetween: 3,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 5,
        },
        1280: {
            slidesPerView: 4,
            spaceBetween: 5,
        },
    };

    return (
        <div className="relative rounded-lg   w-full    overflow-hidden">
            <Swiper spaceBetween={0} slidesPerView={1} breakpoints={breakTest} className="h-full w-full">
                {PROPERTIES.map((item) => (
                    <SwiperSlide key={item.id} className="px-1 py-5">
                        <PropertyCard property={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PropertiesCardSection;
