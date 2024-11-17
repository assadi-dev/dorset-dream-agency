"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/thumbs";
import { Thumbs } from "swiper/modules";
import { GalleryObjectType } from "../../schema";

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
        <div className="rounded-lg overflow-hidden relative h-[62px] sm:h-[100px]">
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

    return (
        <div className=" xl:max-w-[72vw] 2xl:max-w-[65vw] ">
            <div className="relative rounded-lg h-[280px] lg:h-[430px] xl:h-[480px]  bg-slate-100 shadow-lg overflow-hidden">
                <Swiper
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
            </div>
            <div className="w-full p-1 overflow-hidden bg-blue-950 backdrop-blur-sm   z-50 rounded-lg mt-1">
                <Swiper
                    spaceBetween={5}
                    slidesPerView={3}
                    breakpoints={breakPoint}
                    modules={[Thumbs]}
                    watchSlidesProgress
                    onSwiper={handleClickThumbs}
                >
                    {gallery.map((thumb) => (
                        <SwiperSlide key={thumb.id}>
                            <ThumbItemProperty propertyName={propertyName || "???"} photo={thumb} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HeaderPhotoSlides;
