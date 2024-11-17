import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return <Skeleton className=" rounded-xl w-full h-full" />;
}

export default function TrombinoscopeLoading() {
    const array = Array.from({ length: 8 }).fill("hello");
    return (
        <div className="flex flex-col  p-3 gap-3">
            <div className="flex justify-between items-center">
                <Skeleton className=" rounded-xl w-full h-[62px]" />
            </div>
            <div className=" grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] grid-rows-[repeat(auto-fill,350px)] gap-3 w-full min-h-[78vh]">
                {array.map((item, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        </div>
    );
}
