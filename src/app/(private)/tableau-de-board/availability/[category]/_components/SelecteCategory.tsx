"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useRouteRefresh from '@/hooks/useRouteRefresh';
import React from 'react'

type SelecteCategoryProps = {
    defaultValue: string;
    categoriesoptions: { id: number, label: string, value: string }[];
}
const SelecteCategory = ({ defaultValue, categoriesoptions }: SelecteCategoryProps) => {

    const { router } = useRouteRefresh();

    const handleSelectCategory = (value: string) => {
        const category = categoriesoptions.find((category) => category.value === value);
        if (category) {
            router.push(`/tableau-de-board/availability/${category.label}`);
        } else {
            router.push(`/tableau-de-board/availability/all`);
        }
    }

    return (
        <div className='px-3'>
            <Select defaultValue={defaultValue} onValueChange={handleSelectCategory}>
                <SelectTrigger className='min-w-[200px]'>
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem key={"all"} value={"all"}>
                        Toutes les catégories
                    </SelectItem>
                    {categoriesoptions?.map((category) => (
                        <SelectItem key={category.id} value={category.value}>
                            {category.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelecteCategory