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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>

                {icon && RenderIcon ? <RenderIcon className="text-muted-foreground" /> : null}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default DashboardCard;
