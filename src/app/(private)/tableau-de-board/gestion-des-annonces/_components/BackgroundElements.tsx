"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ANNOUNCEMENT_QUERY_KEY, fetchBackgroundImages } from "../helper";
import { BackgroundImageApiResponse } from "../type";
import LoaderBackground from "./loader/LoaderBackground";

const ImageItem = ({ name, url }: { name?: string; url: string }) => {
    const style = {
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    return (
        <div
            className="w-full h-[80px] cursor-pointer active:scale-[0.9] transition-all"
            role="button"
            style={style}
        ></div>
    );
};

const BackgroundElements = () => {
    const query = useQuery({
        queryKey: [ANNOUNCEMENT_QUERY_KEY.BACKGROUND_IMAGES],
        queryFn: fetchBackgroundImages,
    });
    if (query.isFetching) return <LoaderBackground />;

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))]  gap-1 p-1 w-full">
            <div className="w-full h-[80px] bg-white border active:scale-[0.9] transition-all"></div>
            {query.data?.map(
                (image: BackgroundImageApiResponse) => image.url && <ImageItem key={image.name} url={image.url} />,
            )}
        </div>
    );
};

export default BackgroundElements;
