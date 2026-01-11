"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Filter } from "lucide-react";
import React from "react";
import { LocationStatus } from "../types";
import { ALL_STATUS, STATUS_DISPLAY_NAME, STATUS_OPTIONS } from "../helpers";
import { Checkbox } from "@/components/ui/checkbox";
import { ToastErrorSonner } from "@/components/notify/Sonner";
import useRouteRefresh from "@/hooks/useRouteRefresh";

const FilterSection = () => {
    const { updateSearchParamWitObjectAndRefresh, searchParams } = useRouteRefresh();

    const selectedTemplate: LocationStatus[] =
        (searchParams.get("status")?.split(",") as LocationStatus[]) ?? ALL_STATUS;

    const [selectedStatuses, setSelectedStatuses] = React.useState<LocationStatus[]>(selectedTemplate);

    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const toggleStatus = (status: LocationStatus) => {
        const prevSelectedStatus = structuredClone(selectedStatuses);
        const newSelectedStatus = prevSelectedStatus.includes(status)
            ? prevSelectedStatus.filter((s) => s !== status)
            : [...prevSelectedStatus, status];
        setSelectedStatuses(newSelectedStatus);
    };

    const applyFilters = () => {
        try {
            if (selectedStatuses.length === 0) throw Error("selectedStatuses should not be empty !");
            updateSearchParamWitObjectAndRefresh({ status: selectedStatuses.join(",") });
            setIsPopoverOpen(false);
        } catch (error) {
            ToastErrorSonner("Vous devez sélectionner au moins un statut");
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsPopoverOpen(open);
    };

    return (
        <Popover open={isPopoverOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent px-5 w-full md:w-fit">
                    <Filter className="h-4 w-4" />
                    Status
                    {selectedStatuses.length < 4 && (
                        <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0 text-xs">
                            {selectedStatuses.length}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64">
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Filtrer par statut</h4>
                        <div className="space-y-3">
                            {(Object.keys(STATUS_DISPLAY_NAME) as LocationStatus[]).map((status) => (
                                <div key={status} className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                                        <Checkbox
                                            checked={selectedStatuses.includes(status)}
                                            onCheckedChange={() => toggleStatus(status)}
                                        />
                                        <span className="text-sm text-foreground">{STATUS_DISPLAY_NAME[status]}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-2 border-t border-border">
                        <Button onClick={applyFilters} className="w-full" size="sm">
                            Appliquer
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default FilterSection;
