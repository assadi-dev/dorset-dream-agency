import { setTitlePage } from "@/lib/utils";
import React from "react";
import backgroundImage from "@assets/images/background.png";
import LoginForm from "./LoginForm";
import Image from "next/image";

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
            <main style={backgroundStyle} className="lg:grid lg:grid-cols-[1fr,0.5fr] h-screen">
                <section className="p-8 grid place-items-center">
                    {/*  <Image src={backgroundImage} alt="" className="rounded-lg w-[55vw] h-[65vh]" /> */}
                </section>
                <section
                    className=" md:grid md:place-items-center text-secondary "
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
