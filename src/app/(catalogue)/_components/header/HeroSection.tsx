"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import clsx from "clsx";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { cleanDataForCarousel, getPropertiesForCarouselApi, getPropertiesPerCategoryApi } from "../../helper";

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
                className="h-full w-full object-cover object-center brightness-50"
            />

            <div className={clsx("absolute left-10 top-[25%] text-white  p-3 slide-in-text")}>
                <p className="text-lg pb-3 sm:text-2xl lg:text-4xl font-bold text-white  sm:p-8 drop-shadow-2xl ">
                    {property.name.toUpperCase()}
                </p>
                {/*      <small className="block max-w-[95vw] lg:max-w-[50vw] drop-shadow-xl sm:pl-8  slide-in-text text-xs lg:text-sm">
                    <strong>Déscription:</strong> <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero fugit quod qui nobis autem
                    perspiciatis atque vel, dignissimos totam error, quaerat nesciunt, vitae earum. Iste tempora
                    corporis dolore quo aut! Fugiat a, quas corporis accusamus ipsam quasi
                </small> */}
            </div>
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
        <div className="relative rounded-lg shadow-lg w-full h-[280px]  sm:h-[380px] lg:h-[480px] overflow-hidden">
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
        </div>
    );
};

export default HeroSection;
