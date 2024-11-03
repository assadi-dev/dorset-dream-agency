import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import logo from "@assets/images/logo.jpg";
import Image from "next/image";

const AboutSection = () => {
    return (
        <section className="my-5">
            <h2 id="a-propos" className="text-center font-semibold text-3xl mb-8">
                A Propos
            </h2>

            <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_auto_0.5fr] gap-6 lg:gap-3 p-3 lg:p-8 min-h-[12vh]  bg-background rounded-lg shadow-lg">
                <div className="text-slate-600 lg:max-w-[48vw] text-justify lg:text-left p-3">
                    <p className="block  mb-8">
                        Nous souhaitons vous informer qu'à partir d'aujourd'hui, de nouveaux horaires d'ouverture et de
                        fermeture seront instaurés pour l'agence. Afin de mieux structurer nos activités et de faciliter
                        l'organisation de chacun, voici les plages horaires que nous avons définies
                    </p>
                    <div className="w-fit mx-auto flex flex-col gap-3   text-left ">
                        <p className="font-bold">Du lundi au jeudi : de 21h00 à 00h00</p>
                        <p className="font-bold">Le vendredi et le samedi : de 21h00 à 00h30</p>
                    </div>

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

                <div className="flex flex-col  gap-3 items-center justify-center h-full">
                    <div className="w-full sm:w-[25rem] sm:pt-5 lg:pt-0">
                        <Image
                            src={logo}
                            width={500}
                            height={500}
                            layout="responsive"
                            alt="logo dorset dream"
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
