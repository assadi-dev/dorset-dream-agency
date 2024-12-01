import * as React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCurrentMonth, MONTHS_OF_YEAR } from "@/lib/date";
import { SelectProps } from "@radix-ui/react-select";

type SelectMonthProps = SelectProps;
export const SelectMonth = ({ ...props }: SelectMonthProps) => {
    const currentMont = getCurrentMonth();

    return (
        <Select defaultValue={MONTHS_OF_YEAR[currentMont]} {...props}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sélectionner le mois" />
            </SelectTrigger>
            <SelectContent>
                {MONTHS_OF_YEAR.map((month) => (
                    <SelectItem key={month} value={month}>
                        {month}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
