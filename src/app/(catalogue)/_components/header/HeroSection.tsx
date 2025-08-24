"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import clsx from "clsx";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { cleanDataForCarousel, getPropertiesForCarouselApi, getPropertiesPerCategoryApi } from "../../helper";
import EmptyAvailableProperties from "./EmptyAvailableProperties";
import Overlay from "@/components/ui/Overlay";

type SliderItemProps = {
    property: {
        id: number;
        name: string;
        description?: string | null;
        isFurnish: boolean;
        isAvailable: boolean;
        category: {
            id: number;
            name: string;
        };
        photo?: string;
        cover?: string;
    };
};

const SliderItem = ({ property }: SliderItemProps) => {
    return (
        <>
            <Image
                src={property.cover as string}
                alt={`cover photo of ${property.name}`}
                width={1200}
                height={853}
                className="h-full w-full object-cover object-center contrast-[80%] brightness-105"
            />
            <div
                className={clsx(
                    "absolute  absolute-center-y text-white  p-3 slide-in-text mx-auto text-center w-full z-10",
                )}
            >
                <p className="text-lg sm:text-2xl lg:text-5xl 2xl:text-[3.5rem] font-bold text-white  sm:p-8 tracking-[0.08rem] text-shadow fade-in-100 fade-out">
                    {property.name.toUpperCase()}
                </p>
                {
                    <p className="block max-w-[95vw] lg:max-w-[50vw] drop-shadow-xl  slide-in-text-y text-xs lg:text-2xl mx-auto text-shadow">
                        <strong>Vente:</strong> <span className="text-green-500 font-bold">100 000$</span>
                    </p>
                }
            </div>
            <Overlay className="bg-black/35" />
        </>
    );
};

const HeroSection = () => {
    const { data, isFetching, error } = useQuery({
        queryKey: ["propertyCarouselPresentation"],
        queryFn: getPropertiesForCarouselApi,
        refetchInterval: 60 * 5 * 1000,
    });

    const PROPERTIES = React.useMemo(() => {
        if (!data) return [];
        return data.map((item: any) => cleanDataForCarousel(item));
    }, [data]);

    return (
        <div className="relative rounded-lg shadow-lg w-full h-[280px]  sm:h-[70vh] lg:h-[78vh] overflow-hidden mb-12">
            {PROPERTIES.length > 0 ? (
                <Swiper
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    spaceBetween={10}
                    modules={[Autoplay, EffectFade]}
                    slidesPerView={1}
                    effect="fade"
                    className="h-full w-full"
                >
                    {PROPERTIES.map((item: any) => (
                        <SwiperSlide key={item.id}>
                            <SliderItem property={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <EmptyAvailableProperties />
            )}
        </div>
    );
};

export default HeroSection;
