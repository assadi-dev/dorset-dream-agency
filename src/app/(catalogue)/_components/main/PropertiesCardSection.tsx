"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { cleanDataForSlides, getPropertiesPerCategoryApi } from "../../helper";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    isAvailable: boolean;
    stock?: number | null;
};
const PropertiesCardSection = ({ category }: PropertiesCardSectionType) => {
    const { data, isFetching, error } = useQuery({
        queryKey: [`${category}-slides-section`],
        queryFn: () => getPropertiesPerCategoryApi(category, 10),
    });

    const PROPERTIES = React.useMemo<PropertyMemoType[]>(() => {
        if (!data) return [];
        return data.map((item: any) => cleanDataForSlides(item));
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

    const container = React.useRef<HTMLDivElement>();
    gsap.registerPlugin(ScrollTrigger);

    useGSAP(
        () => {
            if (!container.current) return;
            const boxes = container.current?.querySelectorAll(".propertyBox");
            gsap.from(boxes, {
                immediateRender: PROPERTIES.length > 0,
                delay: 0.25,
                opacity: 0,
                repeat: 0,
                scale: 0.7,
                ease: "expo.out",
                duration: 1.5,
                stagger: {
                    each: 0.2,
                },
                scrollTrigger: {
                    trigger: boxes,
                    start: "top 85%",
                    end: () => `+=${window.innerHeight}`,
                    markers: true,
                    scrub: false,
                },
            });
        },
        { scope: container, dependencies: [PROPERTIES.length] },
    );

    return (
        <div className="relative rounded-lg   w-full    overflow-hidden" ref={container as any}>
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
