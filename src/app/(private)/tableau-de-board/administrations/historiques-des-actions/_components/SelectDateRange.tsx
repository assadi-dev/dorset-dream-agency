"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import useRouteRefresh from "@/hooks/useRouteRefresh";
import { dateFormatISO8601, datetimeFormatWithoutSecISO8601, formatFullDateShortText } from "@/lib/date";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { type DateRange } from "react-day-picker";
import { INIT_DATE } from "../utils";

export default function SelectDateRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const { updateSearchParamWitObjectAndRefresh } = useRouteRefresh();
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: INIT_DATE.from,
        to: INIT_DATE.to,
    });
    const [open, setOpen] = React.useState(false);

    const sendDateRangeFilter = () => {
        const dateStart = date?.from?.toISOString() || INIT_DATE.from.toISOString();
        const dateEnd = date?.to?.toISOString() || INIT_DATE.to.toISOString();
        const from = datetimeFormatWithoutSecISO8601(dateStart);
        const to = datetimeFormatWithoutSecISO8601(dateEnd);
        const actionsParams = { from, to };
        updateSearchParamWitObjectAndRefresh(actionsParams);
        setOpen(false);
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={open}>
                <PopoverTrigger asChild onClick={() => setOpen(true)}>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {formatFullDateShortText(date.from)} - {formatFullDateShortText(date.to)}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        autoFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    <Separator />
                    <div className="p-2">
                        <Button size={"sm"} className="w-full" onClick={sendDateRangeFilter}>
                            Valider
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
