import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const AboutPage = async () => {
    return (
        <div className="relative grid grid-rows-[auto_auto_1fr_auto] items-center justify-items-center min-h-screen  pb-20 gap-5 font-[family-name:var(--font-geist-sans)] pt-3 p-5 lg:px-12">
            <div className="my-5">
                <h2 id="a-propos" className="text-center font-bold text-3xl mb-8">
                    A Propos
                </h2>
                <p className="block text-sm lg:text-lg text-justify lg:max-w-[45vw] mx-auto mb-8">
                    Nous souhaitons vous informer qu'à partir d'aujourd'hui, de nouveaux horaires d'ouverture et de
                    fermeture seront instaurés pour l'agence. Afin de mieux structurer nos activités et de faciliter
                    l'organisation de chacun, voici les plages horaires que nous avons définies
                </p>
                <Card className="grid place-item-center lg:w-[45vw] min-h-[12vh] p-5 mx-auto">
                    <CardContent className="flex flex-col gap-3 items-center justify-center">
                        <h2 className="font-bold text-xl">NOS HORAIRES</h2>

                        <div>
                            <p className="text-slate-600 text-sm  lg:text-lg"> Du lundi au jeudi : de 21h00 à 00h00</p>
                            <p className="text-slate-600 text-sm lg:text-lg">
                                {" "}
                                Le vendredi et le samedi : de 21h00 à 01h30
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <p className="block text-sm lg:text-lg  lg:max-w-[45vw] mx-auto my-8">
                    Ces horaires nous permettront de gérer plus efficacement nos tâches quotidiennes tout en offrant un
                    meilleur service à nos clients. Cependant, nous tenons à préciser que vous restez entièrement libres
                    de louer des biens en dehors de ces horaires si vous le souhaitez ou si une opportunité particulière
                    se présente.
                </p>
                <p className="block text-sm lg:text-lg  lg:max-w-[45vw] mx-auto my-8">
                    Votre flexibilité reste une priorité, et nous souhaitons que vous puissiez continuer à exercer votre
                    travail dans les meilleures conditions possibles. Nous vous remercions de votre coopération et de
                    votre engagement. Si vous avez des questions ou des suggestions concernant ces nouvelles
                    dispositions, n’hésitez pas à nous en faire part.
                </p>
                <p className="block text-sm lg:text-lg  lg:max-w-[45vw] mx-auto my-8">
                    Cordialement, La direction Dorset Dream Agency 💫.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
