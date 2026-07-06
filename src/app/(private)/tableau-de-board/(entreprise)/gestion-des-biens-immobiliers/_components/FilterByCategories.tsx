"use client";

"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useRouteRefresh from '@/hooks/useRouteRefresh';
import { useSearchParams } from 'next/navigation';
import { useLoadCategories } from '../_hooks/useLoadCategories';


const FilterByCategories = () => {
    const { CATEGORIES_OPTIONS } = useLoadCategories();

    const searchParams = useSearchParams();
    const defaultValue = searchParams.get("category") || "all";

    const { router } = useRouteRefresh();

    const handleSelectCategory = (value: string) => {
        const category = CATEGORIES_OPTIONS.find((category) => category.value === value);
        if (category) {
            router.push(`/tableau-de-board/gestion-des-biens-immobiliers?category=${category.value}`);
        } else {
            router.push(`/tableau-de-board/gestion-des-biens-immobiliers?category=all`);
        }
    }

    return (
        <div className='w-full'>
            <Select defaultValue={defaultValue} onValueChange={handleSelectCategory}>
                <SelectTrigger className='min-w-[200px] w-full'>
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem key={"all"} value={"all"}>
                        Toutes les catégories
                    </SelectItem>
                    {CATEGORIES_OPTIONS?.map((category) => (
                        <SelectItem key={category.id} value={category.value}>
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default FilterByCategories