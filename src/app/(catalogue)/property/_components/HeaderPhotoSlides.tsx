"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/thumbs";
import { Thumbs } from "swiper/modules";

const listPhotos = [
    "https://plus.unsplash.com/premium_photo-1661954372617-15780178eb2e?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg",
    "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

type ItemSlideProperty = {
    src: string;
};

const SlideItemProperty = ({ src }: ItemSlideProperty) => {
    return (
        <>
            <Image
                src={src}
                alt="photo of "
                width={1200}
                height={853}
                className="h-full w-full object-cover object-center"
            />
        </>
    );
};

const ThumbItemProperty = ({ src }: ItemSlideProperty) => {
    return (
        <div className="rounded-lg overflow-hidden relative h-[100px]">
            <Image
                src={src}
                alt="photo of "
                width={1200}
                height={853}
                className="h-full w-full object-cover object-center"
            />
        </div>
    );
};

const HeaderPhotoSlides = () => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState(0);

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
                    {listPhotos.map((v, index) => (
                        <SwiperSlide key={index}>
                            <SlideItemProperty src={v} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="w-full p-1 overflow-hidden bg-blue-950 backdrop-blur-sm   z-50 rounded-lg mt-1">
                <Swiper
                    spaceBetween={5}
                    slidesPerView={5}
                    modules={[Thumbs]}
                    watchSlidesProgress
                    onSwiper={setThumbsSwiper}
                >
                    {listPhotos.map((v, i) => (
                        <SwiperSlide key={i}>
                            <ThumbItemProperty src={v} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HeaderPhotoSlides;
