"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import GalleryLoader from "./GalleryLoader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type GalleryProperty = {
    id: number;
    url: string;
    originalName: string;
    size: number;
    type: string;
};
type PropertyLightGalleryProps = {
    property: {
        gallery: GalleryProperty[];
    };
};

type DataSourceType = {
    sourceId: number;
    original: string;
    thumbnail: string;
    width: number;
    height: number;
    alt?: string;
};

const PropertyLightGallery = ({ property }: PropertyLightGalleryProps) => {
    const galleryID = "photos-gallery";
    const [dataSource, setDataSource] = React.useState<DataSourceType[]>([]);
    const [isPending, startTransition] = React.useTransition();

    const initGallery = (): Promise<DataSourceType[]> => {
        return new Promise((resolve) => {
            const photoReady = new Set<DataSourceType>();

            const imagePromises = property.gallery.map((photo, index) => {
                return new Promise<void>((resolveImage) => {
                    const img = new Image();
                    img.src = photo.url;

                    const setPhoto = () => {
                        photoReady.add({
                            width: img.width,
                            height: img.height,
                            original: photo.url,
                            thumbnail: photo.url,
                            sourceId: photo.id,
                            alt: photo.originalName,
                        });
                        img.removeEventListener("load", setPhoto);
                        img.remove();
                        resolveImage();
                    };

                    img.addEventListener("load", setPhoto);
                    img.addEventListener("error", () => resolveImage); // Pour éviter qu'une image cassée bloque tout
                });
            });

            Promise.all(imagePromises).then(() => {
                resolve(Array.from(photoReady));
            });
        });
    };

    React.useEffect(() => {
        if (property.gallery.length > 0) {
            startTransition(async () => {
                const res = await initGallery();
                setDataSource(res);
            });
        }
    }, [property.gallery.length]);
    const container = React.useRef<HTMLDivElement>();

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(
        () => {
            if (container.current && dataSource.length > 0 && !isPending) {
                const boxes = container.current?.querySelectorAll(".itemGallery");
                if (!boxes?.length) return;

                const tl = gsap.timeline({
                    repeat: 0,
                    duration: 0.35,
                    scrollTrigger: {
                        trigger: boxes,
                        start: "top 90%",
                        end: "bottom 200%",
                        scrub: false,
                    },
                });
                tl.fromTo(
                    boxes,
                    { scale: 0.8, x: -25 },
                    {
                        opacity: 1,
                        scale: 1,
                        ease: "expo.out",
                        x: 0,
                        stagger: {
                            each: 0.15,
                        },
                    },
                );
            }
        },
        { scope: container, dependencies: [dataSource, isPending] },
    );

    return (
        <Card>
            <CardHeader>
                <h2 className="text-2xl font-semibold text-center text-muted-foreground">Galleries</h2>
            </CardHeader>
            <CardContent className="min-h-[15rem]">
                {!isPending && dataSource.length > 0 ? (
                    <Gallery dataSource={dataSource}>
                        <div
                            ref={container as React.LegacyRef<HTMLDivElement>}
                            className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]  2xl:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 "
                        >
                            {dataSource.length > 0
                                ? dataSource.slice(0, 4).map((image) => (
                                      <Item<HTMLImageElement>
                                          key={image.sourceId}
                                          width={image.width}
                                          height={image.height}
                                          original={image.original}
                                          thumbnail={image.thumbnail}
                                          sourceId={image.sourceId}
                                      >
                                          {({ ref, open }) => (
                                              // eslint-disable-next-line @next/next/no-img-element
                                              <img
                                                  ref={ref}
                                                  onClick={open}
                                                  src={image.original}
                                                  alt={`${image.alt}`}
                                                  className="itemGallery rounded-lg cursor-pointer opacity-0 w-full"
                                              />
                                          )}
                                      </Item>
                                  ))
                                : null}
                        </div>
                    </Gallery>
                ) : (
                    <GalleryLoader />
                )}
            </CardContent>
        </Card>
    );
};

export default PropertyLightGallery;
