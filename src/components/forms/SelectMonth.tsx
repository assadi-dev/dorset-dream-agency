import * as React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MONTH_OF_WEEK } from "@/lib/date";
import { SelectProps } from "@radix-ui/react-select";

type SelectMonthProps = SelectProps;
export const SelectMonth = ({ ...props }: SelectMonthProps) => {
    const currentMont = new Date().getMonth();
    return (
        <Select defaultValue={MONTH_OF_WEEK[currentMont]} {...props}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sélectionner le mois" />
            </SelectTrigger>
            <SelectContent>
                {MONTH_OF_WEEK.map((month) => (
                    <SelectItem key={month} value={month}>
                        {month}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
