"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export type PropertiesCardSectionType = {
    category: string;
};
const PropertiesCardSection = ({ category }: PropertiesCardSectionType) => {
    const array = new Array(10).fill({ name: "sdsdd" });

    const PropertyBadges = ({ isAvailable, isFurnish }) => {
        const FurnishBadge = ({ isFurnish }) => {
            const FURNISH_LABEL_ = isFurnish ? "Meublé" : "Vide";

            return (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-400">
                    {FURNISH_LABEL_}
                </span>
            );
        };
        const AvailableBadge = ({ isAvailable }) => {
            const AVAILABLE_LABEL = isAvailable ? "Disponible" : "Indisponible";

            const CLASS_BADGE = isAvailable
                ? `bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400`
                : "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400";
            return <span className={CLASS_BADGE}>{AVAILABLE_LABEL}</span>;
        };

        return (
            <div className="flex items-center gap-1">
                <FurnishBadge isFurnish={isAvailable} />
                <AvailableBadge isAvailable={isFurnish} />
            </div>
        );
    };

    const PropertyItem = () => {
        return (
            <Card className="w-full p-1 h-full transition-shadow hover:shadow-lg relative">
                <div className="overflow-hidden rounded-lg relative">
                    <Image
                        src={"https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg"}
                        alt={`photo`}
                        width={1200}
                        height={720}
                        className="h-auto w-full object-cover rounded-lg transition-all duration-700 ease-in-out transform hover:scale-[1.2] hover:brightness-75"
                    />
                </div>

                <div className="p-2 flex flex-col justify-between gap-3 relative">
                    <p className="font-bold sm:text-sm lg:text-lg">Titre </p>
                    <PropertyBadges isAvailable={true} isFurnish={true} />
                    <div className="flex items-center justify-between  p-2 rounded-sm backdrop-blur-md">
                        <div>
                            <p className="text-xs text-slate-600">location/Vente</p>
                            <p className="font-bold text-xs lg:text:sm">400 / 12000 </p>
                        </div>
                        <Button
                            asChild
                            type="button"
                            className="bg-background border hover:border-none hover:shadow-lg hover:shadow-blue-950/50 border-input text-black hover:bg-gradient-to-br from-sky-600 to-primary   duration-300   transition-colors  hover:text-white text-xs lg:text-sm"
                        >
                            <Link href={`#`}>Plus d'info</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        );
    };

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
                        <PropertyItem />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PropertiesCardSection;
