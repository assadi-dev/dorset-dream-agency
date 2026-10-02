// Add this component to your file or create a separate component file

import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";

const EmptyPropertiesCard = () => {
    return (
        <div className="w-full py-6 sm:py-12 px-0 sm:px-6">
            <Card>
                <CardContent>
                    {/* Icon */}
                    <div className="my-6 flex justify-center">
                        <div className="p-3 border border-slate-400 bg-slate-200 rounded-full flex items-center justify-center">
                            <Home className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2">
                        <p className="text-base sm:text-xl font-semibold text-slate-800 mb-2 text-center">Aucune Propriété Disponible</p>

                        <p className="text-sm sm:text-base text-slate-600 mb-6 text-center">
                            Il n'y a actuellement aucune propriété dans cette catégorie. Revenez bientôt pour de
                            nouvelles annonces !
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmptyPropertiesCard;
