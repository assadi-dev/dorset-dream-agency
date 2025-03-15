import { Skeleton } from "@/components/ui/skeleton";
import useMediaQuery from "@/hooks/useMediaQuery";
import React from "react";

const LoaderSectionProperties = () => {
    const [numberItems, setNumberItems] = React.useState<number>(1);
    const array = Array.from({ length: numberItems }, (_, k) => k + 1);
    /*  const sm = useMediaQuery("(max-width: 990px)");
    const lg = useMediaQuery("(max-width: 1280px)");
    const xl = useMediaQuery("(max-width: 1536px)");
    React.useEffect(() => {
        if (sm) {
            return setNumberItems(1);
        } else if (lg) {
            return setNumberItems(2);
        } else if (xl) {
            setNumberItems(3);
            return;
        } else {
            setNumberItems(5);
            return;
        }
    }, [sm, lg, xl]); */
    return (
        <div className="mt-5">
            <Skeleton className="h-8 w-[25vw] rounded-xl shadow-lg bg-green-950 my-5 " />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-3 h-[25rem] justify-center">
                {array.map((v) => (
                    <div className="h-full" key={v}>
                        <Skeleton className="h-full w-full rounded-xl shadow-lg bg-green-950" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoaderSectionProperties;
