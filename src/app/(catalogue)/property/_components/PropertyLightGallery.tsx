"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import GalleryLoader from "./GalleryLoader";

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

    return (
        <Card>
            <CardHeader>
                <h2 className="text-2xl font-semibold text-center text-muted-foreground">Galleries</h2>
            </CardHeader>
            <CardContent className="min-h-[15rem]">
                {!isPending && dataSource.length > 0 ? (
                    <Gallery dataSource={dataSource}>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]  2xl:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 ">
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
                                                  className="rounded-lg cursor-pointer"
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
