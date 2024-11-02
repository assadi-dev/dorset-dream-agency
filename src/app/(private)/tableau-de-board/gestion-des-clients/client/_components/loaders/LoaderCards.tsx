import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoaderCardContainer = () => {
    return (
        <Card className="bg-primary text-secondary lg:grid lg:grid-rows-[0.30fr,0.68fr] lg:gap-4 pt-3">
            <Skeleton className="h-[100%] w-[95%] mx-auto rounded-xl bg-slate-700" />

            <Skeleton className="h-[100%]  w-[95%] mx-auto bg-slate-700" />
        </Card>
    );
};
