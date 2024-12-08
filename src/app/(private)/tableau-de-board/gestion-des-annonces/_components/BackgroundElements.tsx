"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ANNOUNCEMENT_QUERY_KEY, fetchBackgroundImages } from "../helper";
import { BackgroundImageApiResponse } from "../type";
import LoaderBackground from "./loader/LoaderBackground";
import Image from "next/image";
import useFabricAction from "./fabric/useFabric";

const ImageItem = ({ name, url, onClick }: { name?: string; url: string; onClick: (url: string) => void }) => {
    const handleClickImage = () => {
        onClick(url);
    };
    return (
        <Image
            className="w-full h-[80px] cursor-pointer active:scale-[0.9] transition-all object-cover object-center"
            src={url}
            alt={name || `image background for canvas`}
            width={640}
            height={448}
            onClick={handleClickImage}
        />
    );
};

const BackgroundElements = () => {
    const query = useQuery({
        queryKey: [ANNOUNCEMENT_QUERY_KEY.BACKGROUND_IMAGES],
        queryFn: fetchBackgroundImages,
    });
    const { setCanvasBackgroundImage, removeCanvasBackgroundImage } = useFabricAction();
    if (query.isFetching) return <LoaderBackground />;

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))]  gap-1 p-1 w-full">
            <div
                className="w-full h-[80px] bg-white border active:scale-[0.9] transition-all"
                onClick={removeCanvasBackgroundImage}
            ></div>
            {query.data?.map(
                (image: BackgroundImageApiResponse) =>
                    image.url && <ImageItem key={image.name} url={image.url} onClick={setCanvasBackgroundImage} />,
            )}
        </div>
    );
};

export default BackgroundElements;
