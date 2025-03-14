import withTooltip from "@/HOC/withTooltip";
import ButtonActionWithTooltip from "../Buttons/ButtonActionWithTooltip";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ButtonProps } from "../ui/button";
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

type paginationButtonProps = ButtonProps;
export const NextButtonPagination = ({ ...props }: paginationButtonProps) => {
    return (
        <ButtonActionWithTooltip
            {...props}
            variant="outline"
            icon={<ChevronRightIcon className="h-4 w-4" />}
            tooltipTitle="Aller à la page suivante"
            className="h-8 w-8 p-0"
        />
    );
};

export const PrevButtonPagination = ({ ...props }: paginationButtonProps) => {
    return (
        <ButtonActionWithTooltip
            {...props}
            variant="outline"
            icon={<ChevronLeftIcon className="h-4 w-4" />}
            tooltipTitle="Aller à la page précédente"
            className="h-8 w-8 p-0"
        />
    );
};
export const FirstPageButtonPagination = ({ ...props }: paginationButtonProps) => {
    return (
        <ButtonActionWithTooltip
            {...props}
            variant="outline"
            icon={<DoubleArrowLeftIcon className="h-4 w-4" />}
            tooltipTitle="Aller à la première page"
            className="hidden h-8 w-8 p-0 lg:flex"
        />
    );
};
export const LastPageButtonPagination = ({ ...props }: paginationButtonProps) => {
    return (
        <ButtonActionWithTooltip
            {...props}
            variant="outline"
            icon={<DoubleArrowRightIcon className="h-4 w-4" />}
            tooltipTitle="Aller à la dernière page"
            className="hidden h-8 w-8 p-0 lg:flex"
        />
    );
};
