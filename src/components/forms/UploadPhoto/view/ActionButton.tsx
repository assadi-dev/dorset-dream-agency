import { Button, ButtonProps } from "@/components/ui/button";
import withTooltip from "@/HOC/withTooltip";
import { cn } from "@/lib/utils";

type ActionButton = {
    title: string;
    icon: React.ReactNode;
} & ButtonProps;
const ActionButton = ({ title, icon, ...props }: ActionButton) => {
    const TooltipText = () => {
        return <p className="text-sm text-black">{title}</p>;
    };

    const CustomButton = () => {
        return (
            <Button
                size="icon"
                variant="outline"
                {...props}
                className={cn("bg-transparent text-white", props.className)}
            >
                {icon}
            </Button>
        );
    };

    return withTooltip(CustomButton, {
        tooltipContent: { className: "bg-slate-100 text-secondary", side: "right" },
        tooltipContentChildren: <TooltipText />,
    });
};

export default ActionButton;
