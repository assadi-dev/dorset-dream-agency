"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import clsx from "clsx";
import Image from "next/image";

const listPhotos = [
    "https://plus.unsplash.com/premium_photo-1661954372617-15780178eb2e?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg",
    "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

type SliderItemProps = { src: string };
const SliderItem = ({ src }: SliderItemProps) => {
    return (
        <>
            <Image
                src={src}
                alt={`photo of`}
                width={1200}
                height={853}
                className="h-full w-full object-cover object-center brightness-50"
            />

            <div className={clsx("absolute left-10 top-[25%] text-white  p-3 slide-in-text")}>
                <p className="text-lg pb-3 sm:text-2xl lg:text-4xl font-bold text-white  sm:p-8 drop-shadow-2xl ">
                    {String("Villa Franklin").toUpperCase()}
                </p>
                <small className="block max-w-[95vw] lg:max-w-[50vw] drop-shadow-xl sm:pl-8  slide-in-text text-xs lg:text-sm">
                    <strong>Déscription:</strong> <br />
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero fugit quod qui nobis autem
                    perspiciatis atque vel, dignissimos totam error, quaerat nesciunt, vitae earum. Iste tempora
                    corporis dolore quo aut! Fugiat a, quas corporis accusamus ipsam quasi
                </small>
            </div>
        </>
    );
};

const HeroSection = () => {
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
                {listPhotos.map((photo, index) => (
                    <SwiperSlide key={index}>
                        <SliderItem src={photo} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSection;
