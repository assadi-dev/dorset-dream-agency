import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type DashboardCardProps = React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>> | null;
    children: React.ReactNode;
};
const DashboardCard = ({ title, icon, children, ...props }: DashboardCardProps) => {
    const RenderIcon = icon || null;

    return (
        <Card {...props}>
            {title ? (
                <CardHeader className="flex flex-row items-center justify-between ">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    {icon && RenderIcon ? <RenderIcon className="text-muted-foreground" /> : null}
                </CardHeader>
            ) : null}
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default DashboardCard;
