"use client";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    FirstPageButtonPagination,
    LastPageButtonPagination,
    NextButtonPagination,
    PrevButtonPagination,
} from "./ButtonPagination";
import { TooltipProvider } from "../ui/tooltip";

type paginationStateType = {
    page: number;
    limit: number;
    canNextPage: boolean;
    canPreviousPage: boolean;
    totalItems: number;
};
type SimplePaginationProps = {
    rowLabel?: string;
    rowSizeSelect?: Array<number>;
    totalItems: number;
    limit: number;
};
const SimplePagination = ({
    rowLabel = "Éléments par page",
    rowSizeSelect = [5, 15, 25, 50],
    totalItems = 0,
    limit = 5,
}: SimplePaginationProps) => {
    const searchParams = useSearchParams();
    const page = searchParams.get("page") || "1";
    const pathname = usePathname();
    const router = useRouter();

    const updateRouteParams = React.useCallback(
        (key: string, value: string) => {
            const updatedSearchParams = new URLSearchParams(searchParams.toString());
            updatedSearchParams.set(key, value);
            const updatePathName = pathname + "?" + updatedSearchParams.toString();

            router.replace(updatePathName);
        },
        [pathname, router, searchParams],
    );

    const [paginationState, setPaginationState] = React.useReducer(
        (prev: paginationStateType, next: any) => ({ ...prev, ...next }),
        {
            page: page || 1,
            limit,
            canNextPage: true,
            canPreviousPage: false,
            totalItems,
        },
    );

    const TOTAL_PAGE = totalItems === 0 ? 1 : Math.ceil(totalItems / paginationState.limit);
    const gotToLastPage = () => {
        setPaginationState({
            page: TOTAL_PAGE,
            canNextPage: false,
            canPreviousPage: true,
        });
        updateRouteParams("page", String(TOTAL_PAGE));
    };
    const goFirstPage = () => {
        setPaginationState({
            page: 1,
            canPreviousPage: false,
            canNextPage: false,
        });
        updateRouteParams("page", "1");
    };

    const goPreviousPage = () => {
        const newPage = Number(page) - 1;
        setPaginationState({ page: newPage });
        updateRouteParams("page", String(newPage));
    };
    const goNextPage = () => {
        const newPage = Number(page) + 1;
        setPaginationState({ page: newPage });
        updateRouteParams("page", String(newPage));
    };

    const handleSelectLimit = (value: any) => {
        setPaginationState({ limit: Number(value) });
        updateRouteParams("limit", String(value));
    };

    React.useEffect(() => {
        if (page) {
            const currentPage = Number(page);

            const obj = { page: currentPage, canNextPage: true, canPreviousPage: true };
            if (TOTAL_PAGE === 1) {
                obj.canPreviousPage = false;
                obj.canNextPage = false;
                updateRouteParams("page", String(obj.page));
            } else if (currentPage <= 1) {
                obj.page = 1;
                obj.canPreviousPage = false;
                updateRouteParams("page", String(obj.page));
            } else if (currentPage > 1 && currentPage < TOTAL_PAGE) {
                obj.canPreviousPage = true;
                obj.canNextPage = true;
            } else if (currentPage >= TOTAL_PAGE) {
                updateRouteParams("page", String(TOTAL_PAGE));
                obj.page = TOTAL_PAGE;
                obj.canNextPage = false;
            }
            setPaginationState(obj);
        }
    }, [totalItems, limit, page]);

    return (
        <div className="flex items-center  px-2 my-3">
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="hidden xl:block text-xs xl:text-sm font-medium">{rowLabel}</p>
                    <Select value={String(paginationState.limit)} onValueChange={handleSelectLimit}>
                        <SelectTrigger className="h-8 w-[70px] bg-white text-xs xl:text-sm">
                            <SelectValue placeholder={paginationState.limit} />
                        </SelectTrigger>
                        <SelectContent side="bottom">
                            {rowSizeSelect.map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-xs xl:text-sm font-medium">
                    Page {page} sur {TOTAL_PAGE}
                </div>
                <div className="flex items-center space-x-2">
                    <TooltipProvider>
                        <FirstPageButtonPagination onClick={goFirstPage} disabled={!paginationState.canPreviousPage} />
                        <PrevButtonPagination onClick={goPreviousPage} disabled={!paginationState.canPreviousPage} />
                        <NextButtonPagination onClick={goNextPage} disabled={!paginationState.canNextPage} />
                        <LastPageButtonPagination onClick={gotToLastPage} disabled={!paginationState.canNextPage} />
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
};

export default SimplePagination;
