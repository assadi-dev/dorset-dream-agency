import { cn } from "@/lib/utils";
import React from "react";

type Props = React.HtmlHTMLAttributes<HTMLDivElement>;
const Overlay = ({ ...props }: Props) => {
    return <div {...props} className={cn("absolute inset-0 bg-black/50 h-full w-full", props.className)} />;
};

export default Overlay;
