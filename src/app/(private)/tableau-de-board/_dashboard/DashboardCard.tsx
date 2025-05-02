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
                <CardHeader className="flex flex-row items-center justify-between p-3 xl:p-6 text-primary-accent ">
                    <CardTitle className="text-sm font-medium drop-shadow-sm">{title}</CardTitle>
                    {icon && RenderIcon ? (
                        <div className="bg-green-950 rounded-full p-2 xl:p-3 shadow-lg !m-0">
                            <RenderIcon className="w-4 h-4 xl:h-6 xl:w-6" />
                        </div>
                    ) : null}
                </CardHeader>
            ) : null}
            <CardContent className="px-3">{children}</CardContent>
        </Card>
    );
};

export default DashboardCard;
