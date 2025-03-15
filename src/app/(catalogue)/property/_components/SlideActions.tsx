import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SlideButtonProps = React.HtmlHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
};
export const SlideButton = ({ children, ...props }: SlideButtonProps) => {
    const initialClass =
        "absolute p-1 grid place-items-center rounded-full top-[50%] translate-y-[-50%]  z-10 bg-white/50 drop-shadow-lg hover:bg-secondary text-white hover:text-black active:scale-[1.5] transition-all";
    return (
        <button {...props} className={cn(initialClass, props.className)}>
            {children && children}
        </button>
    );
};

type SlideButtonIconProps = {
    classNames?: {
        icon?: string;
    };
} & SlideButtonProps;
export const PrevButton = ({ classNames, ...props }: SlideButtonIconProps) => {
    return (
        <SlideButton {...props} className={cn("left-1", props.className)}>
            <ChevronLeft className={classNames?.icon} />
        </SlideButton>
    );
};

export const NextButton = ({ classNames, ...props }: SlideButtonIconProps) => {
    return (
        <SlideButton {...props} className={cn("right-1", props.className)}>
            <ChevronRight className={classNames?.icon} />
        </SlideButton>
    );
};
