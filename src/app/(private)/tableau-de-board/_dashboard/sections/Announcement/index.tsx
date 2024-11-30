import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { wait } from "@/lib/utils";
import { Cog } from "lucide-react";
import React from "react";

const Announcement = () => {
    return (
        <Card className="bg-primary text-white">
            {/*      <CardHeader className="text-center mb-3">
                <CardTitle>
                    <p className="text-xl">Annonces</p>
                </CardTitle>
            </CardHeader> */}
            <div className="h-full flex flex-col justify-center items-center gap-3">
                <Cog className="w-24 h-24 animate-spin " style={{ animationDuration: "5s" }} />
                <p className="text-white text-xl font-bold">En cours de développement</p>
            </div>
        </Card>
    );
};

export default Announcement;
