"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./PropertyCard";

export type PropertiesCardSectionType = {
    id: number;
    category: string;
};
const PropertiesCardSection = ({ category }: PropertiesCardSectionType) => {
    const array = new Array(10).fill({ name: "sdsdd" });

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
                {array.map((item, index) => (
                    <SwiperSlide key={index} className="px-1 py-5">
                        <PropertyCard />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PropertiesCardSection;
