import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import logo from "@assets/images/logo.png";
import Image from "next/image";

const AboutSection = () => {
    return (
        <section className="my-5">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-6 lg:gap-3 min-h-[14vh]  bg-background rounded-lg shadow-lg">
                <div className="text-slate-600 lg:w-[48vw] text-justify lg:text-left p-5 lg:p-14">
                    <h2 id="a-propos" className="text-center font-bold text-5xl mb-8">
                        A Propos de <span className="text-yellow-600"> Nous</span>
                    </h2>
                    <p className="block  mb-8">
                        Nous souhaitons vous informer qu'à partir d'aujourd'hui, de nouveaux horaires d'ouverture et de
                        fermeture seront instaurés pour l'agence. Afin de mieux structurer nos activités et de faciliter
                        l'organisation de chacun, voici les plages horaires que nous avons définies
                    </p>
                    <div className="w-full mx-auto flex flex-col gap-3  bg-yellow-200 text-center p-5  shadow-md border-l-8 border-yellow-600">
                        <p className="font-bold rounded text-yellow-800 w-full"> Tout les jours de 21h30 à 00h00</p>
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
                    <p className="font-bold">
                        Cordialement,
                        <br /> La direction du Dynasty 8 💫.
                    </p>
                </div>

                <div className="hidden lg:flex flex-col  gap-3 items-center justify-center h-full bg-green-800 w-full rounded-r-lg">
                    <div className="w-full lg:w-[25rem] lg:h-[25rem] grid place-items-center   p-8 ">
                        <Image
                            src={logo}
                            width={500}
                            height={500}
                            layout="responsive"
                            alt="logo dynasty8"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
