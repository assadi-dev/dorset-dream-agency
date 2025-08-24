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
        rentalPrice: number;
        sellingPrice: number;
    };
};

const ShowTransaction = ({ label, price }: { label: string; price: number }) => {
    const ShowPrice = ({ price }: { price: number }) => {
        if (price === 0) return <span className="text-shadow text-slate-500">Sur demande</span>;
        return <span className="text-yellow-500 font-bold">{price}$</span>;
    };

    return (
        <p className="flex flex-col sm:flex-row w-full justify-center gap-1 drop-shadow-xl text-xs sm:text-sm lg:text-2xl  text-shadow">
            <span className="block font-bold ">{label}:</span> <ShowPrice price={price} />
        </p>
    );
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
                <p className="text-lg sm:text-2xl lg:text-5xl 2xl:text-[3.5rem] font-bold text-white  sm:p-8 tracking-[0.08rem] text-shadow mb-5">
                    {property.name.toUpperCase()}
                </p>
                {
                    <div className="flex  w-full sm:w-[85vw] lg:max-w-[60vw] drop-shadow-xl  slide-in-text-y  lg:text-2xl mx-auto text-shadow  p-3  bg-slate-50/25 rounded-lg shadow-xl backdrop-blur-sm gap-2 sm:gap-5">
                        <ShowTransaction label="Prix de Vente" price={property.sellingPrice} />
                        <ShowTransaction label="Prix de location" price={property.rentalPrice} />
                    </div>
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
