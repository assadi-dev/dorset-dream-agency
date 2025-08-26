import { setTitlePage } from "@/lib/utils";
import React from "react";
import backgroundImage from "@assets/images/bg-img-house.jpg";
import LoginForm from "./LoginForm";
import Image from "next/image";
import Overlay from "@/components/ui/Overlay";
import logo from "@assets/images/logo.png";

export const metadata = setTitlePage("Connexion");
const Connexion = async () => {
    const backgroundStyle = {
        backgroundImage: `linear-gradient(to right, rgba(16, 104, 53,0.15), rgb(0, 0, 0,0.10)), url(${backgroundImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    return (
        <React.Suspense>
            <main className="lg:grid lg:grid-cols-[1fr,.75fr] h-screen bg-white">
                <section className="relative overflow-hidden hidden p-3 lg:grid place-items-center h-full ">
                    <Image
                        src={backgroundImage}
                        alt=""
                        className="rounded-lg w-[95%] h-[95vh] mx-auto contrast-75 brightness-50   shadow-xl"
                    />
                    <div className="absolute z-10  h-full w-full grid place-items-center">
                        <Image src={logo} alt="logo" width={400} height={400} className="w-1/3 drop-shadow-xl " />
                    </div>
                    <div className="absolute bottom-20 left-20 text-white w-3/4 leading-10 text-shadow">
                        <p className="lg:text-2xl ">
                            Gérez vos biens immobiliers avec aisance et efficacité. Cette plateforme est conçus pour les
                            professionnels exigeants.
                        </p>
                    </div>
                </section>
                <section
                    className=" grid place-items-center text-secondary h-full w-full"
                    style={{
                        background: "rgba(3, 51, 23, 0.85)",
                        backdropFilter: "blur(8px)",
                        borderLeft: "1px solid rgba(255,255,255,0.3)",
                    }}
                >
                    <LoginForm />
                </section>
            </main>
        </React.Suspense>
    );
};

export default Connexion;
