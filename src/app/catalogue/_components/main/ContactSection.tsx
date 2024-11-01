import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const ContactSection = () => {
    return (
        <section className="my-5">
            <h2 id="a-propos" className="text-center font-bold text-3xl mb-8">
                A Propos
            </h2>

            <div className="grid grid-cols-[1fr_auto_0.5fr]  gap-3 p-3 lg:p-8 min-h-[12vh]  bg-background rounded-lg shadow-lg">
                <div className="text-slate-600 max-w-[48vw]">
                    <p className="block  mb-8">
                        Nous souhaitons vous informer qu'à partir d'aujourd'hui, de nouveaux horaires d'ouverture et de
                        fermeture seront instaurés pour l'agence. Afin de mieux structurer nos activités et de faciliter
                        l'organisation de chacun, voici les plages horaires que nous avons définies
                    </p>
                    <p className="text-center font-bold">
                        Du lundi au jeudi : de 21h00 à 00h00 <br />
                        Le vendredi et le samedi : de 21h00 à 01h30
                    </p>
                    <p className="my-8">
                        Ces horaires nous permettront de gérer plus efficacement nos tâches quotidiennes tout en offrant
                        un meilleur service à nos clients. Cependant, nous tenons à préciser que vous restez entièrement
                        libres de louer des biens en dehors de ces horaires si vous le souhaitez ou si une opportunité
                        particulière se présente.
                    </p>
                    <p className="my-8">
                        Votre flexibilité reste une priorité, et nous souhaitons que vous puissiez continuer à exercer
                        votre travail dans les meilleures conditions possibles. Nous vous remercions de votre
                        coopération et de votre engagement. Si vous avez des questions ou des suggestions concernant ces
                        nouvelles dispositions, n’hésitez pas à nous en faire part.
                    </p>
                    <p> Cordialement, La direction Dorset Dream Agency 💫.</p>
                </div>

                <Separator orientation="vertical" />

                <div className="flex flex-col gap-3 items-center justify-center h-full">
                    <h2 className="font-bold text-xl">NOS HORAIRES</h2>

                    <div className="text-slate-500">
                        <p className="text-lg"> Du lundi au jeudi : de 21h00 à 00h00</p>
                        <p className="text-lg"> Le vendredi et le samedi : de 21h00 à 01h30</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
