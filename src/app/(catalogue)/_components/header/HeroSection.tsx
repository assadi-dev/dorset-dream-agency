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
import { addSpaceThousandsFormat } from "@/lib/format";
import { HandCoins, Handshake } from "lucide-react";

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

const ShowTransaction = ({ label, price, Icon }: { label: string; price: number; Icon: any }) => {
    const ShowPrice = ({ price }: { price: number }) => {
        return <span className="text-yellow-500 font-bold">{addSpaceThousandsFormat(price)}$</span>;
    };

    const IconRender = () => {
        if (!Icon) return null;
        return (
            <IconWrapper>
                <Icon className=" h-3 w-3 lg:h-5 lg:w-5 " />
            </IconWrapper>
        );
    };
    return (
        <p className="flex flex-col sm:flex-row w-full justify-center items-center gap-1 drop-shadow-xl text-xs sm:text-sm lg:text-2xl  text-shadow">
            <span className="flex items-center  gap-3 font-bold ">
                <IconRender />
                {label}:
            </span>{" "}
            <ShowPrice price={price} />
        </p>
    );
};

const IconWrapper = ({ children }: { children: React.ReactElement }) => {
    return (
        <div className=" hidden sm:grid place-items-center rounded-[100%] ring-2 ring-white w-5 h-5 lg:h-10 lg:w-10 p-0 lg:p-2 bg-slate-300/50  drop-shadow-xl  ">
            {children}
        </div>
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

                <div className="flex flex-col gap-3 sm:flex-row w-[65vw] sm:w-[88vw] lg:max-w-[65vw] mx-auto justify-center items-center ">
                    <BlurWrapper>
                        <ShowTransaction label="Prix de Vente" price={property.sellingPrice} Icon={Handshake} />
                    </BlurWrapper>
                    <BlurWrapper>
                        <ShowTransaction label="Prix de location" price={property.rentalPrice} Icon={HandCoins} />
                    </BlurWrapper>
                </div>
            </div>
            <Overlay className="bg-black/35" />
        </>
    );
};

const BlurWrapper = ({ children }: { children: React.ReactElement }) => {
    return (
        <div className="flex items-center w-fit px-5 drop-shadow-xl  slide-in-text-y  lg:text-2xl  text-shadow  p-3  bg-slate-50/25 rounded-lg shadow-xl backdrop-blur-sm gap-2 sm:gap-5">
            {children}
        </div>
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
        <header className="relative rounded-xl shadow-lg w-full max-w-[1800px] mx-auto h-[280px] sm:h-[35vh]  landscape:max-lg:h-[70vh]  lg:h-[78vh] overflow-hidden mb-12">
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
        </header>
    );
};

export default HeroSection;
