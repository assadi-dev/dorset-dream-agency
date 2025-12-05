"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropertyCard from "./PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { cleanDataForSlides, getPropertiesPerCategoryApi } from "../../helper";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper as SwiperCore } from "swiper/types";
import { NextButton, PrevButton } from "../../property/_components/SlideActions";
import { cn } from "@/lib/utils";

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
        refetchInterval: 10 * 60 * 1000,
    });

    const PROPERTIES = React.useMemo<PropertyMemoType[]>(() => {
        if (!data) return [];
        return data.map((item: any) => cleanDataForSlides(item));
    }, [data]);

    return <div>{PROPERTIES.length ? <SlideProperties properties={PROPERTIES} /> : <>Empty</>}</div>;
};

export default PropertiesCardSection;

type SlidePropertiesProps = {
    properties: PropertyMemoType[];
};
export const SlideProperties = ({ properties }: SlidePropertiesProps) => {
    const swiperRef = React.useRef<any>(null);
    const container = React.useRef<HTMLDivElement>();
    gsap.registerPlugin(ScrollTrigger);

    const PROPERTIES = properties;

    const breakTest = {
        586: {
            slidesPerView: 2,
            spaceBetween: 3,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 5,
        },
        1536: {
            slidesPerView: 4,
            spaceBetween: 5,
        },
    };

    useGSAP(
        () => {
            if (!container.current || PROPERTIES.length === 0) return;
            const boxes = container.current?.querySelectorAll(".propertyBox");
            if (boxes?.length === 0) return;
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
                    end: () => `+=${window.innerHeight}`, // scrollTrigger will end when the element is fully visible
                    scrub: false,
                },
            });
        },
        { scope: container, dependencies: [PROPERTIES.length] },
    );

    const handleClickNextSlide = () => {
        if (!swiperRef.current) return;
        swiperRef.current.slideNext();
    };
    const handleClickPrevSlide = () => {
        if (!swiperRef.current) return;
        swiperRef.current.slidePrev();
    };

    const SIZE_ICON = `h-[2.5em] w-[2.5rem] lg:h-[3rem] lg:w-[3rem]`;
    return (
        <div className="relative rounded-lg w-full group/parent" ref={container as any}>
            <Swiper
                onInit={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={0}
                slidesPerView={1}
                breakpoints={breakTest}
                className="h-full w-full"
            >
                {PROPERTIES.map((item) => (
                    <SwiperSlide key={item.id} className="px-1 py-5">
                        <PropertyCard property={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <PrevButton
                onClick={handleClickPrevSlide}
                className="bg-slate-50 hover:bg-primary-accent  group-hover/parent:opacity-100 translate-x-[-35%] lg:translate-x-[-50%] shadow-xl 2xl:opacity-0 transition-all duration-500"
                classNames={{ icon: cn(SIZE_ICON, `text-black `) }}
            />
            <NextButton
                className="bg-slate-50 hover:bg-primary-accent  group-hover/parent:opacity-100 translate-x-[35%]  lg:translate-x-[50%] shadow-xl 2xl:opacity-0 transition-all duration-500"
                onClick={handleClickNextSlide}
                classNames={{ icon: cn(SIZE_ICON, `text-black`) }}
            />
        </div>
    );
};
