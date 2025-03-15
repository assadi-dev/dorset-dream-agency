"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/thumbs";
import { Thumbs } from "swiper/modules";
import { GalleryObjectType } from "../../schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronLeftCircle, icons } from "lucide-react";
import { NextButton, PrevButton, SlideButton } from "./SlideActions";
import { Swiper as SwiperCore } from "swiper/types";

type ItemSlideProperty = {
    propertyName: string;
    photo: GalleryObjectType;
};

const SlideItemProperty = ({ propertyName, photo }: ItemSlideProperty) => {
    return (
        <>
            <Image
                src={photo.url}
                alt={`photo  ${photo.originalName} of property ${propertyName || "???"}`}
                width={1200}
                height={853}
                className="h-full w-full object-cover object-center"
            />
        </>
    );
};

const ThumbItemProperty = ({ propertyName, photo }: ItemSlideProperty) => {
    return (
        <div className="rounded-lg overflow-hidden relative h-[62px] sm:h-[100px] transition-all">
            <Image
                src={photo.url}
                alt={`thumb  ${photo.originalName} of property ${propertyName || "???"}`}
                width={1200}
                height={853}
                className="h-full w-full object-cover object-center"
            />
        </div>
    );
};

type HeaderPhotoSlidesProps = {
    propertyName?: string;
    gallery: Array<GalleryObjectType>;
};
const HeaderPhotoSlides = ({ propertyName, gallery }: HeaderPhotoSlidesProps) => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
    const handleClickThumbs = (value: any) => setThumbsSwiper(value);

    const [swiperState, setSwiperState] = React.useState<SwiperCore>();

    const breakPoint = {
        1536: {
            slidesPerView: 5,
            spaceBetween: 5,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 5,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 5,
        },
    };

    const handleClickNextSlide = () => {
        if (!swiperState) return;
        swiperState.slideNext();
    };
    const handleClickPrevSlide = () => {
        if (!swiperState) return;
        swiperState.slidePrev();
    };

    return (
        <Card className="bg-white shadow-xl">
            <CardContent className="p-3">
                <div className="relative rounded-lg h-[280px] lg:h-[430px] xl:h-[480px]   overflow-hidden">
                    <Swiper
                        onInit={(swiper) => setSwiperState(swiper)}
                        loop={true}
                        spaceBetween={0}
                        slidesPerView={1}
                        modules={[Thumbs]}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="h-full w-full"
                    >
                        {gallery.map((photo) => (
                            <SwiperSlide key={photo.id}>
                                <SlideItemProperty propertyName={propertyName || "???"} photo={photo} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <PrevButton
                        onClick={handleClickPrevSlide}
                        className="bg-primary-accent/50 hover:bg-primary-accent"
                        classNames={{ icon: "h-12 w-12 text-black" }}
                    />
                    <NextButton
                        className="bg-primary-accent/50 hover:bg-primary-accent"
                        onClick={handleClickNextSlide}
                        classNames={{ icon: "h-12 w-12 text-black" }}
                    />
                </div>
                <div className="relative w-full  overflow-hidden   z-50 rounded-lg mt-1">
                    <Swiper
                        spaceBetween={5}
                        slidesPerView={3}
                        breakpoints={breakPoint}
                        modules={[Thumbs]}
                        watchSlidesProgress
                        onSwiper={handleClickThumbs}
                    >
                        {gallery.map((thumb) => (
                            <SwiperSlide
                                key={thumb.id}
                                className="opacity-50 transition-all duration-500 cursor-pointer hover:opacity-100"
                            >
                                <ThumbItemProperty propertyName={propertyName || "???"} photo={thumb} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </CardContent>
        </Card>
    );
};

export default HeaderPhotoSlides;
