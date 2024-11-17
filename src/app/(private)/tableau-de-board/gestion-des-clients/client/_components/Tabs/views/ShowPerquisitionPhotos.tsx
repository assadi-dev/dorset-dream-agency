"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import useModalState from "@/hooks/useModalState";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/thumbs";
import { Thumbs } from "swiper/modules";
import { PhotoType } from "@/app/types/photos";

type SlideItemPropertyProps = {
    photo: PhotoType;
};
const SlideItemProperty = ({ photo }: SlideItemPropertyProps) => {
    return (
        <Image
            src={photo.url}
            alt={`photo  ${photo.originalName} `}
            width={1200}
            height={853}
            className="h-full w-full object-contain object-center"
        />
    );
};

const ThumbItemPerquisitions = ({ photo }: SlideItemPropertyProps) => {
    return (
        <div className="rounded-lg overflow-hidden relative ">
            <Image
                src={photo.url}
                alt={`thumb  ${photo.originalName}`}
                width={1200}
                height={853}
                className="h-full w-full object-cover object-center"
            />
        </div>
    );
};

const ShowPerquisitionPhotos = () => {
    const { payload } = useModalState();
    const [photos, setPhotos] = React.useState<PhotoType[]>([]);

    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
    const handleClickThumbs = (value: any) => setThumbsSwiper(value);

    React.useEffect(() => {
        if (payload.photos) {
            setPhotos(payload.photos);
        }
    }, [payload.photos]);

    const breakPoint = {
        1280: {
            slidesPerView: 4,
            spaceBetween: 5,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 5,
        },
    };

    return (
        <div className="w-[80vw] sm:w-[72vw] xl:w-[42vw]">
            <div className="relative rounded-lg h-[280px] lg:h-[320px] xl:h-[400px]  bg-blue-950  shadow-lg overflow-hidden">
                <Swiper
                    loop={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    modules={[Thumbs]}
                    thumbs={{ swiper: thumbsSwiper }}
                    className="h-full w-full"
                >
                    {photos.map((photo) => (
                        <SwiperSlide key={photo.id}>
                            <SlideItemProperty photo={photo} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="w-full p-1 overflow-hidden bg-blue-950 backdrop-blur-sm   z-50 rounded-lg mt-1">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    modules={[Thumbs]}
                    watchSlidesProgress
                    onSwiper={handleClickThumbs}
                    breakpoints={breakPoint}
                >
                    {photos.map((thumb) => (
                        <SwiperSlide key={thumb.id}>
                            <ThumbItemPerquisitions photo={thumb} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ShowPerquisitionPhotos;
