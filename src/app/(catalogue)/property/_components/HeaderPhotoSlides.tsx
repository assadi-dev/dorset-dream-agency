"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

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

const HeaderPhotoSlides = () => {
    return (
        <div className="h-[280px] lg:h-[430px]  xl:max-w-[62vw] overflow-hidden rounded-lg bg-slate-100 shadow-lg">
            <Swiper loop={true} spaceBetween={0} slidesPerView={1} className="h-full w-full">
                {listPhotos.map((v, index) => (
                    <SwiperSlide key={index}>
                        <SlideItemProperty src={v} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeaderPhotoSlides;
