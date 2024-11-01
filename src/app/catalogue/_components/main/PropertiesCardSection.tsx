"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export type PropertiesCardSectionType = {
    category: string;
};
const PropertiesCardSection = ({ category }: PropertiesCardSectionType) => {
    const array = new Array(10).fill({ name: "sdsdd" });

    const PropertyItem = () => {
        return (
            <Card className="w-full p-1 h-full transition-shadow hover:shadow-lg relative">
                <div className="overflow-hidden rounded-lg">
                    <Image
                        src={"https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg"}
                        alt={`photo`}
                        width={1200}
                        height={720}
                        className="h-auto w-full object-cover rounded-lg transition-all duration-700 ease-in-out transform hover:scale-[1.2] hover:brightness-75"
                    />
                </div>

                <div className="p-2 flex flex-col justify-between gap-3">
                    <p className="font-bold text-lg">Titre </p>

                    <div className="flex items-center justify-between  p-2 rounded-sm backdrop-blur-md">
                        <div>
                            <p className="text-xs text-slate-600">location/Vente</p>
                            <p className="font-bold">400 / 12000 </p>
                        </div>
                        <Button
                            asChild
                            type="button"
                            className="bg-background border hover:border-none hover:shadow-lg hover:shadow-blue-950/50 border-input text-black hover:bg-gradient-to-br from-sky-600 to-primary   duration-300   transition-colors  hover:text-white "
                        >
                            <Link href={`#`}>Plus d'info</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <div className="relative rounded-lg   w-full max-w-[calc(100vw-80px)] overflow-hidden">
            <Swiper spaceBetween={5} slidesPerView={4} className="h-full w-full">
                {array.map((item, index) => (
                    <SwiperSlide key={index} className="px-1 py-5">
                        <PropertyItem />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PropertiesCardSection;
